class ThrottleFetch {
    currentAction: Promise<any>
    constructor(action: Promise<any>){
        this.currentAction = action
    }
    // dirty 是用来节流请求的，flushing 是用来节流宏任务赋值操作的
    dirty = true
    result = null
    flushing = false
    set: Set<(value: unknown) => void> = new Set()
    act = () => new Promise((resolve, reject) => {
        queueMicrotask(async () => {
            if(this.dirty) {
                try {
                    this.dirty = false
                    const res = await this.currentAction
                    this.result = res
                } catch (error) {
                    this.result = '123'
                }
            }
            if(this.result){
                // 执行所有的异步任务
                resolve(this.result)
                // 执行所有的同步任务（每次微任务结束都会查询宏任务，节流一下）
                if(!this.flushing){
                    this.flushing = true
                    this.set.forEach(excutor => excutor(this.result))
                }
            }else{
                // 压入的是同步任务：例如：
                // const baz = () => {
                //     const resp4 = useUser.act()
                //     const resp5 = useUser.act()
                // }
                // 这样的
                this.set.add(resolve)
            }
        })
    })
}

export default ThrottleFetch