import { expect } from 'chai'
import ThrottleFetch from '..'
import app from '../server/index'
import axios from 'axios'
const servise = axios.create()
servise.interceptors.response.use(resp => {
    return resp.data
})
const server = app.listen(3000)
describe('===> Suit(No.1): Case multiple using instance.act() in async env', async () => {
    it('only returns one cached value', (done) => {
        const fetcher = () => servise.get('http://localhost:3000/user')
        const useUser = new ThrottleFetch(fetcher)
        const foo = async() => {
            const resp = await useUser.act()
            const resp1 = await useUser.act()
            const res = resp === resp1
            expect(res).to.be.equal(true)
        }
        foo().then(() => {
            done()
        })
    })
})

describe('===> Suit(No.2): Case multiple using instance.act() in sync env', async () => {
    it('only returns one cached value', (done) => {
        const fetcher = () => servise.get('http://localhost:3000/user')
        const useUser = new ThrottleFetch(fetcher)
        let value_0: unknown, value_1: unknown
        const foo = async() => {
            value_0 = await useUser.act()
        }
        const bar = async() => {
            value_1 = await useUser.act()
        }
        const baz = async () => {
            foo()
            bar()
        }
        baz().then(() => {
            expect(value_0 === value_1).to.be.equal(true)
            done()
        })
    })
})

describe('===> Suit(No.3): Case refresh', async () => {
    it('two values not equal', (done) => {
        const fetcher = () => servise.get('http://localhost:3000/user')
        const useUser = new ThrottleFetch(fetcher)
        let value_0: unknown, value_1: unknown, value_2: unknown
        const foo = async() => {
            value_0 = await useUser.act()
        }
        const bar = async() => {
            value_1 = await useUser.refresh()
            value_2 = await useUser.act()
        }
        foo()
        setTimeout(async () => {
            expect(value_0 !== value_1).to.be.equal(true)
            expect(value_1 === value_2).to.be.equal(true)
            bar().then(() => {
                done()
            })
        }, 10);
    })
})


describe('===> Suit(No.4): Case multiple using instance.refresh() in async env', async () => {
    it('only returns one cached value', (done) => {
        const fetcher = () => servise.get('http://localhost:3000/user')
        const useUser = new ThrottleFetch(fetcher)
        let value_0: unknown, value_1: unknown, value_2: unknown, value_3: unknown
        const foo = async() => {
            value_0 = await useUser.act()
        }
        const bar = async() => {
            value_1 = await useUser.refresh()
            value_2 = await useUser.refresh()
            value_3 = await useUser.act()
        }
        foo()
        setTimeout(async () => {
            bar().then(() => {
                expect(value_0 !== value_1).to.be.equal(true)
                expect(value_1 === value_2).to.be.equal(true)
                expect(value_2 === value_3).to.be.equal(true)
                done()
                server.close()
            })
        }, 10);
    })
})