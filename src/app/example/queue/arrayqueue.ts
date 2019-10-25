import { IQueue } from "../interface/queue.i";

/**
 * 利用数组实现队列
 */
export class ArrayQueue<T> implements IQueue<T> {

    private capacity: number;
    private size: number;
    private front: number;
    private rear: number;
    private array: T[];
    constructor(capacity: number) {
        this.capacity = capacity;
        this.makeEmpty();
    }

    public isFull(): boolean {
        return this.size === this.capacity;
    }

    public isEmpty(): boolean {
        return this.size === 0;
    }

    public getSize(): number {
        return this.size;
    }

    public enqueue(e: T): void {
        if (this.isFull()) {
            throw new Error("Full Queue");
        }
        this.rear = this.circul(this.rear);
        this.array[this.rear] = e;
        this.size++;
    }

    public dequeue(): T {
        if (this.isEmpty()) {
            throw new Error("Empty Queue");
        }
        const data: T = this.array[this.front];
        this.front = this.circul(this.front);
        this.size--;
        return data;
    }

    public getFront(): T {
        if (this.isEmpty()) {
            throw new Error("Empty Queue");
        }
        const data: T = this.array[this.front];
        return data;
    }
    /**
     * 循环队尾时插入数组首位
     * @param rear
     */
    private circul(val: number) {
        if (++val === this.capacity) {
            return 0;
        }
        return val;
    }

    private makeEmpty(): void {
        this.array = new Array<T>(this.capacity);
        this.size = 0;
        this.front = 1; // 循环数组时设定
        this.rear = 0;
    }
}
