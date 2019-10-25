import { AvlNode } from "../basic-type/avl-node";
import { ITree } from "../interface/tree.i";

export class AvlTree<T> implements ITree<T, AvlNode<T>> {

    get Height(): number {
        return this.height;
    }

    private root: AvlNode<T>;
    private size: number;
    private height: number;
    constructor() {
        this.root = null;
        this.size = 0;
        this.height = this._getNodeHeight(this.root);
    }
    public find(x: T): AvlNode<T> {
        return this._findChild(x, this.root);
    }
    public findMin(): AvlNode<T> {
       return this._findMin(this.root);
    }
    public findMax(): AvlNode<T> {
       return this._findMax(this.root);
    }
    public delete(x: T): void {
        this.root = this._deleteToParentNode(x, this.root);
        this.height = this.root.height;
        this.size--;
    }

    public insert(x: T) {
        this.root = this._insertToParentNode(x, this.root);
        this.height = this.root.height;
        this.size++;
    }

    public isEmpty(): boolean {
        return this.size === 0;
    }

    public getSize(): number {
        return this.size;
    }

    private _insertToParentNode(x: T, parentNode: AvlNode<T>): AvlNode<T> {
        if (parentNode === null) {
            parentNode = new AvlNode<T>(x, null, null);
        } else {
            if ( x < parentNode.data) {
                parentNode.left = this._insertToParentNode(x, parentNode.left);
                if (this._getNodeHeight(parentNode.left) - this._getNodeHeight(parentNode.right) === 2) {
                    if (x < parentNode.left.data) {
                        parentNode = this._singleRotateWithLeft(parentNode);
                    } else {
                        parentNode = this._doubleRotateWithLeft(parentNode);
                    }
                }
            } else if ( x > parentNode.data) {
                parentNode.right = this._insertToParentNode(x, parentNode.right);
                if (this._getNodeHeight(parentNode.right) - this._getNodeHeight(parentNode.left) === 2) {
                    if (x > parentNode.right.data) {
                        parentNode = this._singleRotateWithRight(parentNode);
                    } else {
                        parentNode = this._doubleRotateWithRight(parentNode);
                    }
                }
            }
        }
        parentNode.height = this.max(this._getNodeHeight(parentNode.left), this._getNodeHeight(parentNode.right)) + 1;
        return parentNode;
    }

    private _singleRotateWithLeft(k2: AvlNode<T>): AvlNode<T> {
        const k1: AvlNode<T>  = k2.left;
        k2.left = k1.right;
        k1.right = k2;
        k2.height = this.max(this._getNodeHeight(k2.left), this._getNodeHeight(k2.right)) + 1;
        k1.height = this.max(this._getNodeHeight(k1.left), k2.height) + 1;
        return k1;
    }

    private _singleRotateWithRight(k1: AvlNode<T>): AvlNode<T> {
        const k2: AvlNode<T>  = k1.right;
        k1.right = k2.left;
        k2.left = k1;
        k1.height = this.max(this._getNodeHeight(k1.left), this._getNodeHeight(k1.right)) + 1;
        k2.height = this.max(k1.height, this._getNodeHeight(k2.right)) + 1;
        return k2;
    }

    private _doubleRotateWithLeft(k3: AvlNode<T>): AvlNode<T> {
        k3.left = this._singleRotateWithRight(k3.left);
        return this._singleRotateWithLeft(k3);
    }
    private _doubleRotateWithRight(k1: AvlNode<T>): AvlNode<T> {
        k1.right = this._singleRotateWithLeft(k1.right);
        return this._singleRotateWithRight(k1);
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

    private _findChild(x: T , parentNode: AvlNode<T>): AvlNode<T> {
        if ( parentNode === null) {
            return null;
        }
        if (parentNode.data > x) {
            return this._findChild(x, parentNode.left);
        } else if ( parentNode.data < x) {
            return this._findChild(x, parentNode.right);
        } else {
            return parentNode;
        }
    }

    private _findMin(parentNode: AvlNode<T>): AvlNode<T> {
        if (parentNode === null) {
            return null;
        }
        if ( parentNode.left === null) {
            return parentNode;
        }
        return this._findMin(parentNode.left);
    }

    private _findMax(parentNode: AvlNode<T>): AvlNode<T> {
        if (parentNode === null) {
            return null;
        }
        if ( parentNode.right === null) {
            return parentNode;
        }
        return this._findMax(parentNode.right);
    }

    private _deleteToParentNode(x: T, parentNode: AvlNode<T>): AvlNode<T> {
        // 待实现

        parentNode.height = this.max(this._getNodeHeight(parentNode.left), this._getNodeHeight(parentNode.right)) + 1;
        return parentNode;
    }
}
