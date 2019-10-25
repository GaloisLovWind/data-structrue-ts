import { expect } from "chai";
import { describe } from "mocha";
import { ILink } from "../../app/example/interface/link.i";
import { DoubleLink } from "../../app/example/link/doublelink";

describe("Double Link", () => {
    it("1 Create", () => {
        const dlink: ILink<string> = new DoubleLink();
        expect(dlink).to.have.own.property("header");
        expect(dlink).to.have.own.property("size");
        expect(dlink).to.have.own.property("header", null);
        expect(dlink).to.have.own.property("size", 0);
    });

    it("2 Insert Method", () => {
        const dlink: ILink<string> = new DoubleLink();
        expect(dlink).to.have.own.property("size", 0);
        dlink.insert(0, "Galois");
        dlink.insert(1, "Gauss");
        dlink.insert(1, "Abel");
        expect(dlink).to.have.own.property("size", 3);
    });

    describe("3 Operate Method", () => {
        let dlink: ILink<string> = null;
        before("1 Insert Data", () => {
            dlink = new DoubleLink();
            dlink.insert(0, "Galois");
            dlink.insert(1, "Gauss");
            dlink.insert(2, "Abel");
        });
        after("E Clear Data", () => {
            dlink = null;
        });
        it("2 addLast", () => {
            dlink.addLast("Euler");
            expect(dlink).to.have.own.property("size", 4);
            expect(dlink).to.have.nested.property("header.data", "Galois");
            expect(dlink).to.have.nested.property("header.prev", null);
            expect(dlink).to.have.nested.property("header.next.data", "Gauss");
            expect(dlink).to.have.nested.property("header.next.next.data", "Abel");
            expect(dlink).to.have.nested.property("header.next.next.next.data", "Euler");
        });
        it("3 Remove", () => {
            let data: string = dlink.remove(0);
            expect(dlink).to.have.own.property("size", 3);
            expect(data).to.be.equal("Galois");
            expect(dlink).to.have.nested.property("header.data", "Gauss");
            data = dlink.remove(2);
            expect(data).to.be.equal("Euler");
            expect(dlink).to.have.nested.property("header.next.data", "Abel");

        });
    });
});
