import { expect } from "chai";
import { describe } from "mocha";
import { BTree } from "../../app/example/tree/b-tree";
/**
 * 二叉树
 * cmd：npx mocha -r ts-node/register ./src/test/example/b-tree.spec.ts
 */
describe("1 B-Tree", () => {
    it("1 Create", () => {
        const bTree = new BTree<number>();
        expect(bTree).to.have.own.property("root", null);
        expect(bTree).to.have.own.property("size", 0);
    });

    it("2 Insert Method", () => {
        const bTree = new BTree<number>();
        bTree.insert(6);
        bTree.insert(2);
        bTree.insert(4);
        bTree.insert(1);
        bTree.insert(3);
        bTree.insert(8);
        bTree.insert(5);
        // console.dir(bTree);
    });

    it("3 Delete Method", () => {
        const bTree = new BTree<number>();
        bTree.insert(6);
        bTree.insert(2);
        bTree.insert(4);
        bTree.insert(1);
        bTree.insert(3);
        bTree.insert(8);
        bTree.insert(5);
        // console.dir(bTree);
        bTree.delete(8);
        expect(bTree).to.have.nested.property("root.right", null);
        // console.log(bTree);
    });
});
