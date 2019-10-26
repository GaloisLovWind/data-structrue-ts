import { Node } from "../basic-type/node";
import { IHash } from "../interface/hash.i";
/**
 * 散列 -- 分离链接法
 * 将散列到同一值得所有元素保留到一个表中
 */
export class HashSeq<T> implements IHash<T, Node<T>> {
    private tableSize: number;
    private nodeArray: Array<Node<T>>;
    private hashFunc: (key: T, tableSize: number) => number;
    private size: number;

    constructor(tableSize: number, hashFunc: (key: T, tableSize: number) => number) {
        this.tableSize = tableSize;
        this.nodeArray = new Array(tableSize);
        this.hashFunc = hashFunc;
        this.size = 0;
        this.initNodeArray();  // 由于数组未初始化，其值为 undefined，所以全部初始化为 null
    }

    public find(key: T): Node<T> {
        const headerNode: Node<T> = this.nodeArray[this.hashFunc(key, this.tableSize)];
        let curNode: Node<T> = headerNode;
        while (curNode != null && curNode.data !== key) {
            curNode = curNode.next;
        }
        return curNode;
    }

    public insert(key: T): void {
        const pos: Node<T> = this.find(key);
        if ( pos === null) {
            const newNode: Node<T> = new Node<T>(key);
            const headerNode: Node<T> = this.nodeArray[this.hashFunc(key, this.tableSize)];
            if (!headerNode) {
                this.nodeArray[this.hashFunc(key, this.tableSize)] = newNode;
            } else {
                newNode.next = headerNode.next;
                headerNode.next = newNode;
            }
            this.size++;
        }
    }

    public delete(key: T): void {
        const headerNode: Node<T> = this.nodeArray[this.hashFunc(key, this.tableSize)];
        if (headerNode !== null) {
            let curNode: Node<T> = headerNode;
            if ( curNode.data === key) {
                this.nodeArray[this.hashFunc(key, this.tableSize)] = curNode.next;
            } else {
                while (curNode.next !== null) {
                    if (curNode.next.data !== key) {
                        curNode = curNode.next;
                    } else {
                        curNode.next = curNode.next.next;
                    }
                }
            }
        }
        this.size--;
    }

    private initNodeArray(): void {
        for (let i = 0; i < this.tableSize; i++ ) {
            this.nodeArray[i] = null;
        }
    }
}
