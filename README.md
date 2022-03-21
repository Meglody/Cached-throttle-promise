[![Node.js CI](https://github.com/Meglody/Cached-throttle-promise/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/Meglody/Cached-throttle-promise/actions/workflows/node.js.yml)
[![codecov](https://codecov.io/gh/Meglody/Cached-throttle-promise/branch/main/graph/badge.svg?token=Y74DLS11DU)](https://codecov.io/gh/Meglody/Cached-throttle-promise)

### 背景

由于业务逻辑的原因，在我们写页面时定义了一些重复的行为。

这些行为对于接口的请求参数和地址都是相同的，或是纯函数我们短暂时间内只需要获取一次值而不是要一直重复计算。

### 是用来解决啥的
 - 解决页面多实例执行同一个action时会造成的资源浪费
 - 解决同一个页面多组件同时请求的赘余
 - 缓存一个行为的结果
****
### 不适合什么场景
 - 有副作用的函数（因为被定义的行为理论上只会执行一次）
 - fetch获取数据（因为fetch用于获取数据返回值的.json()方法被设计为仅能消费一次）

### 安装

```shell
npm install cached-throttle-promise --save
```

### 使用

```index.d.ts
declare type User {
    username: string
    id: number
    age: number
    habbits: Array<string>
}
```

```ts
// axios.ts
// 封装你认为可以缓存使用的请求
import axios from "axios";
const axiosServise = axios.create()
axiosServise.interceptors.response.use(res => res.data)
export default axiosServise
```

```tsx
// useUser.ts
// 封装行为
import ThrottleFetch from 'cached-throttle-promise';
import axios from './axios'
import User from '..'
const axiosUser = () => axios.get<User>("/user")
const useUser = new ThrottleFetch(axiosUser);
export default useUser
```

```tsx
// UserInfo.tsx
// 一个页面
import { useEffect, useState } from "react";
import useUser from "../utils/useUser";
import User from '..'
export default function () {
  return <>
    <UserInfo/>
    <UserHabbits/>
  </>;
}
const getUser = async(callback: (value: any) => void) => {
    const res = await useUser.act()
    res && callback(res.data)
}

const UserInfo = () => {
    const [userInfo, setUserInfo] = useState<User>({username: 'admin', age: 18, id: 0, habbits: []})

    useEffect(() => {
      getUser(setUserInfo)
    }, [])

    const refresh = async () => {
        await useUser.refresh()
        getUser(setUserInfo)
    }

    return <>
      <div className="user-info" onClick={() => getUser(setUserInfo)}>
        Name: <span>{userInfo.username + userInfo.id}</span>
        <button onClick={refresh}>refresh</button>
      </div>
    </>;
}

const UserHabbits = () => {
    const [userInfo, setUserInfo] = useState<User>({username: 'admin', age: 18, id: 0, habbits: []})

    useEffect(() => {
      getUser(setUserInfo)
    }, [])
    
    return <>
      <div className="user-info" onClick={() => getUser(setUserInfo)}>
        Habbits: {userInfo.habbits.map((h, hIndex) => <span key={hIndex} style={{margin: '0px 10px'}}>{h}</span>)}
      </div>
    </>;
}
```