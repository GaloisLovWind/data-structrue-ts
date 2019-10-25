
export class PolyNode {
    public coefficient: number;
    public exponent: number;
    public next: PolyNode;

    constructor(coefficient: number, exponent: number, next: PolyNode = null) {
        this.coefficient = coefficient;
        this.exponent = exponent;
        this.next = next;
    }

    public toFormatString(x: string = "x"): string {
        let printMsg =  `${this.coefficient}${x}^${this.exponent}`;
        if (this.next !== null) {
            printMsg += `+ ${this.next.toFormatString(x)}`;
        }
        return printMsg;
    }
}
