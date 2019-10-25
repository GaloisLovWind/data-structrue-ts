import { Node } from "../basic-type/node";
import { IQueue } from "../interface/queue.i";
/**
 * 不依赖数组和链表实现的方式，
 * 与数组实现区别在于不需要提前设定队列长度
 */
export class Queue<T> implements IQueue<T> {
    private header: Node<T>;
    private size: number;

    constructor() {
        this.header = null;
        this.size = 0;
    }

    public getSize(): number {
        return this.size;
    }
    public isEmpty(): boolean {
        return this.size === 0;
    }
    public enqueue(e: T): void {
        const newNode = new Node<T>(e, null);
        if (this.isEmpty()) {
           this.header = newNode;
        } else {
            let curNode = this.header;
            while (curNode.next !== null) {
                curNode = curNode.next;
            }
            curNode.next = newNode;
        }
        this.size++;
    }
    public dequeue(): T {
        if (this.isEmpty()) {
            throw new Error("Empty Queue");
        }
        const data = this.header.data;
        this.header = this.header.next;
        this.size--;
        return data;
    }
    public getFront(): T {
        if (this.isEmpty()) {
            throw new Error("Empty Queue");
        }
        const data = this.header.data;
        return data;
    }

}
