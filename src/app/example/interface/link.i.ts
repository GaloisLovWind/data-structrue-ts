import { Node } from "../basic-type/node";

export interface ILink<T> {
    // 表的容量
    getSize(): number;
    isEmpty(): boolean;

    // 表的操作
    insert(index: number, e: T): void;
    addLast(e: T): void;
    addFirst(e: T): void;
    get(index: number): T;
    set(index: number, e: T): void;
    getLast(): T;
    getFirst(): T;
    remove(index: number): T;
    removeLast(): T;
    removeFirst(): T;

    // 表中数据的操作
    findIndex(e: T): number;
    removeElement(e: T): void;
    contains(e: T): boolean;
}
