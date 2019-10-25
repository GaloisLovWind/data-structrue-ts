import { Stack } from "../../example/stack/stack";
/**
 * 关于栈的应用1： 后缀表达式
 * 未做输入输出的错误检测和错误识别
 * 简单例子
 */
export class OperatorExpresionHandler {

    private expression: string;
    private expressionArray: string[];
    private postFixExpression: string;
    private postFixArray: string[];
    // 优先级配置
    private  OPERATOR_PRIORITY: {
        [key: string]: number,
    } = {
        "(": 8,
        ")": 8,
        "*": 2,
        "+": 1,
        "-": 1,
    };
    constructor() {}
    public  Operater(expression: string): number {
        this.expression = expression;
        this.postFixExpression = this.infixToPostfix(this.expression);
        return this.handlePostFix(this.postFixExpression);
    }
    /**
     * 处理后缀表达式
     * format: a b c * + d e * f + g * +
     */
    public  handlePostFix(postFixExpression: string): number {
        const stack = new Stack<number>();
        this.postFixArray = postFixExpression.split(" ");
        for (const data of this.postFixArray) {
            if (this._isNumber(data)) {
                stack.push(Number(data));
            }
            if (this._isOperator(data)) {
                const a2 = stack.pop();
                const a1 = stack.pop();
                const result = this._OperatorResult(a1, a2, data);
                stack.push(result);
            }
        }
        return stack.pop();
    }
    /**
     * 处理中缀表达式转化成后缀表达式
     * format: a + b * c + ( d * e + f ) * g
     */
    public  infixToPostfix(infixExpression: string): string {
        const operaterStack = new Stack<string>();
        let output: string = "";
        this.expressionArray = infixExpression.split(" ");
        for (const data of this.expressionArray) {
            if (this._isNumberOrChar(data) || this._isNumber(data)) {
                output += `${data} `;
            }
            if (this._isOperator(data)) {
                if (operaterStack.isEmpty()) {
                    operaterStack.push(data);
                } else {
                    let optStack = operaterStack.peek();
                    if (data !== ")") {
                        while (this.OPERATOR_PRIORITY[optStack] >= this.OPERATOR_PRIORITY[data]) {
                            if (optStack === "(" ) {
                                break;
                            }
                            output += `${operaterStack.pop()} `;
                            if (operaterStack.isEmpty()) {
                                break;
                            }
                            optStack = operaterStack.peek();
                        }
                        operaterStack.push(data);
                    } else {
                        while (optStack !== "(") {
                            output += `${operaterStack.pop()} `;
                            if (operaterStack.isEmpty()) {
                                break;
                            }
                            optStack = operaterStack.peek();
                        }
                        if (optStack === "(") {
                            operaterStack.pop();
                        }

                    }
                }
            }
        }
        while (!operaterStack.isEmpty()) {
            output +=  `${operaterStack.pop()} `;
        }
        output = output.substr(0, output.length - 1);
        return output;
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

    private  _OperatorResult(a1: number, a2: number, opt: string): number {
        let result: number = 0;
        switch (opt) {
            case "+":
                result = a1 + a2;
                break;
            case "-":
                result = a1 - a2;
                break;
            case "*":
                result = a1 * a2;
                break;
            case "/":
                result = a1 / a2;
                break;
        }
        return result;
        // tslint:disable-next-line:no-eval
        // return eval(`${a1}${opt}${a2}`) as number;
    }
}
