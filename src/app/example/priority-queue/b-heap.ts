/**
 * 二叉堆（最小堆）
 * key计算方法，和 key值增加的方法 DecreaseKey, IncreaseKey 增加只是key值，而不改变数据,所以无法实现
 * DecreaseKey, IncreaseKey 实现方法：
 *  1. 数据类型 T 保留 key 的值; 实现 ./b-heap.ext.ts
 *  2. 在此类中，新建一个同容量的数值用来保存 增加key值的值，默认为 0；
 */
export class BHeap<T> {
    private capacity: number;
    private size: number;
    private elementArray: T[];

    constructor(capacity: number) {
        this.capacity = capacity;
        this.elementArray = new Array(this.capacity);
        this.size = 0;
        this.elementArray[0] = null ;
    }

    public isEmpty(): boolean {
        return this.size === 0;
    }

    public getSize(): number {
        return this.size;
    }

    public isFull(): boolean {
        return this.size === this.capacity - 1;
    }

    public insert(key: T): void {
        if (this.isFull()) {
            throw new Error("Priority queue is full");
        }
        const index: number = ++this.size;
        this.elementArray[index] = key;
        this.percolateUp(index);
        // tslint:disable-next-line:max-line-length
        // while (this._calculteHashWithKey(this.elementArray[Math.floor(index / 2)]) >  this._calculteHashWithKey(key)  && index !== 0) {
        //     if ( Math.floor(index / 2) === 0) {
        //         break;
        //     }
        //     this.elementArray[index] = this.elementArray[Math.floor(index / 2)];
        //     index = Math.floor(index / 2);
        // }
        // this.elementArray[index] = key;
    }

    public deleteMin(): T {
        const i: number = 0;
        const child: number = 0;
        let minElement: T;
        let  lastElement: T;
        if (this.isEmpty()) {
            return this.elementArray[0];
        }
        minElement = this.elementArray[1];
        lastElement = this.elementArray[this.size];
        this.swap(1, this.size);
        this.elementArray[this.size] = undefined;  // 清空
        this.size--;
        this.percolateDown(1);
        // for (i = 1; i * 2 <= this.size; i = child) {
        //     child = i * 2;
        //     // tslint:disable-next-line:max-line-length
        // tslint:disable-next-line:max-line-length
        //     if ( child !== this.size && this._calculteHashWithKey(this.elementArray[child + 1]) < this._calculteHashWithKey(this.elementArray[child])) {
        //         child++;
        //     }
        //     if (this._calculteHashWithKey(lastElement) > this._calculteHashWithKey(this.elementArray[child])) {
        //         this.elementArray[i] = this.elementArray[child];
        //     } else {
        //         break;
        //     }
        // }
        // this.elementArray[i] = lastElement;
        return minElement;
    }

    // public DecreaseKey(index: number, describeKey: T) {
    //     this.elementArray[index] += describeKey;

    // }

    private swap(indexOfKey1: number, indexOfKey2: number) {
        const tmp: T = this.elementArray[indexOfKey1];
        this.elementArray[indexOfKey1] = this.elementArray[indexOfKey2];
        this.elementArray[indexOfKey2] = tmp;
    }

    /**
     * 下滤
     * @param index 需要过滤的位置索引
     */
    private percolateDown(index: number): void {
        let i: number = index;
        let child: number = 0;
        const temp: T = this.elementArray[i];
        for (; 2 * index <= this.size; i = child ) {
            child = 2 * i;
            // tslint:disable-next-line:max-line-length
            if ( child !== this.size &&  this._calculteHashWithKey(this.elementArray[child + 1]) < this._calculteHashWithKey(this.elementArray[child])) {
                child++;
            }
            if (this._calculteHashWithKey(temp) > this._calculteHashWithKey(this.elementArray[child])) {
                this.elementArray[i] = this.elementArray[child];
            } else {
                break;
            }
        }
        this.elementArray[i] = temp;
    }
    /**
     * 上滤
     * 由于 泛型中参数没有默认最小值， 则 在索引0处的判断大小需要加限制 Math.floor(i / 2) !== 0
     * @param index 需要过滤的位置索引
     */
    private percolateUp(index: number): void {
        let i: number = index;
        const temp: T = this.elementArray[index];
        // tslint:disable-next-line:max-line-length
        while (this._calculteHashWithKey(this.elementArray[Math.floor(i / 2)]) > this._calculteHashWithKey(temp) && Math.floor(i / 2) !== 0) {
            this.elementArray[i] = this.elementArray[Math.floor(i / 2)];
            i = Math.floor(i / 2);
        }
        this.elementArray[i] = temp;
    }

    /**
     * 计算关键字的 hash 值
     * @param key 关键字
     */
    private _calculteHashWithKey(key: T): number {
        let hashValue: number = 0;
        if ( typeof key === "number") {
            hashValue = key as number;
        } else {
            const keyStr = String(key);
            for (const item of keyStr) {
                hashValue += item.charCodeAt(0);
            }
        }
        return hashValue;
    }

}
