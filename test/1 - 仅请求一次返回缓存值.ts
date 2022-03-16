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
        const resp2 = await useUser.act()
        const resp3 = await useUser.act()
        const resp4 = await useUser.act()
        const resp5 = await useUser.act()
        console.log(resp, resp1, resp2, resp3, resp4, resp5)
    } catch (error) {
        console.log(error)
    }
}
foo()