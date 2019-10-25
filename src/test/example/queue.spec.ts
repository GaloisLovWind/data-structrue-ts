import { expect } from "chai";
import { describe } from "mocha";
import { MyArray } from "../../app/example/array/array";
import { ILink } from "../../app/example/interface/link.i";
import { Link } from "../../app/example/link/link";
import { ArrayQueue } from "../../app/example/queue/arrayqueue";
import { LinkQueue } from "../../app/example/queue/linkqueue";
import { Queue } from "../../app/example/queue/queue";
/**
 * 依赖已实现的数组和链表，组合实现队列 测试
 * cmd: npx mocha -r ts-node/register ./src/test/example/queue.spec.ts
 */
describe("1 Link Queue", () => {
    describe("1.1 Array Stack", () => {
        it("1 Create", () => {
            const array: ILink<string> = new MyArray<string>(10);
            const queue: LinkQueue<string> = new LinkQueue<string>(array);
            expect(queue).to.have.own.property("link", array);
        });
        it("2 push method", () => {
            const array: ILink<string> = new MyArray<string>(10);
            const queue: LinkQueue<string> = new LinkQueue<string>(array);
            let size: number = queue.getSize();
            expect(size).to.be.equal(0);
            queue.enqueue("Galois");
            queue.enqueue("Gauss");
            size = queue.getSize();
            expect(size).to.be.equal(2);
        });
        describe("3 Operate Queue", () => {
            let queue: LinkQueue<string>  = null;
            before("1 Insert Data", () => {
                const array: ILink<string> = new MyArray<string>(10);
                queue = new LinkQueue<string>(array);
                queue.enqueue("Galois");
                queue.enqueue("Gauss");
            });
            after("E Clear Data", () => {
                queue = null;
            });
            it("2 dequeue method", () => {
                const data: string = queue.dequeue();
                expect(data).to.be.equal("Galois");
            });
            it("3 getFront method", () => {
                const data: string = queue.getFront();
                expect(data).to.be.equal("Gauss");
            });
        });
    });

    describe("1.2 Link Queue", () => {
        it("1 Create", () => {
            const link: ILink<string> = new Link<string>();
            const queue: LinkQueue<string> = new LinkQueue<string>(link);
            expect(queue).to.have.own.property("link", link);
        });
        it("2 enqueue method", () => {
            const link: ILink<string> = new Link<string>();
            const queue: LinkQueue<string> = new LinkQueue<string>(link);
            let size: number = queue.getSize();
            expect(size).to.be.equal(0);
            queue.enqueue("Galois");
            queue.enqueue("Gauss");
            size = queue.getSize();
            expect(size).to.be.equal(2);
        });
        describe("3 Operate Queue", () => {
            let queue: LinkQueue<string>  = null;
            before("1 Insert Data", () => {
                const link: ILink<string> = new Link<string>();
                queue = new LinkQueue<string>(link);
                queue.enqueue("Galois");
                queue.enqueue("Gauss");
            });
            after("E Clear Data", () => {
                queue = null;
            });
            it("2 dequeue method", () => {
                const data: string = queue.dequeue();
                expect(data).to.be.equal("Galois");
            });
            it("3 getFront method", () => {
                const data: string = queue.getFront();
                expect(data).to.be.equal("Gauss");
            });
        });
    });
});

describe("2 Array Queue", () => {
    it("1 enqueue method", () => {
        const queue: ArrayQueue<string> = new ArrayQueue<string>(3);
        queue.enqueue("Galois");
        queue.enqueue("Gauss");
        queue.enqueue("Abel");
        const size: number = queue.getSize();
        expect(size).to.be.equal(3);
        expect(() => {queue.enqueue("Alex"); }).to.be.throw(Error);
    });
    it("2 dequeue method", () => {
        const queue: ArrayQueue<string> = new ArrayQueue<string>(3);
        queue.enqueue("Galois");
        queue.enqueue("Gauss");
        queue.enqueue("Abel");
        let data: string = queue.dequeue();
        expect(data).to.be.equal("Galois");
        data = queue.dequeue();
        expect(data).to.be.equal("Gauss");
        data = queue.dequeue();
        expect(data).to.be.equal("Abel");
        expect(() => {queue.dequeue(); }).to.be.throw(Error);
    });
});
describe("3 Node Queue", () => {
    it("1 enqueue method", () => {
        const queue: Queue<string> = new Queue<string>();
        queue.enqueue("Galois");
        queue.enqueue("Gauss");
        queue.enqueue("Abel");
        const size: number = queue.getSize();
        expect(size).to.be.equal(3);
    });
    it("2 dequeue method", () => {
        const queue: Queue<string> = new Queue<string>();
        queue.enqueue("Galois");
        queue.enqueue("Gauss");
        queue.enqueue("Abel");
        let data: string = queue.dequeue();
        expect(data).to.be.equal("Galois");
        data = queue.dequeue();
        expect(data).to.be.equal("Gauss");
        data = queue.dequeue();
        expect(data).to.be.equal("Abel");
        expect(() => {queue.dequeue(); }).to.be.throw(Error);
    });
});
