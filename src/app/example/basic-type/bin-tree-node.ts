
export class BinTreeNode<T> {
    public key: T;
    public calValue: number;
    public leftChild: BinTreeNode<T>;
    public nextSibling: BinTreeNode<T>;
    public size: number;

    constructor(key: T, leftChild: BinTreeNode<T> = null, nextSibling: BinTreeNode<T> = null) {
        this.key = key;
        this.leftChild = leftChild;
        this.nextSibling = leftChild;
        this.calValue = this._calculteHashWithKey(key);
        this.size = this._calculateSize(leftChild, nextSibling) + 1 ;
    }

    private _calculateSize(leftChild: BinTreeNode<T>, nextSibling: BinTreeNode<T>): number {
        let size: number = 0;
        if (leftChild !== null)  {
            size += leftChild.size;
        }
        if (nextSibling !== null) {
            size += nextSibling.size;
        }
        return size ;
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
