
export interface ITree<T, S> {
    isEmpty(): boolean;
    getSize(): number;
    find(x: T): S;
    findMin(): S;
    findMax(): S;
    insert(x: T): void;
    delete(x: T): void;
}
