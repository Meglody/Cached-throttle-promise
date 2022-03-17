[![Node.js CI](https://github.com/Meglody/Cached-throttle-promise/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/Meglody/Cached-throttle-promise/actions/workflows/node.js.yml)
[![codecov](https://codecov.io/gh/Meglody/Cached-throttle-promise/branch/main/graph/badge.svg?token=Y74DLS11DU)](https://codecov.io/gh/Meglody/Cached-throttle-promise)

### @todo
- 微任务时的刷新的重置 refreshing 置为 false
### 背景

由于业务逻辑的原因，在我们写页面时定义了一些重复的行为。

这些行为对于接口的请求参数和地址都是相同的，或是纯函数我们短暂时间内只需要获取一次值而不是要一直重复计算。

### 是用来解决啥的
 - 解决页面多实例执行同一个action时会造成的资源浪费
 - 解决同一个页面多组件同时请求的赘余
 - 缓存一个行为的结果

### 不适合什么场景
 - 有副作用的函数（因为被定义的行为理论上只会执行一次）
 - fetch获取数据（因为fetch用于获取数据返回值的.json()方法被设计为仅能消费一次）

### 安装

```shell
npm install cached-throttle-promise --save
```

### 使用

```ts
// 封装你认为可以缓存使用的请求
const axiosServise = axios.create()
axiosServise.interceptors.response.use(res => res.data)
const fetchUser = () => axiosServise.get("/user")
const useUser = new ThrottleFetch(fetchUser);
export default useUser
```

```tsx
import useUser from './useUser'
const getUser = async(callback: (value: any) => void) => {
    const res = await useUser.act() as AxiosResponse<any, any> 
    callback(res.data)
}
// 如果你想刷新一次数据
const refreshInfo = () => {
    useUser.refresh()
    getUser(setUserInfo)
}
const UserInfo = () => {
  const [userInfo, setUserInfo] = useState<{username: string, id: number}>({username: 'admin', id: 0})
  useEffect(() => {
    getUser(setUserInfo)
  }, [])
  return <>
    <div className="user-info" onClick={() => getUser(setUserInfo)}>
      <span>{userInfo.username + userInfo.id}</span>
    </div>
    <button onClick={refreshInfo}>刷新</button>
  </>;
};
```