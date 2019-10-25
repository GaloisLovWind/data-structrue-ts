import { expect } from "chai";
import { describe, it } from "mocha";
import { PolyNode } from "../../app/practise/polynomial/polynode";
import { Polymial } from "../../app/practise/polynomial/polynomial";
/**
 *  为了偷懒不进行细节测试
 *  执行命令： npx mocha -r ts-node/register ./src/test/practise/polynomial.spec.ts
 */
describe("1 PolyNode", () => {
    it("1 Create", () => {
        const polyNode = new PolyNode(10, 10, null);
        expect(polyNode).to.have.own.property("coefficient", 10);
        expect(polyNode).to.have.own.property("exponent", 10);
        expect(polyNode).to.have.own.property("next", null);
    });
    it("2 toString Method", () => {
        const polyNode1 = new PolyNode(1, 1, null);
        expect(polyNode1).to.have.own.property("coefficient", 1);
        expect(polyNode1).to.have.own.property("exponent", 1);
        expect(polyNode1).to.have.own.property("next", null);
        const polyNode2 = new PolyNode(10, 10, polyNode1);
        const polyNode3 = new PolyNode(100, 100, polyNode2);
        // console.log(polyNode3.toString());
    });
});

describe("2 Polynomial", () => {
    it("1 Create", () => {
        const polynomial = new Polymial();
        expect(polynomial).to.be.nested.property("header", null);
        expect(polynomial).to.have.own.property("size", 0);
        expect(polynomial).to.have.own.property("highPower", 0);
    });
    it("2 Highpower", () => {
        const polynomial = new Polymial();
        const highpower = polynomial.HighPower;
        expect(highpower).to.be.equal(0);
    });
    it("3 getSize Method", () => {
        const polynomial = new Polymial();
        const size = polynomial.getSize();
        expect(size).to.be.equal(0);
    });
    it("4 isEmpty Method", () => {
        const polynomial = new Polymial();
        const size = polynomial.isEmpty();
        expect(size).to.be.equal(true);
    });
    it("5 append Method", () => {
        const polynomial = new Polymial();
        polynomial.append(1, 1);
        expect(polynomial).to.have.own.property("size", 1);
        expect(polynomial).to.have.own.property("highPower", 1);
        expect(polynomial).to.have.nested.property("header.coefficient", 1);
        // expect(polynomial).to.have.nested.property("header.exponent", 1);
        // expect(polynomial).to.have.nested.property("header.next.cofficient", 0);
        // expect(polynomial).to.have.nested.property("header.next.exponent", 0);
        polynomial.append(2, 2);
        polynomial.append(2, 1);
        polynomial.append(2, 0);

    });
    it("6 add Method", () => {
        const p1 = new Polymial();
        p1.append(1, 1);
        p1.append(2, 0);
        p1.append(2, 2);
        expect(p1.toFormatString()).to.be.equal("2x^2+ 1x^1+ 2x^0");
        const p2 = new Polymial();
        p2.append(1, 1);
        p2.append(2, 0);
        p2.append(3, 3);
        expect(p2.toFormatString()).to.be.equal("3x^3+ 1x^1+ 2x^0");
        const p3: Polymial = p1.add(p2);
        expect(p3.toFormatString()).to.be.equal("3x^3+ 2x^2+ 2x^1+ 4x^0");
    });

    it("7 mult Method", () => {
        const p1 = new Polymial();
        p1.append(1, 1);
        p1.append(2, 0);
        p1.append(2, 2);
        expect(p1.toFormatString()).to.be.equal("2x^2+ 1x^1+ 2x^0");
        const p2 = new Polymial();
        p2.append(1, 1);
        p2.append(2, 0);
        p2.append(3, 3);
        expect(p2.toFormatString()).to.be.equal("3x^3+ 1x^1+ 2x^0");
        const p3: Polymial = p1.mult(p2);
        expect(p3.toFormatString()).to.be.equal("6x^5+ 3x^4+ 8x^3+ 5x^2+ 4x^1+ 4x^0");
    });

});
