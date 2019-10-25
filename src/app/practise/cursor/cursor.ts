import { PtrToNode } from "./ptrtonode";
/**
 * 链表例子： 游标 ADT
 *   CursorSpace数组可分为两部分，一部分为链表（即已经储存数据的那一部分），另一部分为freelist（即未储存数据的那一部分）。
 *   执行malloc功能时，从开头（0下标后开始算）取空间，被取出的元素从freelist中删除，成为链表的一部分。
 *   执行free功能时，将元素放回开头（0下标后开始算），被放回的元素从链表中删除，成为freelist的一部分
 * freelist即为该数组中闲置的单元构成的一个表
 * 1个数组可以有多个链表
 * 等于0相当于freelist头结点，由于不属于任何链表，所以等价于空
 */
export class Cursor<T> {
    private ptrToNode: Array<PtrToNode<T>>;

    constructor(spaceSize: number) {
        this.ptrToNode = new Array<PtrToNode<T>>(spaceSize);
        this.initialize();
    }

    public isEmpty(l: number): boolean {
        return this.ptrToNode[l].next === 0;
    }

    public isLast(p: number): boolean {
        return this.ptrToNode[p].next === 0;
    }
    // 链表无论是指针实现还是游标实现，Find就是指到当前真正意义上的第一个结点，并且查找该地址下的element是否与X相等
    public find(x: T, l: number): number {
        let p: number = this.ptrToNode[l].next;
        while (p !== 0 && this.ptrToNode[p].element !== x) {
            p = this.ptrToNode[p].next;
        }
        return p;
    }

    public findPrevious( x: T, l: number): number {
        let p: number = l;
        while (this.ptrToNode[p].next !== 0 && this.ptrToNode[this.ptrToNode[p].next].element !== x) {
            p = this.ptrToNode[p].next;
        }
        return p;
    }

    public delete(x: T, l: number): void {
        const p: number = this.findPrevious(x, l);
        let tmpCell: number;
        if (!this.isLast(p)) {
            tmpCell = this.ptrToNode[p].next;
            this.ptrToNode[p].next = this.ptrToNode[tmpCell].next;
            this.clear(tmpCell);
        }
    }

    public insert(x: T, p: number): void {
        const tmpCell = this.malloc();
        if (tmpCell === 0) {
            throw new Error("out of space!!!");
        }
        this.ptrToNode[tmpCell].element = x;
        this.ptrToNode[tmpCell].next = this.ptrToNode[p].next;
        this.ptrToNode[p].next = tmpCell;
    }
    // 初始为循环表, 0开头的表当做为空表，
    private initialize(): void {
        let i = 0;
        for (; i < this.ptrToNode.length - 1; i++) {
            this.ptrToNode[i] = new PtrToNode(null, i + 1);
        }
        this.ptrToNode[i] = new PtrToNode(null, 0);
    }
    // 则把表头之后的第一个元素删除，并返回其下标；申请一个空间，实际上是把0的下一个弹出
    private malloc(): number {
        const p: number = this.ptrToNode[0].next;
        this.ptrToNode[0].next = this.ptrToNode[p].next;
        return p;
    }
    // 把p放到 freelist 表中
    private clear(p: number) {
        this.ptrToNode[p].next = this.ptrToNode[0].next;
        this.ptrToNode[0].next = p;
    }

}
