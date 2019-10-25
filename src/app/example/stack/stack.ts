import { Node } from "../basic-type/node";
import { IStack } from "../interface/stack.i";
/**
 * 原始编写，不依赖数组和链表实现
 */
export class Stack<T> implements IStack<T> {
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

    public clear(): void {
        while (!this.isEmpty()) {
            this.pop();
        }
    }

    public push(e: T): void {
        const newNode: Node<T> = new Node<T>(e);
        if (this.isEmpty()) {
            this.header = newNode;
        } else {
            newNode.next = this.header;
            this.header = newNode;
        }
        this.size++;
    }
    public pop(): T {
        if (this.isEmpty()) {
            throw new Error("Empty Stack");
        }
        const data: T =  this.header.data;
        this.header = this.header.next;
        this.size--;
        return data;
    }
    public peek(): T {
        if (this.isEmpty()) {
            throw new Error("Empty Stack");
        }
        return this.header.data;
    }

}
