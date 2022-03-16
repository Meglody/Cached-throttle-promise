import axios from "axios"
import ThrottleFetch from '../lib/index'
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
        const resp1 = await useUser.act()
        console.log(resp, resp1)
    } catch (error) {
        console.log(error)
    }
}
// 这里直接运行refresh会被视为同步运行，被节流掉
// bar()
setTimeout(async () => {
    bar()
}, 1000);