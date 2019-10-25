import { expect } from "chai";
import { describe } from "mocha";
import { AvlTree } from "../../app/example/tree/avl-tree";
/**
 * AVL 平衡树
 * cmd：npx mocha -r ts-node/register ./src/test/example/avl-tree.spec.ts
 */
describe("1 AVL Tree", () => {
    it("1 Create", () => {
        const avlTree: AvlTree<number> = new AvlTree<number>();
        expect(avlTree).to.have.own.property("size", 0);
        expect(avlTree).to.have.own.property("root", null);
        expect(avlTree).to.have.own.property("height", -1);
    });

    it("2.1 insert method", () => {
        const avlTree: AvlTree<number> = new AvlTree<number>();
        avlTree.insert(3);
        avlTree.insert(2);
        avlTree.insert(1);
        expect(avlTree).to.have.own.property("size", 3);
        expect(avlTree).to.have.own.property("height", 1);
        expect(avlTree).to.have.nested.property("root.data", 2);
        expect(avlTree).to.have.nested.property("root.left.data", 1);
        expect(avlTree).to.have.nested.property("root.right.data", 3);
        // console.log(avlTree);
    });

    it("2.2 insert method", () => {
        const avlTree: AvlTree<number> = new AvlTree<number>();
        avlTree.insert(3);
        avlTree.insert(2);
        avlTree.insert(1);
        avlTree.insert(4);
        avlTree.insert(5);
        expect(avlTree).to.have.own.property("size", 5);
        expect(avlTree).to.have.own.property("height", 2);
        expect(avlTree).to.have.nested.property("root.data", 2);
        expect(avlTree).to.have.nested.property("root.left.data", 1);
        expect(avlTree).to.have.nested.property("root.right.data", 4);
        // console.log(avlTree);
    });
    it("2.3 insert method", () => {
        const avlTree: AvlTree<number> = new AvlTree<number>();
        avlTree.insert(3);
        avlTree.insert(2);
        avlTree.insert(1);
        avlTree.insert(4);
        avlTree.insert(5);
        avlTree.insert(6);
        avlTree.insert(7);
        expect(avlTree).to.have.own.property("size", 7);
        expect(avlTree).to.have.own.property("height", 2);
        expect(avlTree).to.have.nested.property("root.data", 4);
        expect(avlTree).to.have.nested.property("root.left.data", 2);
        expect(avlTree).to.have.nested.property("root.right.data", 6);
        // console.log(avlTree);
    });
    it("2.4 insert method", () => {
        const avlTree: AvlTree<number> = new AvlTree<number>();
        avlTree.insert(3);
        avlTree.insert(2);
        avlTree.insert(1);
        avlTree.insert(4);
        avlTree.insert(5);
        avlTree.insert(6);
        avlTree.insert(7);
        avlTree.insert(16);
        avlTree.insert(15);
        expect(avlTree).to.have.own.property("size", 8);
        expect(avlTree).to.have.own.property("height", 3);
        expect(avlTree).to.have.nested.property("root.data", 4);
        expect(avlTree).to.have.nested.property("root.left.data", 2);
        expect(avlTree).to.have.nested.property("root.right.data", 6);
        // console.log(avlTree);
    });
});
