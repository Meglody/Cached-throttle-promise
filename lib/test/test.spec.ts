import { expect } from 'chai'
import {JSDOM} from 'jsdom'
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
            expect(resp).to.equal(resp1)
        }
        foo().then(() => {
            done()
        })
    })
})

describe('===> Suit(No.2): Case multiple using instance.act() in sync env', async () => {
    it('only returns one cached value in a time', (done) => {
        const fetcher = () => servise.get('http://localhost:3000/user')
        const useUser = new ThrottleFetch(fetcher)
        let value_0: unknown, value_1: unknown
        const foo = async() => {
            value_0 = await useUser.act()
        }
        const bar = async() => {
            value_1 = await useUser.act()
        }
        foo()
        bar().then(() => {
            expect(value_0).to.equal(value_1)
            done()
        })
    })
    it('returns two different values in different times', (done) => {
        const fetcher = () => servise.get('http://localhost:3000/user')
        const useUser = new ThrottleFetch(fetcher)
        let value_0: unknown, value_1: unknown, value_2: unknown
        const foo = async() => {
            value_0 = await useUser.act()
        }
        const bar = async() => {
            value_1 = await useUser.act()
            value_2 = await useUser.act()
        }
        foo()
        bar().then(() => {
            expect(value_0).to.equal(value_1)
            expect(value_1).to.not.equal(value_2)
            done()
        })
    })
    it('only returns one cached value, in macro-tasks', (done) => {
        const fetcher = () => servise.get('http://localhost:3000/user')
        const useUser = new ThrottleFetch(fetcher)
        let value_0: unknown, value_1: unknown
        const foo = async() => {
            value_0 = await useUser.act()
        }
        const bar = async() => {
            value_1 = await useUser.act()
        }
        foo()
        setTimeout(() => {
            bar().then(() => {
                expect(value_0).to.equal(value_1)
                done()
            })
        })
    })
})

describe('===> Suit(No.3): Case refresh once', async () => {
    it('only returns one cached value', (done) => {
        const fetcher = () => servise.get('http://localhost:3000/user')
        const useUser = new ThrottleFetch(fetcher)
        let value_0: unknown, value_1: unknown, value_2: unknown
        const foo = async() => {
            value_0 = await useUser.act()
        }
        const bar = async() => {
            value_1 = await useUser.refresh()
        }
        const baz = async() => {
            value_2 = await useUser.act()
        }
        foo()
        bar()
        baz().then(() => {
            expect(value_0).to.equal(value_1)
            expect(value_1).to.equal(value_2)
            done()
        })
    })
    it('only return one cached value, in macro-tasks', (done) => {
        const fetcher = () => servise.get('http://localhost:3000/user')
        const useUser = new ThrottleFetch(fetcher)
        let value_0: unknown, value_1: unknown, value_2: unknown
        const foo = async() => {
            value_0 = await useUser.act()
        }
        const bar = async() => {
            value_1 = await useUser.refresh()
        }
        foo()
        bar()
        setTimeout(async () => {
            value_2 = await useUser.act()
            expect(value_0).to.equal(value_1)
            expect(value_1).to.equal(value_2)
            done()
        })
    })
    it('returns two different values, in micro-tasks', (done) => {
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
        bar().then(() => {
            expect(value_0).to.equal(value_1)
            expect(value_1).to.not.equal(value_2)
            done()
        })
    })
    // @todo 模仿点击事件，结果会不同
    // it('get returns of different values, in element <p></p>', (done) => {
    //     const fetcher = () => servise.get('http://localhost:3000/user')
    //     const useUser = new ThrottleFetch(fetcher)
    //     let value_0: unknown, value_1: unknown
    //     const init = async() => {
    //         value_0 = await useUser.act()
    //         console.log(1)
    //     }
    //     const refresh = async() => {
    //         value_1 = await useUser.refresh()
    //     }
    //     const dom = new JSDOM(`<!DOCTYPE html><body></body>`)
    //     const document = dom.window.document
    //     const p = document.createElement('p')
    //     p.id = 'test'
    //     p.addEventListener('click', () => refresh().then(() => {
    //         console.log(2)
    //         console.log(value_1, value_0)
    //         expect(value_1).to.not.equal(value_0)
    //         done()
    //     }))
    //     const observer = new dom.window.MutationObserver((mutationsList, observer) => {
    //         for(let mutation of mutationsList){
    //             if(mutation.type === 'childList'){
    //                 const target = document.querySelector('#test') as HTMLParagraphElement
    //                 target.click()
    //             }
    //         }
    //     })
    //     observer.observe(document.querySelector('body')!, {
    //         childList: true,
    //     })
    //     init()
    //     document.body.appendChild(p)
    // })
})

describe('===> Suit(No.4): Case multiple refresh', async () => {
    it('Useing refresh in async env', (done) => {
        const fetcher = () => servise.get('http://localhost:3000/user')
        const useUser = new ThrottleFetch(fetcher)
        let value_0: any, value_1: any, value_2: any, value_3: any, value_4: any, value_5: any, value_6: any, value_7: any
        const foo = async() => {
            value_0 = await useUser.act()
            value_1 = await useUser.refresh()
            value_2 = await useUser.act()
        }
        const bar = async() => {
            value_3 = await useUser.act()
            value_4 = await useUser.refresh()
            value_5 = await useUser.act()
        }
        const baz = async() => {
            value_6 = await useUser.refresh()
            value_7 = await useUser.act()
        }
        const foz = async () => {
            await foo()
            await bar()
            await baz()
        }
        foz().then(() => {
            expect(value_0).to.not.equal(value_1)
            expect(value_1).to.equal(value_2)

            expect(value_3).to.equal(value_2)
            expect(value_4).to.not.equal(value_3)
            expect(value_4).to.equal(value_5)

            expect(value_6).to.not.equal(value_5)
            expect(value_7).to.equal(value_6)
            done()
        })
    })
    it('Useing refresh in sync env', (done) => {
        const fetcher = () => servise.get('http://localhost:3000/user')
        const useUser = new ThrottleFetch(fetcher)
        let value_0: any, value_1: any, value_2: any, value_3: any, value_4: any, value_5: any, value_6: any, value_7: any
        const foo = async() => {
            value_0 = await useUser.act()
            value_1 = await useUser.refresh()
            value_2 = await useUser.act()
        }
        const bar = async() => {
            value_3 = await useUser.act()
            value_4 = await useUser.refresh()
            value_5 = await useUser.act()
        }
        const baz = async() => {
            value_6 = await useUser.refresh()
            value_7 = await useUser.act()
        }
        foo()
        bar()
        baz().then(() => {
            expect(value_0).to.equal(value_3)
            expect(value_3).to.equal(value_6)

            expect(value_1).to.equal(value_4)
            expect(value_4).to.equal(value_7)

            expect(value_2).to.equal(value_5)
            done()
            server.close()
        })
    })
})