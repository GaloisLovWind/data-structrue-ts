import { expect } from "chai";
import { describe } from "mocha";
import { BHeap } from "./../../app/example/priority-queue/b-heap";
import { BHeapExt } from "./../../app/example/priority-queue/b-heap.ext";
import { BinTree } from "./../../app/example/priority-queue/bin-tree";
import { DHeap } from "./../../app/example/priority-queue/d-heap";
import { LeftHeap } from "./../../app/example/priority-queue/left-heap";

/**
 * 二叉堆
 * cmd: npx mocha -r ts-node/register ./src/test/example/b-heap.spec.ts
 */
describe("1 Binary Heap", () => {
    it("1 Create Instance", () => {
        const bHeap: BHeap<number> = new BHeap<number>(16);
        expect(bHeap).to.have.own.property("size", 0);
        expect(bHeap).to.have.own.property("capacity", 16);
        expect(bHeap).to.have.nested.property("elementArray.length", 16);
        expect(bHeap).to.have.nested.property("elementArray[0]", null);
    });

    it("2 insert method", () => {
        const bHeap: BHeap<number> = new BHeap<number>(16);
        bHeap.insert(13);
        bHeap.insert(21);
        bHeap.insert(16);
        bHeap.insert(24);
        bHeap.insert(31);
        bHeap.insert(19);
        bHeap.insert(68);
        bHeap.insert(65);
        bHeap.insert(26);
        bHeap.insert(32);
        // console.log(bHeap);
        expect(bHeap).to.have.own.property("size", 10);
        expect(bHeap).to.have.nested.property("elementArray[1]", 13);
        expect(bHeap).to.have.nested.property("elementArray[2]", 21);
        bHeap.insert(14);
        expect(bHeap).to.have.nested.property("elementArray[2]", 14);
        // console.log(bHeap);
    });

    it("3 deleteMin method", () => {
        const bHeap: BHeap<number> = new BHeap<number>(16);
        bHeap.insert(13);
        bHeap.insert(14);
        bHeap.insert(16);
        bHeap.insert(19);
        bHeap.insert(21);
        bHeap.insert(19);
        bHeap.insert(68);
        bHeap.insert(65);
        bHeap.insert(26);
        bHeap.insert(32);
        bHeap.insert(31);
        // console.log(bHeap);
        expect(bHeap).to.have.nested.property("elementArray[1]", 13);
        expect(bHeap).to.have.own.property("size", 11);
        bHeap.deleteMin();
        // console.log(bHeap);
        expect(bHeap).to.have.nested.property("elementArray[1]", 14);
        expect(bHeap).to.have.own.property("size", 10);
    });

});

describe("2 Binary Heap Ext", () => {
    it("1 Create Instance", () => {
        const bHeap: BHeapExt<number> = new BHeapExt<number>(16);
        expect(bHeap).to.have.own.property("size", 0);
        expect(bHeap).to.have.own.property("capacity", 16);
        expect(bHeap).to.have.nested.property("elementArray.length", 16);
        expect(bHeap).to.have.nested.property("elementArray[0]", null);
    });

    it("2 insert method", () => {
        const bHeap: BHeapExt<number> = new BHeapExt<number>(16);
        bHeap.insert(13);
        bHeap.insert(21);
        bHeap.insert(16);
        bHeap.insert(24);
        bHeap.insert(31);
        bHeap.insert(19);
        bHeap.insert(68);
        bHeap.insert(65);
        bHeap.insert(26);
        bHeap.insert(32);
        // console.log(bHeap);
        expect(bHeap).to.have.own.property("size", 10);
        expect(bHeap).to.have.nested.property("elementArray[1].key", 13);
        expect(bHeap).to.have.nested.property("elementArray[2].key", 21);
        bHeap.insert(14);
        expect(bHeap).to.have.nested.property("elementArray[2].key", 14);
        // console.log(bHeap);
    });

    it("3 deleteMin method", () => {
        const bHeap: BHeapExt<number> = new BHeapExt<number>(16);
        bHeap.insert(13);
        bHeap.insert(14);
        bHeap.insert(16);
        bHeap.insert(19);
        bHeap.insert(15);
        bHeap.insert(19);
        bHeap.insert(68);
        bHeap.insert(65);
        bHeap.insert(26);
        bHeap.insert(32);
        bHeap.insert(31);
        // console.log(bHeap);
        expect(bHeap).to.have.nested.property("elementArray[1].key", 13);
        expect(bHeap).to.have.own.property("size", 11);
        bHeap.deleteMin();
        // console.log(bHeap);
        expect(bHeap).to.have.nested.property("elementArray[1].key", 14);
        expect(bHeap).to.have.own.property("size", 10);
    });

});

describe("3 D-Heap,", () => {
    it("1 Create Instance", () => {
        const bHeap: DHeap<number> = new DHeap<number>(16, 3);
        expect(bHeap).to.have.own.property("size", 0);
        expect(bHeap).to.have.own.property("capacity", 16);
        expect(bHeap).to.have.nested.property("elementArray.length", 16);
        expect(bHeap).to.have.nested.property("elementArray[0]", null);
    });

    it("2 Insert method", () => {
        const bHeap: DHeap<number> = new DHeap<number>(16, 3);
        bHeap.insert(1);
        bHeap.insert(2);
        bHeap.insert(3);
        bHeap.insert(5);
        bHeap.insert(4);
        bHeap.insert(7);
        bHeap.insert(10);
        bHeap.insert(13);
        bHeap.insert(15);
        bHeap.insert(6);
        bHeap.insert(8);
        bHeap.insert(17);
        bHeap.insert(9);
        bHeap.insert(11);
        bHeap.insert(9);
        // console.log(bHeap);
        expect(bHeap).to.have.nested.property("elementArray[1].key", 1);
        // bHeap.insert(3);
    });

    it("3 DeleteMin method", () => {
        const bHeap: DHeap<number> = new DHeap<number>(16, 3);
        bHeap.insert(1);
        bHeap.insert(2);
        bHeap.insert(3);
        bHeap.insert(5);
        bHeap.insert(4);
        bHeap.insert(7);
        bHeap.insert(10);
        bHeap.insert(13);
        bHeap.insert(15);
        bHeap.insert(6);
        bHeap.insert(8);
        bHeap.insert(17);
        bHeap.insert(9);
        bHeap.insert(11);
        bHeap.insert(9);
        // console.log(bHeap);
        expect(bHeap).to.have.nested.property("elementArray[1].key", 1);
        bHeap.deleteMin();
        // console.log(bHeap);
        expect(bHeap).to.have.nested.property("elementArray[1].key", 2);
    });
});

describe("4 Left Heap,", () => {
    it("1 Create Instance", () => {
        const bHeap: LeftHeap<number> = new LeftHeap<number>();
        expect(bHeap).to.have.own.property("size", 0);
        expect(bHeap).to.have.nested.property("root", null);
    });

    it("2 Insert method", () => {
        const bHeap: LeftHeap<number> = new LeftHeap<number>();
        bHeap.insert(3);
        bHeap.insert(10);
        bHeap.insert(6);
        bHeap.insert(21);
        bHeap.insert(14);
        bHeap.insert(12);
        bHeap.insert(7);
        // console.log(bHeap);
    });

    it("3 DeleteMin method", () => {
        const bHeap: LeftHeap<number> = new LeftHeap<number>();
        bHeap.insert(3);
        bHeap.insert(10);
        bHeap.insert(6);
        bHeap.insert(21);
        bHeap.insert(14);
        bHeap.insert(12);
        bHeap.insert(7);
        // console.log(bHeap);
        bHeap.deleteMin();
        // console.log(bHeap);
    });
});

describe("5 Bin-Tree ", () => {
    it("1 Create Instance", () => {
        const bHeap: BinTree<number> = new BinTree<number>(16);
        expect(bHeap).to.have.own.property("capacity", 16);
        expect(bHeap).to.have.nested.property("binTreeArray.length", 16);
    });

    it("2 Insert method", () => {
        const bHeap: BinTree<number> = new BinTree<number>(16);
        bHeap.insert(1);
        bHeap.insert(2);
        bHeap.insert(3);
        bHeap.insert(4);
        bHeap.insert(5);
        bHeap.insert(6);
        bHeap.insert(7);
        // console.log(bHeap);
        expect(bHeap).to.have.nested.property("binTreeArray[0].key", 7);
     });

    it("3 DeleteMin method", () => {
        const bHeap: BinTree<number> = new BinTree<number>(16);
        bHeap.insert(1);
        bHeap.insert(2);
        bHeap.insert(3);
        bHeap.insert(4);
        bHeap.insert(5);
        bHeap.insert(6);
        bHeap.insert(7);
        // console.log(bHeap);
        let num: number  = bHeap.deleteMin();
        expect(num).to.be.equal(1);
        // console.log(bHeap);
        num  = bHeap.deleteMin();
        expect(num).to.be.equal(2);
        // console.log(bHeap);
     });
});
