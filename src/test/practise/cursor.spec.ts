import { expect } from "chai";
import { describe, it } from "mocha";
import { Cursor } from "../../app/practise/cursor/cursor";
import { PtrToNode } from "../../app/practise/cursor/ptrtonode";
/**
 * 游标例子
 * cmd: npx mocha -r ts-node/register ./src/test/practise/cursor.spec.ts
 */
describe("Cursor H", () => {
    describe("1.1 PtrToNode", () => {
        it("1. Create PtrNode", () => {
            const ptrToNode = new PtrToNode<string>("header");
            expect(ptrToNode).to.have.own.property("element", "header");
            expect(ptrToNode).to.have.own.property("next", null);
        });
    });

    describe("1.2 Cursor", () => {
        it("1. Create Cursor", () => {
            const cursor = new Cursor<string>(10);
            expect(cursor).to.have.nested.property("ptrToNode.length", 10);
            expect(cursor).to.have.nested.property("ptrToNode[0].next", 1);
        });
        it("2. insert Method", () => {
            const cursor = new Cursor<string>(11);
            cursor.insert("b", 8);
            cursor.insert("f", 10);
            cursor.insert("header", 6);
            cursor.insert(null, 6);
            cursor.insert("header", 9);
            cursor.insert(null, 0);
            // cursor.insert("c", 3);
            // console.log(cursor);
            // cursor.insert("a", 1);
            // console.log(cursor);
        });
    });
});
