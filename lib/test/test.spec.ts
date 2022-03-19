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
            expect(value_0).to.equal(value_1)
            done()
        })
    })
    it('only returns one cached value again', (done) => {
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
    it('only returns one cached value, event in macro-tasks', (done) => {
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

describe('===> Suit(No.3): Case refresh', async () => {
    it('only returns one cached value', (done) => {
        const fetcher = () => servise.get('http://localhost:3000/user')
        const useUser = new ThrottleFetch(fetcher)
        let value_0: unknown, value_1: unknown
        const foo = async() => {
            value_0 = await useUser.act()
        }
        const bar = async() => {
            value_1 = await useUser.refresh()
        }
        const baz = async () => {
            foo()
            bar()
        }
        baz().then(() => {
            expect(value_0).to.equal(value_1)
            done()
        })
    })
    it('only returns one cached value again', (done) => {
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
            expect(value_1).to.equal(value_2)
            done()
        })
    })
    it('only returns one cached value, event in macro-tasks', (done) => {
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
        setTimeout(() => {
            bar().then(() => {
                expect(value_0).to.equal(value_1)
                expect(value_1).to.equal(value_2)
                done()
            })
        });
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


describe('===> Suit(No.4): Case multiple using instance.refresh() in async env', async () => {
    it('only returns one cached value', (done) => {
        const fetcher = () => servise.get('http://localhost:3000/user')
        const useUser = new ThrottleFetch(fetcher)
        let value_0: unknown, value_1: unknown, value_2: unknown
        const foo = async() => {
            value_0 = await useUser.act()
        }
        const bar = async() => {
            value_1 = await useUser.refresh()
            value_2 = await useUser.refresh()
        }
        const baz = async () => {
            foo()
            bar()
        }
        baz().then(() => {
            expect(value_0).to.equal(value_1)
            expect(value_1).to.equal(value_2)
            done()
        })
    })
    it('only returns one cached value again', (done) => {
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
        bar().then(() => {
            expect(value_0).to.equal(value_1)
            expect(value_1).to.equal(value_2)
            expect(value_2).to.equal(value_3)
            done()
        })
    })
    it('only returns one cached value, event in macro-tasks', (done) => {
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
        setTimeout(() => {
            bar().then(() => {
                expect(value_0).to.equal(value_1)
                expect(value_1).to.equal(value_2)
                expect(value_2).to.equal(value_3)
                done()
                server.close()
            })
        });
    })
    // @todo 模仿点击事件，结果会不同
})