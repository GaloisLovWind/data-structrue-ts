import { ILink } from "../interface/link.i";
import { IStack } from "../interface/stack.i";
/**
 * 根据链表来组合实现
 */
export class LinkStack<T> implements IStack<T> {
    private array: ILink<T>;

    constructor(array: ILink<T>) {
        this.array = array;
    }

    public getSize(): number {
        return this.array.getSize();
    }
    public isEmpty(): boolean {
       return this.array.isEmpty();
    }
    public push(e: T): void {
        this.array.addLast(e);
    }
    public pop(): T {
        return this.array.removeLast();
    }
    public peek(): T {
        return this.array.getLast();
    }

}
