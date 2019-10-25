
export class BTreeNode<T> {
    public data: T;
    public left: BTreeNode<T>;
    public right: BTreeNode<T>;

    constructor(data: T, left: BTreeNode<T> = null, right: BTreeNode<T> = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }

    private generateBTreeString(node: BTreeNode<T>, depth: number): string {
        if (node === null) {
            return `${this.generateDepthString(depth)}NULL\n`;
        }
        return `${this.generateDepthString(depth)}${node.data}\n` +
            this.generateBTreeString(node.left, depth + 1) +
            this.generateBTreeString(node.right, depth + 1);

    }

    private generateDepthString(depth: number): string {
        let res = "";
        for (let i = 0; i < depth; i++) {
            res += "--";
        }
        return res;
    }
}
