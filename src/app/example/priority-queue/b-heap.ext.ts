import { KeyValueNode } from "../basic-type/key-calvalue-node";

/**
 * 二叉堆（最小堆）
 * 由于计算 key 值由 BHeap 不符合设计，
 * 而 C#，Java 中都有具备自带继承基类的计算 hash code值的方法
 * 扩展的方法中，计算key的值比较大小放到 相应的计算传递数据执行
 * key值增加的方法 DecreaseKey, IncreaseKey 增加只是key值，而不改变数据，这才满足优先权的问题，只是改变优先问题，而不改变本身的
 */
export class BHeapExt<T> {
    private capacity: number;
    private size: number;
    private elementArray: Array<KeyValueNode<T>>;

    constructor(capacity: number) {
        this.capacity = capacity;
        this.elementArray = new Array(this.capacity);
        this.size = 0;
        this.elementArray[0] = null ;
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
        for (; 2 * index <= this.size; i = child ) {
            child = 2 * i;
            if ( child !== this.size && this.elementArray[child + 1] && this.elementArray[child] &&
                 this.elementArray[child + 1].calValue < this.elementArray[child].calValue) {
                child++;
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
     * 由于 泛型中参数没有默认最小值， 则 在索引0处的判断大小需要加限制 Math.floor(i / 2) !== 0
     * @param index 需要过滤的位置索引
     */
    private percolateUp(index: number): void {
        let i: number = index;
        const temp: KeyValueNode<T> = this.elementArray[index];
        while (Math.floor(i / 2) !== 0 && this.elementArray[Math.floor(i / 2)].calValue > temp.calValue ) {
            this.elementArray[i] = this.elementArray[Math.floor(i / 2)];
            i = Math.floor(i / 2);
        }
        this.elementArray[i] = temp;
    }
}
