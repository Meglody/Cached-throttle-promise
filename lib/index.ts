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
    p = Promise
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
            // 执行所有的同步任务（节流一下，仅第一次会执行）
            if(!this.flushing){
                this.flushing = true
                this.set.forEach(excutor => {
                    excutor(this.result)
                })
            }
        }else{
            // 压入的是同步任务：例如：
            // const baz = () => {
            //     const resp4 = useUser.act()
            //     const resp5 = useUser.act()
            // }
            // 这样的
            const excutor = (result: T | null) => {
                resolve(result)
                setTimeout(() => {
                    this.set.delete(excutor)
                    !this.set.size && this.reset()
                })
            }
            this.set.add(excutor)
        }
    })
    reset = () => {
        this.do = false
        this.flushing = false
        this.dirty = true
        // 查看有无正在等待刷新的任务
        this.needFresh && this.refresh()
    }
    // 等待刷新的任务
    needFresh = false
    refresh = async () => {
        if(this.dirty){
            this.needFresh = false
        }else{
            this.needFresh = true
        }
        const res = this.act()
        return res
    }
}

export default ThrottleFetch