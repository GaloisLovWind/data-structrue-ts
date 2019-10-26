import { expect } from "chai";
import { describe } from "mocha";
import { ILink } from "../../app/example/interface/link.i";
import { Link } from "../../app/example/link/link";
/**
 * 链表
 * cmd:npx mocha -r ts-node/register ./src/test/example/link.spec.ts 
 */
describe("1 Link", () => {
    it("1 Create", () => {
        const link: ILink<string> = new Link<string>();
        expect(link).to.have.own.property("node");
        expect(link).to.have.own.property("size");
        expect(link).to.have.deep.property("size", 0);
        expect(link).to.have.deep.property("node", null);
    });

    it("2 Insert Data", () => {
        const link: ILink<string> = new Link<string>();
        link.insert(0, "Galois");
        link.insert(1, "Gauss");
        link.insert(1, "Abel");
        expect(link).to.have.own.property("size", 3);
        expect(link).to.have.nested.property("node.data", "Galois");
        expect(link).to.have.nested.property("node.next.data", "Abel");
        expect(link).to.have.nested.property("node.next.next.data", "Gauss");
    });

    describe("3 Operate Link", () => {
        let link: ILink<string> = null;
        const dataList = ["Jim", "Galois", "Gauss", "Abel", "Euler"];
        before("1 Insert Data", () => {
            link = new Link<string>();
            link.insert(0, "Galois");
            link.insert(1, "Gauss");
            link.insert(2, "Abel");
        });
        after("E Clear Data", () => {
            link = null;
        });

        it("2 addLast Method", () => {
            link.addLast("Euler");
            expect(link).to.have.own.property("size", 4);
            expect(link).to.have.nested.property("node.data", "Galois");
            expect(link).to.have.nested.property("node.next.data", "Gauss");
            expect(link).to.have.nested.property("node.next.next.data", "Abel");
            expect(link).to.have.nested.property("node.next.next.next.data", "Euler");

            const link2: ILink<string> = new Link(); // 空表操作
            link2.addLast("Euler");
            expect(link2).to.have.own.property("size", 1);
            expect(link2).to.have.nested.property("node.data", "Euler");
        });

        it("3 addFirst Method", () => {
            link.addFirst("Jim");
            expect(link).to.have.own.property("size", 5);
            expect(link).to.have.nested.property("node.data", "Jim");
            expect(link).to.have.nested.property("node.next.data", "Galois");
            expect(link).to.have.nested.property("node.next.next.data", "Gauss");
            expect(link).to.have.nested.property("node.next.next.next.data", "Abel");
            expect(link).to.have.nested.property("node.next.next.next.next.data", "Euler");

            const link2: ILink<string> = new Link(); // 空表操作
            link2.addFirst("Euler");
            expect(link2).to.have.own.property("size", 1);
            expect(link2).to.have.nested.property("node.data", "Euler");
        });

        it("4 get Method", () => {
            expect(link).to.have.own.property("size", 5);
            let data: string = link.get(0);
            expect(data).to.be.equal("Jim");
            data = link.get(1);
            expect(data).to.be.equal("Galois");
            data = link.get(2);
            expect(data).to.be.equal("Gauss");
            data = link.get(3);
            expect(data).to.be.equal("Abel");
            data = link.get(4);
            expect(data).to.be.equal("Euler");
            expect(() => {
                link2.get(5);
            }).to.throw(Error);
            const link2: ILink<string> = new Link(); // 空表操作
            expect(() => {
                link2.get(0);
            }).to.throw(Error);
        });

        it("5 getFirst Method", () => {
            const data: string = link.getFirst();
            expect(data).to.be.equal("Jim");

            const link2: ILink<string> = new Link(); // 空表操作
            expect(() => {
                link2.getFirst();
            }).to.throw(Error);
        });

        it("6 getLast Method", () => {
            const data: string = link.getLast();
            expect(data).to.be.equal("Euler");

            const link2: ILink<string> = new Link(); // 空表操作
            expect(() => {
                link2.getLast();
            }).to.throw(Error);
        });

        it("7 set Method", () => {
            link.set(0, "Tesla");
            expect(link).to.have.nested.property("node.data", "Tesla");
            link.set(4, "Green");
            const data = link.get(4);
            expect(data).to.be.equal("Green");
            const link2: ILink<string> = new Link(); // 空表操作
            expect(() => {
                link2.set(0, "Tesla");
            }).to.throw(Error);
        });

        it("8 remove Method", () => {
            let data: string = link.remove(0);
            expect(link).to.have.own.property("size", 4);
            expect(data).to.be.equal("Tesla");
            data  = link.get(0);
            expect(data).to.be.equal("Galois");
            data = link.remove(2);
            expect(link).to.have.own.property("size", 3);
            expect(data).to.be.equal("Abel");
            expect(() => {
                link2.remove(4);
            }).to.throw(Error);
            const link2: ILink<string> = new Link(); // 空表操作
            const getMethod = link2.remove;
            expect(getMethod).to.throw(Error);
            expect(() => {
                link2.remove(0);
            }).to.throw(Error);
        });

        it("9 removeFirst Method", () => {
            const  data: string = link.removeFirst();
            expect(link).to.have.own.property("size", 2);
            expect(data).to.be.equal("Galois");
        });

        it("10 removeLast Method", () => {
            const  data: string = link.removeLast();
            expect(link).to.have.own.property("size", 1);
            expect(data).to.be.equal("Green");
        });

        it("11 findIndex Method", () => {
            link.insert(0, "Galois");
            expect(link).to.have.own.property("size", 2);
            let index: number = link.findIndex("Galois");
            expect(index).to.equal(0);
            index = link.findIndex("Gauss");
            expect(index).to.equal(1);
            index = link.findIndex("Abel");
            expect(index).to.equal(-1);
        });

        it("12 removeElement Method", () => {
            link.removeElement("Galois");
            expect(link).to.have.own.property("size", 1);
            expect(link).to.have.nested.property("node.data", "Gauss");

            link.removeElement("Green");
        });

        it("13 contains Method", () => {
            let existData: boolean = link.contains("Gauss");
            expect(existData).to.be.equal(true);
            existData = link.contains("Green");
            expect(existData).to.be.equal(false);

        });
    });
});
