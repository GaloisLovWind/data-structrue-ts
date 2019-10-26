
/**
 * 散列函数
 */
export class HashUtils {

    /**
     * 把字符串中字符的 ASCII 码值 加起来
     * @param key 关键字
     * @param tableSize 表的大小
     */
    public static asciiAddHash<T>(key: T, tableSize: number): number {
        let hashVal: number = 0;
        if (HashUtils.isNumber(key)) {
            hashVal = Number(key);
            return hashVal % tableSize;
        }
        const keyStr = String(key);
        for (let i = 0; i < keyStr.length; i++) {
            hashVal += keyStr.charCodeAt(i);
        }
        return hashVal % tableSize;
    }

    /**
     * hash 函数
     * @param key  关键字
     * @param tableSize  表的大小
     */
    public static asciiAddForThreeHash<T>(key: T, tableSize: number): number {
        let hashVal: number = 0;
        if (HashUtils.isNumber(key)) {
            hashVal = Number(key);
            return hashVal % tableSize;
        }
        const keyStr = String(key);
        const keyLen = keyStr.length;
        if (keyLen > 0) {
            hashVal += keyStr.charCodeAt(0);
        }
        if (keyLen > 1) {
            hashVal += keyStr.charCodeAt(1) * 27 ;
        }
        if (keyLen > 2) {
            hashVal += keyStr.charCodeAt(2) * 729;
        }
        return hashVal % tableSize;
    }
    /**
     * hash 函数
     * @param key  关键字
     * @param tableSize  表的大小
     */
    public static asciiHornerHash<T>(key: T, tableSize: number): number {
        let hashVal: number = 0;
        if (HashUtils.isNumber(key)) {
            hashVal = Number(key);
            return hashVal % tableSize;
        }
        const keyStr = String(key);
        for (let i = 0; i < keyStr.length; i++) {
            // tslint:disable-next-line: no-bitwise
            hashVal += (hashVal << 5 ) +  keyStr.charCodeAt(i);
        }
        return hashVal % tableSize;
    }
    /**
     * 线性探测法
     * @param collisionNum 探测的次数
     * @param tableSize 表头大小
     */
    public static lineSoundex(curPos: number, collisionNum: number, tableSize: number): number {
        let nextPos: number = curPos + 1 ;
        if ( nextPos >= tableSize) {
            nextPos -= tableSize;
        }
        return nextPos;
    }
    /**
     * 线性探测法
     * @param collisionNum 探测的次数
     * @param tableSize 表头大小
     */
    public static squareSoundex(curPos: number, collisionNum: number, tableSize: number): number {
        let nextPos: number = curPos + 2 * collisionNum - 1;
        if ( nextPos >= tableSize) {
            nextPos -= tableSize;
        }
        return nextPos;
    }
    /**
     * 双散列
     * @param curPos 当前位置
     * @param collisionNum 探测的次数
     * @param tableSize 表头大小
     * @param key 关键字
     * @param hashFunc hash 函数
     */
    // tslint:disable-next-line: max-line-length
    public static doubleHashSoundex<T>(curPos: number, collisionNum: number, tableSize: number, key: T,  hashFunc: (key: T, tableSize: number) => number ): number {
        let nextPos: number = curPos + hashFunc(key, tableSize) ;
        if ( nextPos >= tableSize) {
            nextPos -= tableSize;
        }
        return nextPos;
    }

    public static isNumber<T>( num: T): boolean {
        return typeof num === "number";
    }

}
