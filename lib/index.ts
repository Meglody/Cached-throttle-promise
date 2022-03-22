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
    // act 的行为：
    // 1 - 不管在同步异步中都表现出仅返回同一个缓存值的行为；
    // 2 - 触发了refresh，之后的act值应该产生变化；
    // 3 - 用户定义的诸如click等渲染层事件触发了act，也会产生变化（因为上一次循环已经结束，dirty已经变成了true）
    act: () => Promise<ThrottleFetch<T>['result']> = () => new Promise(async (resolve: (value: ThrottleFetch<T>['result']) => void, reject) => {
        if(this.dirty) {
            try {
                this.dirty = false
                // 用户在渲染线程上（比如点击事件）触发了refresh
                if(this.refreshAction.length){
                    // 增加一个改变result的副作用
                    await this.clearRefreshStack()
                }else{
                    const res = await this.currentAction()
                    this.result = res
                }
                this.do = true
            } catch (error) {
                reject(error)
            }
        }
        if(this.do){
            // 增加一个改变result的副作用，查看是否有refresh事件
            await this.clearRefreshStack()
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
            // 压入同步任务
            const excutor = (result: T | null) => {
                setTimeout(() => {
                    resolve(result)
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
    }
    // 等待刷新的任务
    refreshAction: ThrottleFetch<T>['act'][] = []
    clearRefreshStack = async () => {
        if(this.refreshAction.length){
            this.reset()
            const act = this.refreshAction.shift()
            if(act){
                this.result = await act()
            }
        }
    }
    // refresh的行为：但凡使用refresh都会reset dirty并触发act，改变后续act的值
    // 具体后续act是由哪个refresh触发的，看是外部调用是同步还是异步
    // 1.异步按照异步的顺序在后面的act必然是前面的act或是refresh的结果
    // 2.同步按照同步实际的执行，同一执行时间单位的，结果相同
    refresh = async () => {
        const act = this.act
        this.refreshAction.push(act)
        return act()
    }
}

export default ThrottleFetch