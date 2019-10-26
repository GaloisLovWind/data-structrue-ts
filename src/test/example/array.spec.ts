import { expect } from "chai";
import { describe, it } from "mocha";
import { MyArray } from "../../app/example/array";
/**
 * 数组
 * cmd: npx mocha -r ts-node/register ./src/test/example/array.spec.ts
 */
describe("1 Array ", () => {
    it("1 create ", () => {
        const myArray = new MyArray(10);
        expect(myArray).to.have.own.property("data");
        expect(myArray).to.have.own.property("size");
        expect(myArray).to.have.any.keys("data", "size");

    });
    it("2 insert", () => {
        const myArray: MyArray<string> = new MyArray(10);
        myArray.insert(0, "Galois");
        myArray.insert(1, "Gauss");
        myArray.insert(2, "Abel");
        expect(myArray).to.nested.include({ size : 3});
        expect(myArray).to.have.nested.property("data[0]");
        expect(myArray).to.nested.include({"data[0]": "Galois"});
        expect(myArray).to.nested.include({"data[1]": "Gauss"});
        expect(myArray).to.nested.include({"data[2]": "Abel"});
    });
    describe("3 Operate Array", () => {
        let myArray: MyArray<string> = null;
        before("1 Insert data", () => {
            myArray = new MyArray(10);
            myArray.insert(0, "Galois");
            myArray.insert(1, "Gauss");
            myArray.insert(2, "Abel");
        });
        after("2 delete data", () => {
            myArray = null;
        });
        it("3 get set ", () => {
            const data: string = myArray.get(2);
            expect(data).to.be.equal("Abel");
            myArray.set(2, "Eulor");
            expect(myArray).to.nested.include({"data[2]": "Eulor"});
        });
        it("4 remove", () => {
            myArray.remove(2);
            expect(myArray).to.nested.include({ size : 2});
            expect(myArray).to.nested.include({"data[2]": null});
        });
    });
});
