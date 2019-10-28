import { expect } from "chai";
import { describe, it } from "mocha";
import { KMaxNumber } from "./../../app/practise/k-max-number/main";

/**
 * 第k个最大问题
 * cmd : npx mocha -r ts-node/register ./src/test/practise/k-max-number.spec.ts
 */
describe(" K max number in the N sequeuence", () => {
    it("1 test", () => {
        const array: number[] = [1, 2, 3, 4, 5, 6, 7, 8];
        const question = new KMaxNumber(array);
        const minArray = question.getKMaxNumberOne(5);
        // console.log(minArray);
        expect(minArray[array.length - 5 ]).to.be.equal(4);
    });

    it("2 test", () => {
        const array: number[] = [1, 2, 3, 4, 5, 6, 7, 8];
        const question = new KMaxNumber(array);
        const minArray = question.getKMaxNumberTwo(5);
        // console.log(minArray);
        expect(minArray[0]).to.be.equal(4);
    });
});
