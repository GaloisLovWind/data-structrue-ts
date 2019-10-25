import { DoubleNode } from "../basic-type/doublenode";
import { ILink } from "../interface/link.i";
// 复制 DoubleLink ,暂未修改
export class DoubleCycleLink<T> implements ILink<T> {

    private header: DoubleNode<T>;
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
    public insert(index: number, e: T): void {
        if (index < 0 || index > this.size) {
            throw new Error("Insert Fail.Required index >= 0 and index <= size");
        }
        const insertNode: DoubleNode<T> = new DoubleNode(e);
        if ( index === 0) {
            insertNode.next = this.header;
            this.header = insertNode;
        } else {
            let preNode = this.header;
            for (let i = 0; i < index; i++) {
                preNode = preNode.next;
            }
            insertNode.next = preNode.next;
            insertNode.prev = preNode;
            preNode.next.prev = insertNode;
            preNode.next = insertNode;
        }
        this.size++;
    }
    public addLast(e: T): void {
        return this.insert(this.size, e);
    }
    public addFirst(e: T): void {
       return this.insert(0, e);
    }
    public get(index: number): T {
        if (index < 0 || index >= this.size) {
            throw new Error("Insert Fail.Required index >= 0 and index <= size");
        }
        let preNode = this.header;
        for (let i = 0; i < index; i++) {
            preNode = preNode.next;
        }
        const data = preNode.data;
        return data;
    }
    public set(index: number, e: T): void {
        if (index < 0 || index >= this.size) {
            throw new Error("Insert Fail.Required index >= 0 and index <= size");
        }
        let preNode = this.header;
        for (let i = 0; i < index; i++) {
            preNode = preNode.next;
        }
        preNode.data = e;
    }
    public getLast(): T {
        return this.get(this.size - 1);
    }
    public getFirst(): T {
        return this.get(0);
    }
    public remove(index: number): T {
        if (index < 0 || index >= this.size) {
            throw new Error("Insert Fail.Required index >= 0 and index < size");
        }
        let preNode = this.header;
        let data = preNode.data;
        if (index === 0) {
            preNode.next.prev = null;
            this.header = preNode.next;
        } else {
            for (let i = 0; i < index - 1; i++) {
                preNode = preNode.next;
            }
            data = preNode.next.data;
            preNode.next.next.prev = preNode;
            preNode.next  = preNode.next.next;
        }
        this.size--;
        return data;
    }
    public removeLast(): T {
        return this.remove(this.size - 1);
    }
    public removeFirst(): T {
        return this.remove(0);
    }
    public findIndex(e: T): number {
        let preNode = this.header;
        for (let i = 0; i < this.size; i++) {
            if (preNode.data === e) {
                return i;
            }
            preNode = preNode.next;
        }
        return -1;
    }
    public removeElement(e: T): void {
        let preNode = this.header;
        for (let i = 0; i < this.size; i++) {
           if (preNode.data === e) {
               this.remove(i);
               break;
           }
           preNode = preNode.next;
       }
    }
    public contains(e: T): boolean {
        let preNode = this.header;
        for (let i = 0; i < this.size; i++) {
            if (preNode.data === e) {
                return true;
            }
            preNode = preNode.next;
        }
        return false;
    }
    public toString(): string {
        let printMsg = "{\n";
        const preNode = this.header;
        printMsg += `node: ${preNode.data.toString()}\n next: ${preNode.next.toString()}`;
        printMsg += "}\n";
        return printMsg;
    }

}
