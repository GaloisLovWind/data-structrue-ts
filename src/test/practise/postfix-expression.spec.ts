import { expect } from "chai";
import { describe } from "mocha";
import { OperatorExpresionHandler } from "../../app/practise/postfix-expression/main";

/**
 *
 * 关于栈的应用1： 后缀表达式
 * cmd: npx mocha -r ts-node/register ./src/test/practise/postfix-expression.spec.ts
 * 6523+8*+3+*
 */
describe("1 PostFix Expression", () => {
    it("1 PostFix FixExpress", () => {
        let expression = "6 5 2 3 + 8 * + 3 + *";
        const operator: OperatorExpresionHandler = new OperatorExpresionHandler();
        let result: number =  operator.handlePostFix(expression);
        expect(result).to.be.equal(288);
        // console.log(result);
        expression = "4 3 +";
        result =  operator.handlePostFix(expression);
        expect(result).to.be.equal(7);
        // console.log(result);
    });

    it("2 InfixToPostfix FixExpress", () => {
        let expression = "a + b * c + ( d * e + f ) * g";
        const operator: OperatorExpresionHandler = new OperatorExpresionHandler();
        let postFixExpression: string =  operator.infixToPostfix(expression);
        expect(postFixExpression).to.equal("a b c * + d e * f + g * +");
        // console.log(postFixExpression);
        expression = "4 + 3 * 2";
        postFixExpression =  operator.infixToPostfix(expression);
        expect(postFixExpression).to.equal("4 3 2 * +");
        // console.log(postFixExpression);
        expression = "a - b - c";
        postFixExpression =  operator.infixToPostfix(expression);
        expect(postFixExpression).to.equal("a b - c -");
    });

    it("3 Operater Method", () => {
        let expression: string = "4 + 3 * 2";
        const operator: OperatorExpresionHandler = new OperatorExpresionHandler();
        let result = operator.Operater(expression);
        expect(result).to.be.equal(10);
        expression = "6 * ( 5 + ( 2 + 3 ) * 8 + 3 )";
        result = operator.Operater(expression);
        expect(result).to.be.equal(288);
    });
});
