declare class ThrottleFetch {
    currentAction: () => Promise<any>;
    constructor(action: () => Promise<any>);
    dirty: boolean;
    result: null;
    flushing: boolean;
    set: Set<(value: unknown) => void>;
    act: () => Promise<unknown>;
    refreshing: boolean;
    refresh: () => Promise<unknown>;
}
export default ThrottleFetch;
