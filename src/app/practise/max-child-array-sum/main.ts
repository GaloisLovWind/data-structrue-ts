/**
 * 最大子序列问题
 */
export class MaxChildArraySum {

    private array: number[];
    constructor(array: number[]) {
        this.array = array;
    }

    public maxSubSequeuenceSum() {
        return this.maxSubSum(0, this.array.length - 1);
    }

    private maxSubSum(left: number, right: number) {
        let maxLeftBorderSum: number = 0;
        let maxRightBorderSum: number = 0;
        let leftBorderSum: number = 0;
        let rightBorderSum: number = 0;
        let i: number;
        if (left === right) {
            if (this.array[left] > 0) {
                return this.array[left];
            }
            return 0;
        }
        const center: number = Math.floor((left + right) / 2);
        const maxLefSum: number = this.maxSubSum(left, center);
        const maxRightSum: number = this.maxSubSum(center + 1, right);
        for (i = center; i >= left ; i--) {
            leftBorderSum += this.array[i];
            if (leftBorderSum > maxLeftBorderSum) {
                maxLeftBorderSum = leftBorderSum;
            }
        }
        for (i = center + 1; i <= right ; i++) {
            rightBorderSum += this.array[i];
            if (leftBorderSum > maxRightBorderSum) {
                maxRightBorderSum = rightBorderSum;
            }
        }
        console.log(maxLefSum, maxRightSum, maxLeftBorderSum + maxRightBorderSum );
        return this.max3(maxLefSum, maxRightSum, maxLeftBorderSum + maxRightBorderSum);

    }

    private max3(m1: number, m2: number, m3: number): number {
        const  temp = m1 > m2 ? m1 : m2;
        return (m3 > temp ? m3 : temp);
    }
}
