import { BinTreeNode } from "../basic-type/bin-tree-node";

/**
 * 二项队列
 * 二项树的构造：包含数据， 第一个儿子，和 右兄弟，
 * currentSize 由于在书中没有标明是什么的意思， 我自己认为是插入数组的最大的二项堆的索引值;
 */
export class BinTree<T> {

    private binTreeArray: Array<BinTreeNode<T>>;
    private currentSize: number;
    private capacity: number;

    constructor(capacity: number) {
        this.capacity = capacity;
        this.binTreeArray = new Array<BinTreeNode<T>>(capacity);
        this.currentSize = 0;
        this.initlizeArray();
    }
    public isEmpty(): boolean {
        return this.currentSize === 0;
    }

    public insert(key: T): void {
        const newTreeArry: Array<BinTreeNode<T>> = [new BinTreeNode<T>(key)];
        this.reBuildTreeArray(this.binTreeArray, newTreeArry, this.currentSize, 1);
    }
    public deleteMin(): T {
        let i: number = 0;
        if ( this.isEmpty()) {
            throw new Error("Empty queue");
        }
        let minElementNum: number = Number.MAX_VALUE;
        let minElement: T ;
        let minArrayIndex: number = 0;
        for (i = 0; i < this.currentSize; i++) {
            if (this.binTreeArray[i] && this.binTreeArray[i].calValue < minElementNum) {
                minElementNum = this.binTreeArray[i].calValue;
                minElement = this.binTreeArray[i].key;
                minArrayIndex = i;
            }
        }

        let deleteTreeNode: BinTreeNode<T> = this.binTreeArray[minArrayIndex];
        // const oldTreeNode: BinTreeNode<T> = deleteTreeNode;
        deleteTreeNode = deleteTreeNode.leftChild;
        const deleteArray: Array<BinTreeNode<T>> = new Array<BinTreeNode<T>>(minArrayIndex);
        for (let j = minArrayIndex - 1; j >= 0; j--) {
            deleteArray[j] = deleteTreeNode;
            deleteTreeNode = deleteTreeNode.nextSibling;
            deleteArray[j].nextSibling = null;
        }
        this.binTreeArray[minArrayIndex] = null;
        this.reBuildTreeArray(this.binTreeArray, deleteArray, this.currentSize, deleteArray.length);
        return minElement;
    }

    private copyToArray(sourrray: Array<BinTreeNode<T>>) {
        for (let i = 0; i < sourrray.length; i ++) {
            this.binTreeArray[i] = sourrray[i];
        }
    }

    private reBuildTreeArray(h1: Array<BinTreeNode<T>>, h2: Array<BinTreeNode<T>>, size1: number, size2: number) {
        const mergeTreeArray = this.merge(h1, h2, size1, size2);
        if (mergeTreeArray.length > this.capacity) {
            throw new Error("Out of capacity");
        }
        this.copyToArray(mergeTreeArray);
        this.currentSize = mergeTreeArray.length;
        if (mergeTreeArray[mergeTreeArray.length - 1] === null) {
            this.currentSize -= 1;
        }
    }
    /**
     * 书中实现方式是以h1的基础构造的队列， 而本方法是新建构建了一个队列用来保存合并的结果，
     * 所以在插入和删除时，用到此方法需要copy一次赋值给此对象的队列数组，与书中实现不同，其他类似
     * @param h1 需要合并的队列
     * @param h2 需要合并的队列
     * @param size1 h1 的最大二项树的索引值
     * @param size2 h2 的最大二项树的索引值
     */
    private merge(h1: Array<BinTreeNode<T>>, h2: Array<BinTreeNode<T>>
                , size1: number, size2: number): Array<BinTreeNode<T>> {
        let t1: BinTreeNode<T> = null;
        let t2: BinTreeNode<T> = null;
        let carry: BinTreeNode<T> = null;
        const totalLength = Math.max(size1 , size2) + 1; // 因为同一个索引值两个二项树合并，所以其最大二项树的索引值只会在这基础上加一，而不会构成累加的效果
        const newBinTreeArray = new Array<BinTreeNode<T>>(totalLength);
        let caseSelect: number = 0;
        for (let i = 0;  i < totalLength; i++) {
            t1 = i >= h1.length ? null : h1[i];
            t2 = i >= h2.length ? null :  h2[i];
            caseSelect = 0;
            caseSelect += t1 === null ? 0 : 1;
            caseSelect += t2  === null ? 0 : 2;
            caseSelect += carry  === null ? 0 : 4;
            switch (caseSelect) { // 使用了二进制的表示法来判断三个条件的问题
                case 0: // all is null
                    newBinTreeArray[i] = null;
                    break;
                case 1: // only h1
                    newBinTreeArray[i] = t1;
                    break;
                case 2: // only h2
                    newBinTreeArray[i] = t2;
                    h2[i] = null;
                    break;
                case 3: // h1, h2
                    carry = this.combinesTree(t1, t2);
                    h1[i] = h2[i] = null;
                    newBinTreeArray[i] = null;
                    break;
                case 4: // only carry
                    newBinTreeArray[i] = carry;
                    carry = null;
                    break;
                case 5: //
                    carry = this.combinesTree(t1, carry);
                    h1[i] = null;
                    newBinTreeArray[i] = null;
                    break;
                case 6:
                    carry = this.combinesTree(t2, carry);
                    h2[i] = null;
                    newBinTreeArray[i] = null;
                    break;
                case 7:
                    newBinTreeArray[i] = carry;
                    carry = this.combinesTree(t1, t2);
                    h2[i] = null;
                    h1[i] = null;
                    break;
            }
            // console.log(caseSelect, newBinTreeArray);
        }

        return newBinTreeArray;
    }

    private combinesTree(t1: BinTreeNode<T>, t2: BinTreeNode<T>): BinTreeNode<T> {
        if (t1.calValue > t2.calValue) {
            return this.combinesTree(t2, t1);
        }
        t2.nextSibling = t1.leftChild;
        t1.leftChild = t2;
        return t1;
    }

    private initlizeArray(): void {
        for (let i = 0; i < this.capacity; i++) {
            this.binTreeArray[i] = null;
        }
    }
}
