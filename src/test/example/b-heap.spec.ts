import { expect } from "chai";
import { describe } from "mocha";
import { BHeap } from "./../../app/example/priority-queue/b-heap";
import { BHeapExt } from "./../../app/example/priority-queue/b-heap.ext";

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
