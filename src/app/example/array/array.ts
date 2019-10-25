import { ILink } from "../interface/link.i";

export class MyArray<T> implements ILink<T> {

    private data: T[];
    private size: number = 0;
    /**
     * 构造函数
     * @param capacity 容量
     */
    constructor(capacity: number = 10 ) {
        this.data = new Array(capacity);
    }

    // 在数组中插入元素
    public insert(index: number, e: T) {
        if (index < 0 || index > this.size) {
            throw new Error("Add Fail.Required index >= 0 and index <= size");
        }
        // 如果容量不足，则扩大1.5倍
        if ( this.size === this.data.length) {
            this.resize(1.5 * this.data.length);
        }

        for (let i = this.size - 1; i >= index; i--) {
            this.data[i + 1] = this.data[i];
        }
        this.data[index] = e;
        this.size ++;
    }
    // 获取数组中的任意元素
    public get(index: number): T {
        if (index < 0 || index > this.size) {
            throw new Error("Get failed. Index is illegal.");
        }
        return this.data[index];
    }
    // 修改index索引位置的元素为e
    public set(index: number, e: T): void {
        if (index < 0 || index > this.size) {
            throw new Error("set Fail.Required index >= 0 and index <= size");
        }
        this.data[index] = e;
    }
    // 往末位增加元素
    public addLast(e: T): void {
        return this.insert(this.size, e);
    }
    // 在首位前面添加一个元素
    public addFirst(e: T): void {
        return this.insert(0, e);
    }
    // 获得数组的个数
    public getSize(): number {
        return this.size;
    }
    // 数组是否为空
    public isEmpty(): boolean {
       return this.size === 0;
    }
    // 获取数组容量
    public getCapacity(): number {
        return this.data.length;
    }
     // 获取数组最后一个元素
    public getLast(): T {
        return this.get(this.size - 1);
    }
    // 查找数组中是否包含元素e
    public contains(e: T): boolean {
        for (let i = 0; i < this.size; i++) {
            if (this.data[i] === e) {
                return true;
            }
        }
        return false;
    }
    // 查找元素e所在的索引，如果不存在元素e，则返回-1
    public findIndex(e: T): number {
        for (let i = 0; i < this.size; i++) {
            if (this.data[i] === e) {
                return i;
            }
        }
        return -1;
    }
    // 获取数组第一一个元素
    public getFirst(): T {
        return this.get(0);
    }
    // 在数组中删除元素
    public remove(index: number): T {
        if (index < 0 || index > this.size) {
            throw new Error("Remove Fail.Required index >= 0 and index <= size");
        }
        const data = this.data[index];
        for (let i = index + 1; i < this.size; i++) {
            this.data[i - 1] = this.data[i];
        }
        this.size--;
        this.data[this.size] = null;
        this.checkAndResize();
        return data;
    }
    // 从数组中删除第一个元素，返回删除的元素
    public removeFirst(): T {
        return this.remove(0);
    }
    // 从数组中删除最后一个元素，返回删除的元素
    public removeLast(): T {
        return this.remove(this.size - 1);
    }
    // 从数组中删除元素e
    public removeElement(e: T): void {
        const index: number = this.findIndex(e);
        if ( index !== -1) {
            this.remove(index);
        }
    }
    // print
    public toString(): string {
        let printMsg = "[";
        for (let i = 0; i < this.size; i++) {
            printMsg += this.data[i].toString();
            if (i !== this.size - 1) {
                printMsg += ", ";
            }
        }
        printMsg += "]";
        return printMsg;
    }

    // 数组的扩容或者缩容
    private resize(newCapacity: number): void {
        const newData = new Array(newCapacity);
        for (let i = 0; i < this.size; i++) {
            newData[i] = this.data[i];
        }
        this.data = newData;
    }
    // 数组缩容
    private checkAndResize() {
        // 如果数组中的元素仅为数组容量的1/4时，这时需要进行缩容操作
        if (this.size === this.data.length / 4 && this.data.length / 2 !== 0) {
            this.resize(this.data.length / 2);
        }
    }
}
