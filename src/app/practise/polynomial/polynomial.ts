import { PolyNode } from "./polynode";

// 链表例子： 多项式 ADT
export class Polymial {
    get HighPower(): number {
        return this.highPower;
    }
    private header: PolyNode;
    private size: number;
    private highPower: number;

    constructor() {
        this.header = null;
        this.size = 0;
        this.highPower = 0;
    }

    public getSize(): number {
        return this.size;
    }

    public isEmpty(): boolean {
        return this.size === 0;
    }

    public zeroPolymial() {
        this.header = new PolyNode(0, 0);
        this.size = 1;
        this.highPower = 0;
    }

    public append(coefficient: number, exponent: number) {
        if ( exponent < 0) {
            throw new Error("append failed; exponent > 0" );
        }
        const newPolyNode = new PolyNode(coefficient, exponent);
        if (this.highPower < exponent) {
            newPolyNode.next  = this.header;
            this.header = newPolyNode;
            this.highPower = exponent;
            this.size++;
        } else if ( this.highPower === exponent) {
            this.header.coefficient += coefficient;
        } else {
            let preNode = this.header;
            for (let i = 0; i < this.size; i++) {
                if (preNode.exponent === exponent) {
                    preNode.coefficient += coefficient;
                    break;
                } else if (preNode.next === null) { // 无匹配
                    preNode.next = newPolyNode;
                    this.size++;
                    break;
                } else if ( preNode.next.exponent < exponent) {
                    newPolyNode.next = preNode.next;
                    preNode.next = newPolyNode;
                    this.size++;
                    break;
                }

                preNode = preNode.next;
            }
        }
    }

    public add(p2: Polymial) {
        let pn1 = this.header;
        let pn2 = p2.header;
        const resultPoly: Polymial = new Polymial();
        while (pn1 != null || pn2 != null) {
            if (pn1.exponent > pn2.exponent) {
                resultPoly.append(pn1.coefficient, pn1.exponent);
                pn1 = pn1.next;
            } else if (pn1.exponent === pn2.exponent) {
                resultPoly.append(pn1.coefficient + pn2.coefficient, pn1.exponent );
                pn1 = pn1.next;
                pn2 = pn2.next;
            } else {
                resultPoly.append(pn2.coefficient, pn2.exponent);
                pn2 = pn2.next;
            }
        }
        return resultPoly;
        // while (polyNode != null) {
        //     this.append(polyNode.coefficient, polyNode.exponent);
        //     polyNode = polyNode.next;
        // }
        // this.highPower = this._maxHighPower(this.HighPower, p2.HighPower);
    }

    public mult(p2: Polymial) {
        let preNode1 = this.header;
        const resultPoly: Polymial = new Polymial();
        while (preNode1 != null) {
            let preNode2 = p2.header;
            while (preNode2 != null) {
                resultPoly.append(preNode1.coefficient * preNode2.coefficient, preNode1.exponent + preNode2.exponent);
                preNode2 = preNode2.next;
            }
            console.log(resultPoly.toFormatString());
            preNode1 = preNode1.next;
        }
        return resultPoly;
    }

    public toFormatString(x: string = "x"): string {
        return this.header.toFormatString(x);
    }
    private _maxHighPower(h1: number, h2: number) {
        return h1 > h2 ? h1 : h2;
    }
}
