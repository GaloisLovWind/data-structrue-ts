import { HashEntry } from "../basic-type/hashentry";
import { KindOfEntry } from "../basic-type/kindofentry";
import { IHash } from "../interface/hash.i";

export class HashQuad<T> implements IHash<T, number> {

    private tableSize: number;
    private cellArray: Array<HashEntry<T>>;
    private hashFunc: (key: T, tableSize: number) => number;
    private soundexFunc: (curPos: number, collisionNum: number, tableSize: number) => number;
    private size: number;

    constructor(tableSize: number, hashFunc: (key: T, tableSize: number) => number,
                soundexFunc: (curPos: number, collisionNum: number, tableSize: number) => number) {
        this.tableSize = tableSize;
        this.cellArray = new Array<HashEntry<T>>(tableSize);
        this.hashFunc = hashFunc;
        this.soundexFunc = soundexFunc;
        this.size = 0;
        this.initCellArray(); // 由于数组未初始化，其值为 undefined，所以全部初始化为 null
    }

    public find(key: T): number {
        let collisionNum: number = 0;
        let currentPos: number = this.hashFunc(key, this.tableSize);
        while (this.cellArray[currentPos].info !== KindOfEntry.Empty &&
            this.cellArray[currentPos].data !== key) {
                collisionNum++;
                currentPos = this.soundexFunc(currentPos, collisionNum, this.tableSize);
        }
        return currentPos;
    }

    public insert(key: T): void {
        const pos: number = this.find(key);
        if ( this.cellArray[pos].info !== KindOfEntry.Legitimate) {
            this.cellArray[pos].info = KindOfEntry.Legitimate;
            this.cellArray[pos].data = key;
            this.size++;
        }
    }
    /**
     * 假删除， 若列表中存在保存的数据，则把状态改成 Delete，否则不变
     * @param key 关键字
     */
    public delete(key: T): void {
        const pos: number = this.find(key);
        if (this.cellArray[pos].info === KindOfEntry.Legitimate) {
            this.cellArray[pos].info = KindOfEntry.Delete;
            this.size--;
        }
    }

    private initCellArray(): void {
        for (let i = 0; i < this.tableSize; i++) {
            this.cellArray[i] = new HashEntry(null, KindOfEntry.Empty);
        }
    }

    private _insertIntoHashArray(key: T, cellArray: Array<HashEntry<T>>): void {
        const pos: number = this.find(key);
        if ( cellArray[pos].info !== KindOfEntry.Legitimate) {
            cellArray[pos].info = KindOfEntry.Legitimate;
            cellArray[pos].data = key;
        }
    }

    private rehash() {
        const newTableSize: number = this.tableSize * 2;
        const newCellArray: Array<HashEntry<T>> = new Array<HashEntry<T>>(newTableSize);
        for (let i = 0; i < this.tableSize; i++) {
            if (this.cellArray[i].info === KindOfEntry.Legitimate) {
                this._insertIntoHashArray(this.cellArray[i].data, newCellArray);
            }
        }
        this.cellArray = newCellArray;
        this.tableSize = newTableSize;
    }

}
