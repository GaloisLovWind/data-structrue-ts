import { describe, it} from "mocha";
import { MaxChildArraySum } from "./../../app/practise/max-child-array-sum/main";
/**
 * 最大子序列和问题
 * cmd : npx mocha -r ts-node/register ./src/test/practise/max-child-array-sum.spec.ts
 */
describe("Max SubSequeuence Max", () => {

    it("1 test", () => {
        const array: number[] = [4, -3, 5, -2, -1, 2, 6, -2];
        const question: MaxChildArraySum = new MaxChildArraySum(array);
        const sum = question.maxSubSequeuenceSum();
        console.log(sum);
    });
});
