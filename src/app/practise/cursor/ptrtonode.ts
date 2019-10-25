
export class PtrToNode<T> {
    public element: T;
    public next: number;

    constructor(element: T, next: number = null) {
        this.element = element;
        this.next = next ;
    }
}
