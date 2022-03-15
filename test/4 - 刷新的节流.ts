import axios from "axios"
import ThrottleFetch from '../index'
const servise = axios.create()
servise.interceptors.response.use(resp => {
    return resp.data
})
const fetcher = () => servise.get('http://localhost:3000/user')
const useUser = new ThrottleFetch(fetcher)
const foo = async() => {
    try {
        const resp = await useUser.act()
        const resp1 = await useUser.act()
        console.log(resp, resp1)
    } catch (error) {
        console.log(error)
    }
}
foo()
const bar = async() => {
    try {
        const resp = await useUser.refresh()
        const resp1 = await useUser.refresh()
        const resp2 = await useUser.refresh()
        const resp3 = await useUser.refresh()
        const resp4 = await useUser.act()
        console.log(resp, resp1, resp2, resp3, resp4)
    } catch (error) {
        console.log(error)
    }
}
setTimeout(async () => {
    bar()
}, 1000);