import { IStack } from "../interface/stack.i";

export class ArrayStack<T> implements IStack<T> {
    private capacity: number;
    private topOfStack: number;
    private array: T[];

    constructor(capacity: number = 5) {
        this.capacity = capacity;
        this.array = new Array<T>(capacity);
        this.makeEmpty();
    }
    public getSize(): number {
        return this.topOfStack + 1;
    }
    public isEmpty(): boolean {
        return this.topOfStack === -1;
    }
    public push(e: T): void {
        if (this.isFull()) {
            throw new Error("Full Stack");
         } else {
             this.array[++this.topOfStack] = e;
         }
    }
    public pop(): T {
        if (!this.isEmpty()) {
            return this.array[this.topOfStack--];
        }
        throw new Error("Empty Stack");
    }
    public peek(): T {
        if (!this.isEmpty()) {
            return this.array[this.topOfStack];
        }
        throw new Error("Empty Stack");
    }

    public makeEmpty(): void {
        this.topOfStack = -1;
    }

    private isFull(): boolean {
        return this.topOfStack + 2 === this.capacity;
    }

}
