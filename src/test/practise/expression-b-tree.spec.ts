import { expect } from "chai";
import { describe, it } from "mocha";
import { ExpressionTreeOperator } from "../../app/practise/expression-tree/main";

/**
 * 后缀表达式 转 表达式树
 * cmd: npx mocha -r ts-node/register ./src/test/practise/expression-b-tree.spec.ts
 */
describe("PostFix Expression To B-Tree ", () => {
    it("1 test", () => {
        const operator = new  ExpressionTreeOperator();
        const exprssion = "a b + c d e + * *";
        const result = operator.postFixToBTree(exprssion);
        // console.log(result);
        expect(result).to.have.own.property("data",  "*" );
    });
});
