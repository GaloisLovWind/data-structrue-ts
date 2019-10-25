
export class Node<T> {
    public data: T;
    public next: Node<T>;

    constructor(data: T, next: Node<T> = null) {
        this.data = data;
        this.next = next;
    }

    public toString(): string {
        let printMsg = "Node { \n";
        printMsg += `data: ${this.data.toString()}, next: ${this.next === null ? "null" : this.next.toString()}\n`;
        printMsg += "} \n";
        return printMsg;
    }
}
