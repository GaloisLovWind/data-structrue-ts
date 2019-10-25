import { expect } from "chai";
import { describe } from "mocha";
import { Josephus } from "../../app/practise/josephus/main";
/**
 * Josephus 问题 详细见 数据结构与算法分析 C 第二版 3.10
 * cmd : npx mocha -r ts-node/register ./src/test/practise/josephus.spec.ts
 */
describe("Josephus Question", () => {

    it("1 test", () => {
        const jose: Josephus = new Josephus(5, 0, 1);
        const num = jose.handle();
        // console.log(jose.WeekOutPeopleArray);
        // console.log(num);
        expect(num).to.be.equal(5);
    });
    it("2 test", () => {
        const jose: Josephus = new Josephus(5, 1, 1);
        const num = jose.handle();
        // console.log(jose.WeekOutPeopleArray);
        // console.log(num);
        expect(num).to.be.equal(3);
    });
});
