import { LeftHeapNode } from "./../basic-type/left-heap-node";
/**
 * 左式堆
 */
export class LeftHeap<T> {
    private root: LeftHeapNode<T>;
    private size: number;
    private npl: number;

    constructor() {
        this.root = null;
        this.size = 0;
        this.npl = 0;
    }

    public isEmpty(): boolean {
        return this.size === 0;
    }

    public insert(key: T): void {
        const singleNode =  new LeftHeapNode<T>(key);
        this.root = this.merge(singleNode, this.root);
        this.size++;
        this.npl = this.root.npl;
    }

    public deleteMin(): LeftHeapNode<T> {
        if (this.isEmpty()) {
            throw new Error("Priority queue is empty.");
        }
        const leftChildHeap = this.root.left;
        const rightChildHeap = this.root.right;
        const deleteNode = this.root;
        this.root = this.merge(leftChildHeap, rightChildHeap);
        this.size--;
        this.npl = this.root.npl;
        return deleteNode;
    }

    private merge(h1: LeftHeapNode<T>, h2: LeftHeapNode<T>): LeftHeapNode<T> {
        if ( h1 === null) {
            return h2;
        }
        if ( h2 === null) {
            return h1;
        }
        if ( h1.calValue < h2.calValue) {
            return this.merge1(h1, h2);
        }
        return this.merge1(h2, h1);
    }

    private merge1(h1: LeftHeapNode<T>, h2: LeftHeapNode<T>): LeftHeapNode<T> {
        if (h1.left === null) {
            h1.left = h2;
        } else {
            h1.right = this.merge(h1.right , h2);
            if (h1.left.npl < h1.right.npl) {
                this.swapChild(h1);
            }
            h1.npl = h1.right.npl + 1;
        }
        return h1;
    }

    private swapChild(node: LeftHeapNode<T>) {
        const tmp = node.left;
        node.left = node.right;
        node.right = tmp;
    }
}
