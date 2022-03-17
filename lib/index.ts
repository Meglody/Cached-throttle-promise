class ThrottleFetch<T> {
    currentAction: () => Promise<T>
    constructor(action: () => Promise<T>)
    {
        this.currentAction = action
    }
    // dirty 是用来节流请求的，flushing 是用来节流宏任务赋值操作的
    dirty = true
    flushing = false
    do = false
    result: T | null = null
    set: Set<(value: ThrottleFetch<T>['result']) => void> = new Set()
    act: () => Promise<ThrottleFetch<T>['result']> = () => new Promise(async (resolve: (value: ThrottleFetch<T>['result']) => void, reject) => {
        if(this.dirty) {
            try {
                this.dirty = false
                const res = await this.currentAction()
                this.result = res
                this.do = true
            } catch (error) {
                reject(error)
            }
        }
        if(this.do){
            // 执行所有的异步任务
            resolve(this.result)
            // 执行所有的同步任务（每次微任务结束都会查询宏任务，节流一下）
            if(!this.flushing){
                this.flushing = true
                this.set.forEach(excutor => {
                    excutor(this.result)
                    this.set.delete(excutor)
                })
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
    refreshing = false
    refresh = async () => {
        if(!this.refreshing){
            this.refreshing = true
            this.do = false
            this.flushing = false
            this.dirty = true
        }
        const res = this.act()
        return res
    }
}

export default ThrottleFetch