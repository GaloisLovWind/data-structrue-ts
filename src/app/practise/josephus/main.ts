/**
 * Josephus 问题 详细见 数据结构与算法分析 C 第二版课后习题 3.10
 */
export class Josephus {

    private peopleNumber: number;
    private times: number;
    private id: number;
    private peopleArray: number[];
    private weedOutPeopleArray: number[];

    constructor(peopleNumber: number, times: number, id: number) {
        this.peopleNumber = peopleNumber;
        this.times = times;
        this.id = id;
        this.peopleArray = new Array<number>(this.peopleNumber);
        this.weedOutPeopleArray = new Array<number>(this.peopleNumber - 1);
        this.initializePeople();

    }

    public handle(): number {
        let index: number = this.id - 1; // 报数的编号
        let count = 0;
        let t = 0; // 报数次数
        while (count < this.peopleNumber - 1) {
            if (this.peopleArray[index] !== 0) {
                t++;
            }
            if ( t === this.times + 1) { // 报第 t + 1 个时，报第 t 个的剔除
                t = 0;
                this.weedOutPeopleArray[count] = this.peopleArray[index];
                count++;
                this.peopleArray[index] = 0;
            }
            index++;
            if (index === this.peopleNumber) {
                index = 0;
            }
        }
        let i = 0;
        for (; i < this.peopleNumber; i++) {
            if (this.peopleArray[i] !== 0 ) {
                break;
            }
        }
        return this.peopleArray[i];
    }

    private initializePeople() {
        for (let i = 0; i < this.peopleNumber; i++) {
            this.peopleArray[i] = i + 1;
        }
    }

    get WeekOutPeopleArray(): number[] {
        return this.weedOutPeopleArray;
    }

}
