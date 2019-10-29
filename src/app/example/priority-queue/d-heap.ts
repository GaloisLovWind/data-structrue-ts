import { KeyValueNode } from "../basic-type/key-calvalue-node";

/**
 * d-堆
 * 二叉堆的推广；实现原理跟二叉堆一样，但是由于每个节点存在 d 个儿子
 * 即对应的i处的儿子是 d*i - [d / 2] d,d*i - [d / 2] + 1,..., d*i + [d / 2];只需要改变的获取儿子的索引和父子之间的对应关系
 * 则改变的是上滤和下滤的算法即可
 * 有些方法可以归结到公共类中， 但由于方便，没有重构
 */
export class DHeap<T>  {
    private capacity: number;
    private size: number;
    private elementArray: Array<KeyValueNode<T>>;
    private digit: number;

    constructor(capacity: number, digit: number) {
        this.capacity = capacity;
        this.elementArray = new Array(this.capacity);
        this.size = 0;
        this.elementArray[0] = null ;
        this.digit = digit;
    }

    public isEmpty(): boolean {
        return this.size === 0;
    }

    public getSize(): number {
        return this.size;
    }

    public isFull(): boolean {
        return this.size === this.capacity - 1;
    }

    public insert(key: T): void {
        if (this.isFull()) {
            throw new Error("Priority queue is full");
        }
        const index: number = ++this.size;
        this.elementArray[index] = new KeyValueNode(key);
        this.percolateUp(index);
    }

    public deleteMin(): KeyValueNode<T> {
        if (this.isEmpty()) {
            return this.elementArray[0];
        }
        const minElement = this.elementArray[1];
        this.swap(1, this.size);
        this.elementArray[this.size] = undefined;  // 清空
        this.size--;
        this.percolateDown(1);
        return minElement;
    }
    /**
     * 降低在位置 index 的关键字的计算值
     * @param index 索引值
     * @param descreaKeyNum 降低key计算值
     */
    public decreaseKey(index: number, descreaKeyNum: number): void {
        if (this.isEmpty()) {
            throw new Error("TPriority queue is empty ");
        }
        if (index > this.size || index <= 0) {
            throw new Error("index out of range size of  Priority queue ");
        }
        this.elementArray[index].calValue -= descreaKeyNum;
        this.percolateUp(index);
    }
    /**
     * 增加在位置 index 的关键字的计算值
     * @param index 索引值
     * @param increaseKeyNum 增加key计算值
     */
    public increaseKey(index: number, increaseKeyNum: number): void {
        if (this.isEmpty()) {
            throw new Error("TPriority queue is empty ");
        }
        if (index > this.size  || index <= 0) {
            throw new Error("index out of range size of  Priority queue ");
        }
        this.elementArray[index].calValue += increaseKeyNum;
        this.percolateDown(index);
    }

    public delete(delIndex: number): KeyValueNode<T> {
        if (this.isEmpty()) {
            return this.elementArray[0];
        }
        if (delIndex > this.size  || delIndex <= 0) {
            return this.elementArray[0];
        }
        const delNode: KeyValueNode<T> = this.elementArray[delIndex];
        const calValue: number = delNode.calValue;
        this.decreaseKey(delIndex, calValue + 1);
        this.deleteMin();
        return delNode;
    }
    /**
     * 数组转化堆
     * @param initArray 数组
     */
    public buildArrayToHeap(initArray: T[]) {
        for (const item of initArray) {
            this.insert(item);
        }
    }
    /**
     * 重构
     */
    public buildHeap(): void {
        for (let i = Math.floor(this.size / 2 ); i > 0; i--) {
            this.percolateDown(i);
        }
    }

    /**
     * 交换
     * @param indexOfKey1 交换前索引位置
     * @param indexOfKey2 交换后索引位置
     */
    private swap(indexOfKey1: number, indexOfKey2: number) {
        const tmp: KeyValueNode<T> = this.elementArray[indexOfKey1];
        this.elementArray[indexOfKey1] = this.elementArray[indexOfKey2];
        this.elementArray[indexOfKey2] = tmp;
    }

    /**
     * 下滤
     * @param index 需要过滤的位置索引
     */
    private percolateDown(index: number): void {
        let i: number = index;
        let child: number = 0;
        const temp: KeyValueNode<T> = this.elementArray[i];
        for (; this.getChildStartIndex(i, this.digit) <= this.size; i = child ) {
            child = this.getChildStartIndex(i, this.digit);
            if ( child !== this.size) {
                child += this.compareChildIncrease(this.elementArray, child, this.digit);
            }
            if (this.elementArray[child] && temp.calValue > this.elementArray[child].calValue) {
                this.elementArray[i] = this.elementArray[child];
            } else {
                break;
            }
        }
        this.elementArray[i] = temp;
    }
    /**
     * 上滤
     * 由于 泛型中参数没有默认最小值， 则 在索引0处的判断大小需要加限制 parentIndex !== 0
     * @param index 需要过滤的位置索引
     */
    private percolateUp(index: number): void {
        let i: number = index; // 当前的索引值
        const temp: KeyValueNode<T> = this.elementArray[index];
        let parentIndex  = this.getParentIndex(i, this.digit);
        while (parentIndex !== 0) {
            if (this.elementArray[parentIndex].calValue > temp.calValue ) {
                this.elementArray[i] = this.elementArray[parentIndex];
                i = parentIndex;
                parentIndex =  this.getParentIndex(i, this.digit);
            } else {
                break;
            }
        }
        this.elementArray[i] = temp;
    }
    /**
     * 获取最小儿子节点的索引增长值
     * @param array 数组
     * @param childStartIndex 儿子节点的起始位置
     * @param digit d-堆的标识值
     */
    private compareChildIncrease(array: Array<KeyValueNode<T>>, childStartIndex: number, digit: number): number {
        let minChild: KeyValueNode<T> = array[childStartIndex];
        let increaseIndex: number = 0;
        for (let i = 1; i < digit; i++) {
            if (!minChild || !array[childStartIndex + i]) {
                break;
            }
            if ( minChild.calValue > array[childStartIndex + i].calValue) {
                minChild = array[childStartIndex + i];
                increaseIndex = i;
            }
        }
        return increaseIndex;
    }
    /**
     * 获得d-堆的儿子起始索引值
     * @param parentIndex 父亲节点索引值
     * @param digit d-堆的标识值
     */
    private getChildStartIndex(parentIndex: number, digit: number): number {
        return parentIndex * digit - digit + 2;
    }
    /**
     * 父节点的索引值
     * @param childIndex 儿子节点索引值
     * @param digit  d-堆的标识值
     */
    private getParentIndex(childIndex: number, digit: number): number {
        const index = Math.floor(childIndex / digit);
        if ( index * digit >= childIndex) {
            return index;
        } else {
            return index + 1;
        }
    }
}
