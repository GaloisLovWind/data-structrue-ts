import { Node } from "../basic-type/node";
import { ILink } from "../interface/link.i";

export class Link<T> implements ILink<T> {

    public node: Node<T>;
    private size: number;

    constructor() {
        this.node = null;
        this.size = 0;
    }
    public getSize(): number {
        return this.size;
    }
    public isEmpty(): boolean {
       return this.size === 0;
    }
    // 插入
    public insert(index: number , e: T): void {
        if (index < 0 || index > this.size) {
            throw new Error("Insert Fail.Required index >= 0 and index <= size");
        }
        const insertNode: Node<T> = new Node(e);
        if ( index === 0) {
            insertNode.next = this.node;
            this.node = insertNode;
        } else {
            let preNode = this.node;
            for (let i = 0; i < index - 1; i++) {
                preNode = preNode.next;
            }
            insertNode.next  = preNode.next;
            preNode.next = insertNode;
        }
        this.size++;
    }
    public addLast(e: T): void {
        this.insert(this.size, e);
    }
    public addFirst(e: T): void {
        this.insert(0, e);
    }
    public get(index: number): T {
        if (index < 0 || index >= this.size) {
            throw new Error("get Fail.Required index >= 0 and index < size");
        }
        let preNode = this.node;
        for (let i = 0; i < index; i++) {
            preNode = preNode.next;
        }
        const data = preNode.data;
        return data;
    }
    public getFirst(): T {
       return this.get(0);
    }
    public getLast(): T {
        return this.get(this.size - 1);
    }
    public set(index: number, e: T): void {
        if (index < 0 || index >= this.size) {
            throw new Error("set Fail.Required index >= 0 and index < size");
        }
        let preNode = this.node;
        for (let i = 0; i < index; i++) {
            preNode = preNode.next;
        }
        preNode.data = e;
    }
    public remove(index: number): T {
        if (index < 0 || index >= this.size) {
            throw new Error("Insert Fail.Required index >= 0 and index < size");
        }
        let preNode = this.node;
        let data = preNode.data;
        if (index === 0) {
            this.node = preNode.next;
        } else {
            for (let i = 0; i < index - 1; i++) {
                preNode = preNode.next;
            }
            data = preNode.next.data;
            preNode.next  = preNode.next.next;
        }
        this.size--;
        return data;
    }
    public removeFirst(): T {
        return this.remove(0);
    }
    public removeLast(): T {
       return this.remove(this.size - 1);
    }
    public findIndex(e: T): number {
        let preNode = this.node;
        for (let i = 0; i < this.size; i++) {
            if (preNode.data === e) {
                return i;
            }
            preNode = preNode.next;
        }
        return -1;
    }
    public removeElement(e: T): void {
       let preNode = this.node;
       for (let i = 0; i < this.size; i++) {
           if (preNode.data === e) {
               this.remove(i);
               break;
           }
           preNode = preNode.next;
       }
    }
    public contains(e: T): boolean {
        let preNode = this.node;
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
        const preNode = this.node;
        printMsg += `node: ${preNode.data.toString()}\n next: ${preNode.next.toString()}`;
        printMsg += "}\n";
        return printMsg;
    }
    private isLast(node: Node<T>): boolean {
        return node.next === null;
    }
}
