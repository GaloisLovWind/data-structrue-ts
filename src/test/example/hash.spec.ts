import { expect } from "chai";
import { describe, it } from "mocha";
import { Node } from "../../app/example/basic-type/node";
import { HashQuad } from "../../app/example/hash/hashquad";
import { HashSeq } from "../../app/example/hash/hashseq";
import { HashUtils } from "../../app/example/utils/hash.utils";
/**
 * 散列
 * cmd: npx mocha -r ts-node/register ./src/test/example/hash.spec.ts
 */
describe("1 Hash Function", () => {
    // 散列函数
    it("1 asciiAddHash method", () => {
        let keyNum: number = 10;
        const tableSize: number = 11;
        let hashValue1: number = HashUtils.asciiAddHash<number>(keyNum, tableSize);
        expect(hashValue1).to.be.equal(9);
        keyNum = 11;
        hashValue1  = HashUtils.asciiAddHash<number>(keyNum, tableSize);
        expect(hashValue1).to.be.equal(10);
        let keyStr: string = "abc";
        let hashValue2: number = HashUtils.asciiAddHash<string>(keyStr, tableSize);
        expect(hashValue2).to.be.equal(8);
        keyStr = "abcd";
        hashValue2 = HashUtils.asciiAddHash<string>(keyStr, tableSize);
        expect(hashValue2).to.be.equal(9);
    });

    it("2 asciiAddForThreeHash method", () => {
        let keyNum: number = 10;
        const tableSize: number = 11;
        let hashValue1: number = HashUtils.asciiAddForThreeHash<number>(keyNum, tableSize);
        expect(hashValue1).to.be.equal(3);
        keyNum = 11;
        hashValue1  = HashUtils.asciiAddForThreeHash<number>(keyNum, tableSize);
        expect(hashValue1).to.be.equal(8);
        let keyStr: string = "abc";
        let hashValue2: number = HashUtils.asciiAddForThreeHash<string>(keyStr, tableSize);
        expect(hashValue2).to.be.equal(4);
        keyStr = "abcd";
        hashValue2 = HashUtils.asciiAddForThreeHash<string>(keyStr, tableSize);
        expect(hashValue2).to.be.equal(4);
    });

    it("3 asciiHornerHash method", () => {
        let keyNum: number = 10;
        const tableSize: number = 11;
        let hashValue1: number = HashUtils.asciiHornerHash<number>(keyNum, tableSize);
        expect(hashValue1).to.be.equal(4);
        keyNum = 11;
        hashValue1  = HashUtils.asciiHornerHash<number>(keyNum, tableSize);
        expect(hashValue1).to.be.equal(5);
        let keyStr: string = "abc";
        let hashValue2: number = HashUtils.asciiHornerHash<string>(keyStr, tableSize);
        expect(hashValue2).to.be.equal(0);
        keyStr = "abcd";
        hashValue2 = HashUtils.asciiHornerHash<string>(keyStr, tableSize);
        expect(hashValue2).to.be.equal(1);
    });
});

describe("2 HashSep", () => {
    it("1 Create", () => {
        const hasFunc: (key: string, tableSize: number) => number = HashUtils.asciiHornerHash;
        const hashSeq: HashSeq<string> = new HashSeq<string>(10, hasFunc);
        expect(hashSeq).to.have.own.property("hashFunc", hasFunc);
        expect(hashSeq).to.have.own.property("tableSize", 10);
        expect(hashSeq).to.have.nested.property("nodeArray").instanceof(Array);

    });

    it("2 insert method", () => {
        const hasFunc: (key: string, tableSize: number) => number = HashUtils.asciiHornerHash;
        const hashSeq: HashSeq<string> = new HashSeq<string>(4, hasFunc);
        hashSeq.insert("a");
        hashSeq.insert("b");
        hashSeq.insert("c");
        hashSeq.insert("d");
        hashSeq.insert("f");
        hashSeq.insert("g");
        expect(hashSeq).to.have.nested.property("nodeArray[0].data", "d");
        expect(hashSeq).to.have.nested.property("nodeArray[1].data", "a");
        expect(hashSeq).to.have.nested.property("nodeArray[2].data", "b");
        expect(hashSeq).to.have.nested.property("nodeArray[3].data", "c");
    });

    it("3 find method", () => {
        const hasFunc: (key: string, tableSize: number) => number = HashUtils.asciiHornerHash;
        const hashSeq: HashSeq<string> = new HashSeq<string>(4, hasFunc);
        hashSeq.insert("a");
        hashSeq.insert("b");
        hashSeq.insert("c");
        hashSeq.insert("d");
        hashSeq.insert("f");
        hashSeq.insert("g");
        let node: Node<string> = hashSeq.find("d");
        expect(node).to.have.nested.property("data", "d");
        expect(node).to.have.nested.property("next", null);
        node = hashSeq.find("b");
        expect(node).to.have.nested.property("data", "b");
        expect(node).to.have.nested.property("next.data", "f");
    });
    it("2 delete method", () => {
        const hasFunc: (key: string, tableSize: number) => number = HashUtils.asciiHornerHash;
        const hashSeq: HashSeq<string> = new HashSeq<string>(4, hasFunc);
        hashSeq.insert("a");
        hashSeq.insert("b");
        hashSeq.insert("c");
        hashSeq.insert("d");
        hashSeq.insert("f");
        hashSeq.delete("f");
        const node = hashSeq.find("b");
        expect(node).to.have.nested.property("data", "b");
        expect(node).to.have.nested.property("next", null );
    });
});

describe("3 HashQuad", () => {
    it("1 Create", () => {
        const hasFunc: (key: string, tableSize: number) => number = HashUtils.asciiHornerHash;
         // tslint:disable-next-line:max-line-length
        const soundexFunc: (curPos: number, collisionNum: number, tableSize: number) => number = HashUtils.squareSoundex;
        const hashQuad: HashQuad<string> = new HashQuad<string>(10, hasFunc, soundexFunc);
        expect(hashQuad).to.have.own.property("hashFunc", hasFunc);
        expect(hashQuad).to.have.own.property("tableSize", 10);
        expect(hashQuad).to.have.nested.property("cellArray").instanceof(Array);

    });

    it("2.1 squareSoundex  insert method", () => {
        const hasFunc: (key: string, tableSize: number) => number = HashUtils.asciiHornerHash;
         // tslint:disable-next-line:max-line-length
        const soundexFunc: (curPos: number, collisionNum: number, tableSize: number) => number = HashUtils.squareSoundex;
        const hashQuad: HashQuad<string> = new HashQuad<string>(10, hasFunc, soundexFunc);
        hashQuad.insert("a");
        hashQuad.insert("b");
        hashQuad.insert("c");
        hashQuad.insert("d");
        hashQuad.insert("f");
        hashQuad.insert("g");
        // console.log(hashQuad);
        expect(hashQuad).to.have.nested.property("cellArray[0].data", "d");
        expect(hashQuad).to.have.nested.property("cellArray[1].data", null);
    });
    it("2.2 lineSoundex  insert method", () => {
        const hasFunc: (key: string, tableSize: number) => number = HashUtils.asciiHornerHash;
         // tslint:disable-next-line:max-line-length
        const soundexFunc: (curPos: number, collisionNum: number, tableSize: number) => number = HashUtils.lineSoundex;
        const hashQuad: HashQuad<string> = new HashQuad<string>(10, hasFunc, soundexFunc);
        hashQuad.insert("a");
        hashQuad.insert("b");
        hashQuad.insert("c");
        hashQuad.insert("d");
        hashQuad.insert("f");
        hashQuad.insert("g");
        // console.log(hashQuad);
        expect(hashQuad).to.have.nested.property("cellArray[0].data", "d");
        expect(hashQuad).to.have.nested.property("cellArray[1].data", null);
    });
    it("3 find method", () => {
        const hasFunc: (key: string, tableSize: number) => number = HashUtils.asciiHornerHash;
         // tslint:disable-next-line:max-line-length
        const soundexFunc: (curPos: number, collisionNum: number, tableSize: number) => number = HashUtils.squareSoundex;
        const hashQuad: HashQuad<string> = new HashQuad<string>(10, hasFunc, soundexFunc);
        hashQuad.insert("a");
        hashQuad.insert("b");
        hashQuad.insert("c");
        hashQuad.insert("d");
        hashQuad.insert("f");
        hashQuad.insert("g");
        let node: number = hashQuad.find("d");
        expect(node).to.be.equal(0);
        node = hashQuad.find("b");
        expect(node).to.be.equal(8);
    });

    it("4 delete method", () => {
        const hasFunc: (key: string, tableSize: number) => number = HashUtils.asciiHornerHash;
        // tslint:disable-next-line:max-line-length
        const soundexFunc: (curPos: number, collisionNum: number, tableSize: number) => number = HashUtils.squareSoundex;
        const hashQuad: HashQuad<string> = new HashQuad<string>(10, hasFunc, soundexFunc);
        hashQuad.insert("a");
        hashQuad.insert("b");
        hashQuad.insert("c");
        hashQuad.insert("d");
        hashQuad.insert("f");
        hashQuad.insert("g");
        hashQuad.delete("d");
        // console.log(hashQuad);
        expect(hashQuad).to.have.nested.property("cellArray[0].info", 2);
    });

});
