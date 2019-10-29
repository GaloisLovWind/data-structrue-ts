/**
 * 左式堆节点
 */
export class LeftHeapNode<T> {
    public data: T;
    public calValue: number;
    public left: LeftHeapNode<T>;
    public right: LeftHeapNode<T>;
    public npl: number;

    constructor(data: T, left: LeftHeapNode<T> = null, right: LeftHeapNode<T> = null ) {
        this.data = data;
        this.calValue = this._calculteHashWithKey(data);
        this.left = left;
        this.right = right;
        this.npl = this._minLeftHeapNpl(left , right) + 1;
    }

    private _minLeftHeapNpl(n1: LeftHeapNode<T>, n2: LeftHeapNode<T>): number {
        const npl1 = n1 === null ? 0 : n1.npl;
        const npl2 = n2 === null ? 0 : n2.npl;
        return npl1 < npl2 ? npl1 : npl2;
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
