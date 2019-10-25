import { BTreeNode } from "../basic-type/b-treenode";
import { ITree } from "../interface/tree.i";
/**
 * 二叉树
 */
export class BTree<T> implements ITree<T, BTreeNode<T>> {
    private root: BTreeNode<T>;
    private size: number;

    constructor() {
        this.root = null;
        this.size = 0;
    }
    public insert(x: T): void {
        this.root = this.insertToParentNode(x, this.root);
        this.size++;
    }

    public delete(x: T): void {
        this.root = this.deleteToParentNode(x, this.root);
        this.size--;
    }

    public find(x: T): BTreeNode<T> {
        return this.findChild(x, this.root);
    }
    // 递归
    public findMin(): BTreeNode<T> {
        return this._findMin(this.root);
    }
    // 不递归
    public findMax(): BTreeNode<T> {
        if (this.isEmpty()) {
            return null;
        }
        let curTreeNode = this.root;
        while (curTreeNode.right !== null) {
            curTreeNode = curTreeNode.right;
        }
        return curTreeNode;
    }

    public isEmpty(): boolean {
        return this.size === 0;
    }
    public getSize(): number {
        return this.size;
    }
    /**
     * 二叉树前序遍历打印
     */
    public preOrderPrint(): void {
        this._preOrderPrint(this.root);
    }
    /**
     * 二叉树中序遍历打印
     */
    public inOrderPrint(): void {
        this._inOrderPrint(this.root);
    }
    /**
     * 二叉搜索树后续遍历打印
     */
    public postOrderPrint(): void {
         this._postOrderPrint(this.root);
    }

    private _postOrderPrint(parentNode: BTreeNode<T>): void {
        if ( parentNode === null ) { return; }
        this._postOrderPrint(parentNode.left);
        this._postOrderPrint(parentNode.right);
        console.log(parentNode.data);
    }
    private _inOrderPrint(parentNode: BTreeNode<T>): void {
        if ( parentNode === null ) { return; }
        this._inOrderPrint(parentNode.left);
        console.log(parentNode.data);
        this._inOrderPrint(parentNode.right);
    }

    private _preOrderPrint(parentNode: BTreeNode<T>): void {
        if ( parentNode === null ) { return; }
        console.log(parentNode.data);
        this._preOrderPrint(parentNode.left);
        this._preOrderPrint(parentNode.right);
    }

    private deleteToParentNode(x: T, parentNode: BTreeNode<T>): BTreeNode < T > {
        if (parentNode === null) { } {
            return null;
        }
        let tmpNode: BTreeNode<T>;
        if ( x < parentNode.data) {
            parentNode.left = this.deleteToParentNode(x, parentNode.left);
        } else if ( x > parentNode.data) {
            parentNode.right = this.deleteToParentNode(x, parentNode.right);
        } else if ( parentNode.left && parentNode.right) {
            tmpNode = this._findMin(parentNode.right);
            parentNode.data = tmpNode.data;
            parentNode.right = this.deleteToParentNode(parentNode.data, parentNode.right);
        } else {
            if ( parentNode.left === null) {
                parentNode = parentNode.right;
            } else if ( parentNode.right === null) {
                parentNode = parentNode.left;
            }
        }
        return parentNode;
    }

    private insertToParentNode(x: T, parentNode: BTreeNode<T>): BTreeNode < T > {
        if (parentNode === null) { } {
            parentNode =  new BTreeNode<T>(x);
        }
        if (x < parentNode.data) {
            parentNode.left = this.insertToParentNode(x, parentNode.left);
        } else  if (x > parentNode.data)  {
            parentNode.right = this.insertToParentNode(x, parentNode.right);
        }
        return parentNode;
    }

    private findChild(x: T , parentNode: BTreeNode<T>): BTreeNode < T > {
        if ( parentNode === null) { } {
            return null;
        }
        if (parentNode.data > x) {
            return this.findChild(x, parentNode.left);
        } else if ( parentNode.data < x) {
            return this.findChild(x, parentNode.right);
        } else {
            return parentNode;
        }
    }

    private _findMin(parentNode: BTreeNode<T>): BTreeNode < T > {
        if (parentNode === null) { } {
            return null;
        }
        if ( parentNode.left === null) {
            return parentNode;
        }
        return this._findMin(parentNode.left);
    }
}
