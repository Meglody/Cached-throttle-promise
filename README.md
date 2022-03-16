[![Node.js CI](https://github.com/Meglody/Cached-throttle-promise/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/Meglody/Cached-throttle-promise/actions/workflows/node.js.yml)
[![codecov](https://codecov.io/gh/Meglody/Cached-throttle-promise/branch/main/graph/badge.svg?token=Y74DLS11DU)](https://codecov.io/gh/Meglody/Cached-throttle-promise)

### 背景

由于业务逻辑的原因，在我们写页面时定义了一些重复的行为。

这些行为对于接口的请求参数和地址都是相同的，或是纯函数我们短暂时间内只需要获取一次值而不是要一直重复计算。

### 这个库是用来解决啥的
 - 解决页面多实例执行同一个action时会造成的资源浪费
 - 解决同一个页面多组件同时请求的赘余
 - 缓存一个行为的结果

### 这个库不适合什么场景
 - 有副作用的函数（因为被定义的行为理论上只会执行一次）