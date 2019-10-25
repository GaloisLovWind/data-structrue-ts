import { expect } from "chai";
import { describe } from "mocha";
import { Node } from "../../app/example/basic-type/node";

describe("1 Node Test", () => {
    it("1 Create ", () => {
        const node: Node<string> = new Node("Galois");
        expect(node).to.be.a("Object");
        expect(node).to.have.own.property("data");
        expect(node).to.have.own.property("next");
        expect(node).to.have.deep.property("data", "Galois");
        expect(node).to.have.deep.property("next", null);
    });

    it("2 Next Operate", () => {
        const node1: Node<string> = new Node("Galois");
        const node2: Node<string> = new Node("Gauss");
        node1.next = node2;
        expect(node1).to.have.deep.property("next", node2);
        expect(node1).to.have.nested.property("next.data", "Gauss");
        expect(node1).to.have.nested.property("next.next", null);
    });
});
