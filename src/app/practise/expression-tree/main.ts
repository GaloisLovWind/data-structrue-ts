import { BTreeNode } from "../../example/basic-type/b-treenode";
import { Stack } from "../../example/stack/stack";
/**
 * 后缀表达式 转 表达式树
 */
export class ExpressionTreeOperator {

    private postFixExpression: string;
    private postFixExpressionArray: string[];
    constructor() {}

    public postFixToBTree(postFixExpression: string): BTreeNode<string> {
        this.postFixExpression = postFixExpression;
        const expressionStack: Stack<any> = new Stack<any>();
        this.postFixExpressionArray = postFixExpression.split(" ");
        for (const data of this.postFixExpressionArray) {
            if (this._isNumber(data) || this._isNumberOrChar(data)) {
                expressionStack.push(data);
            }
            if (this._isOperator(data)) {
                const data1 = expressionStack.pop();
                const data2 = expressionStack.pop();
                let treeNode1: BTreeNode<string>;
                let treeNode2: BTreeNode<string>;
                if (this._isNumber(data1)) {
                    treeNode1 = new BTreeNode<string>(data1);
                } else {
                    treeNode1 = data1;
                }
                if (this._isNumber(data2)) {
                    treeNode2 = new BTreeNode<string>(data1);
                } else {
                    treeNode2 = data2;
                }
                const treeNode = new BTreeNode<string>(data, treeNode2, treeNode1);
                expressionStack.push(treeNode);
            }
        }
        return expressionStack.pop();
    }

    private  _isNumber(s: string): boolean {
        const numberRegex =  /^([0-9]*|\d*.\d{1}?\d*)$/ ;
        return numberRegex.test(s);
    }
    private  _isNumberOrChar(s: string): boolean {
        const numberRegex =  /[\da-zA-Z]+/;
        return numberRegex.test(s);
    }
    private  _isOperator(s: string): boolean {
        const operatorRegex = /[+-\/\*\(\)]+/;
        return operatorRegex.test(s);
    }
}
