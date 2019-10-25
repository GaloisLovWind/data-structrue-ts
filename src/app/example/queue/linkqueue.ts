import { ILink } from "../interface/link.i";
import { IQueue } from "../interface/queue.i";
/**
 * 依赖已实现的数组和链表，组合实现队列
 */
export class LinkQueue<T> implements IQueue<T> {
    private link: ILink<T>;
    constructor(link: ILink<T>) {
        this.link = link;
    }
    public getSize(): number {
        return this.link.getSize();
    }

    public isEmpty(): boolean {
        return this.link.isEmpty();
    }
    public enqueue(e: T): void {
        this.link.addLast(e);
    }
    public dequeue(): T {
        return this.link.removeFirst();
    }
    public getFront(): T {
        return this.link.getFirst();
    }

    public toString(): string {
        let res = "Queue: front [";
        for (let i = 0; i < this.link.getSize(); i++) {
            res += this.link.get(i);
            if (i !== this.link.getSize() - 1) {
                res += ", ";
            }
        }
        res += "] tail";
        return res;
    }
}
