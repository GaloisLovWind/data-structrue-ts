
export class AvlNode<T> {
    public data: T;
    public left: AvlNode<T>;
    public right: AvlNode<T>;
    public height: number = -1;

    constructor(data: T, left: AvlNode<T> = null, right: AvlNode<T> = null) {
        this.data = data;
        this.left = left;
        this.right = right;
        this.height = this.max(this._getNodeHeight(this.left), this._getNodeHeight(this.right)) + 1;
    }
    private _getNodeHeight(node: AvlNode<T>) {
        if (node === null) {
            return -1;
        }
        return node.height;
    }
    private max(n1: number, n2: number) {
        return n1 > n2 ? n1 : n2;
    }
}
