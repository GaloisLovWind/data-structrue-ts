
export class DoubleNode<T> {
    public data: T;
    public next: DoubleNode<T>;
    public prev: DoubleNode<T>;

    constructor(data: T, prev: DoubleNode<T> = null, next: DoubleNode<T> = null) {
        this.data = data;
        this.prev = prev;
        this.next = next;
    }
}
