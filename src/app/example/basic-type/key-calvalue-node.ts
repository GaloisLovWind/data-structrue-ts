/**
 * 避免计算 key的 hash 值方法在数据结构里计算
 */
export class KeyValueNode<T> {
    public key: T;
    public calValue: number; //  为key值的 hash 值

    constructor(key: T) {
        this.key = key;
        this.calValue = this._calculteHashWithKey(key);
    }
    /**
     * 计算关键字的 hash 值
     * @param key 关键字
     */
    private _calculteHashWithKey(key: T): number {
        let hashValue: number = 0;
        if (key === null) {
            return 0;
        }
        if ( typeof key === "number") {
            hashValue = key as number;
        } else {
            const keyStr = String(key);
            for (const item of keyStr) {
                hashValue += item.charCodeAt(0);
            }
        }
        return hashValue;
    }
}
