import { expect } from "chai";
import { after, before, describe, it } from "mocha";
import { MyArray } from "../../app/example/array/array";
import { ILink } from "../../app/example/interface/link.i";
import { Link } from "../../app/example/link/link";
import { ArrayStack } from "../../app/example/stack/arraystack";
import { LinkStack } from "../../app/example/stack/linkstack";
import { Stack } from "../../app/example/stack/stack";
/**
 * cmd: npx mocha -r ts-node/register ./src/test/example/stack.spec.ts
 */
describe("1 Link Stack", () => {
    describe("1.1 Array Stack", () => {
        it("1 Create", () => {
            const array: ILink<string> = new MyArray<string>(10);
            const stack: LinkStack<string> = new LinkStack<string>(array);
            expect(stack).to.have.own.property("array", array);
        });
        it("2 push method", () => {
            const array: ILink<string> = new MyArray<string>(10);
            const stack: LinkStack<string> = new LinkStack<string>(array);
            let size: number = stack.getSize();
            expect(size).to.be.equal(0);
            stack.push("Galois");
            stack.push("Gauss");
            size = stack.getSize();
            expect(size).to.be.equal(2);
        });
        describe("3 Operate Stack", () => {
            let stack: LinkStack<string>  = null;
            before("1 Insert Data", () => {
                const array: ILink<string> = new MyArray<string>(10);
                stack = new LinkStack<string>(array);
                stack.push("Galois");
                stack.push("Gauss");
            });
            after("E Clear Data", () => {
                stack = null;
            });
            it("2 pop method", () => {
                const data: string = stack.pop();
                expect(data).to.be.equal("Gauss");
                // data = stack.pop();
                // expect(data).to.be.equal("Galois");
            });
            it("3 peek method", () => {
                const data: string = stack.peek();
                expect(data).to.be.equal("Galois");
            });
        });
    });

    describe("1.2 Link Stack", () => {
        it("1 Create", () => {
            const link: ILink<string> = new Link<string>();
            const stack: LinkStack<string> = new LinkStack<string>(link);
            expect(stack).to.have.own.property("array", link);
        });
        it("2 push method", () => {
            const link: ILink<string> = new Link<string>();
            const stack: LinkStack<string> = new LinkStack<string>(link);
            let size: number = stack.getSize();
            expect(size).to.be.equal(0);
            stack.push("Galois");
            stack.push("Gauss");
            size = stack.getSize();
            expect(size).to.be.equal(2);
        });
        describe("3 Operate Stack", () => {
            let stack: LinkStack<string>  = null;
            before("1 Insert Data", () => {
                const link: ILink<string> = new Link<string>();
                stack = new LinkStack<string>(link);
                stack.push("Galois");
                stack.push("Gauss");
            });
            after("E Clear Data", () => {
                stack = null;
            });
            it("2 pop method", () => {
                const data: string = stack.pop();
                expect(data).to.be.equal("Gauss");
                // data = stack.pop();
                // expect(data).to.be.equal("Galois");
            });
            it("3 peek method", () => {
                const data: string = stack.peek();
                expect(data).to.be.equal("Galois");
            });
        });
    });
});
describe("2 Stack", () => {
    it("1 Create ", () => {
        const stack: Stack<string> = new Stack<string>();
        expect(stack).to.have.own.property("header", null);
        expect(stack).to.have.own.property("size", 0);
    });
    it("2 push method ", () => {
        const stack: Stack<string> = new Stack<string>();
        stack.push("Galois");
        stack.push("Gauss");
        expect(stack).to.have.own.property("size", 2);
    });
    describe("3 Operate Object", () => {
        let stack: Stack<string> = null;
        before("1 Insert Data", () => {
            stack = new Stack<string>();
            stack.push("Galois");
            stack.push("Gauss");
        });
        after("E Clear Data", () => {
            stack = null;
        });
        it("2 pop method ", () => {
            const data: string = stack.pop();
            expect(data).to.be.equal("Gauss");
            expect(stack).to.have.own.property("size", 1);

            const emptyStack = new Stack<string>();
            const result = emptyStack.pop;
            expect(result).to.be.throw(Error);
        });
        it("2 peek method ", () => {
            const data: string = stack.peek();
            expect(data).to.be.equal("Galois");
            expect(stack).to.have.own.property("size", 1);

            const emptyStack = new Stack<string>();
            const result = emptyStack.peek;
            expect(result).to.be.throw(Error);
        });
    });
});
describe("3 Array Stack", () => {
    it("1 Create", () => {
        const arrayStack: ArrayStack<string> = new ArrayStack<string>(10);
        expect(arrayStack).to.have.own.property("capacity", 10);
        expect(arrayStack).to.have.own.property("topOfStack", -1);
        expect(arrayStack).to.have.nested.property("array.length", 10);
    });
    it("2 push method ", () => {
        const arrayStack: ArrayStack<string> = new ArrayStack<string>(10);
        arrayStack.push("Galois");
        arrayStack.push("Gauss");
        expect(arrayStack).to.have.own.property("topOfStack", 1);
    });
    describe("3 Operate Object", () => {
        let arrayStack: ArrayStack<string> = null;
        before("1 Insert Data", () => {
            arrayStack = new ArrayStack<string>();
            arrayStack.push("Galois");
            arrayStack.push("Gauss");
        });
        after("E Clear Data", () => {
            arrayStack = null;
        });
        it("2 pop method ", () => {
            const data: string = arrayStack.pop();
            expect(data).to.be.equal("Gauss");
            expect(arrayStack).to.have.own.property("topOfStack", 0);

            const emptyStack = new ArrayStack<string>();
            const result = emptyStack.pop;
            expect(result).to.be.throw(Error);
        });
        it("2 peek method ", () => {
            const data: string = arrayStack.peek();
            expect(data).to.be.equal("Galois");
            expect(arrayStack).to.have.own.property("topOfStack", 0);
            arrayStack.pop();
            expect(arrayStack).to.have.own.property("topOfStack", -1);
            const emptyStack = new ArrayStack<string>();
            const result = emptyStack.peek;
            expect(result).to.be.throw(Error);
        });
    });

});
