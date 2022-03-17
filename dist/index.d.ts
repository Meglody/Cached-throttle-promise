declare class ThrottleFetch<T> {
    currentAction: () => Promise<T>;
    constructor(action: () => Promise<T>);
    dirty: boolean;
    flushing: boolean;
    do: boolean;
    result: T | null;
    set: Set<(value: ThrottleFetch<T>['result']) => void>;
    act: () => Promise<ThrottleFetch<T>['result']>;
    refreshing: boolean;
    refresh: () => Promise<T | null>;
}
export default ThrottleFetch;
