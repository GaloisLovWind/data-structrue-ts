import { KeyValueNode } from "./../../example/basic-type/key-calvalue-node";
import { BHeapExt } from "./../../example/priority-queue/b-heap.ext";

/**
 * N 个元素中找出第 k 个最大元素
 * 方法：
 *  1. 建立一个容量为N 的二叉max堆，然后执行 deleteMax 方法 （由于本项目实现的是 二叉 min 堆，则把最大换成 最小）
 *  2. 建立一个容量为k 的二叉min堆， 先插入k 个，然后执行 N - k 次执行 deleteMin 方法 和 insert 方法
 */
export class KMaxNumber {
    private size: number = 0;
    constructor(private array: number[]) {
        this.size = this.array.length;
    }
    /**
     * 建立一个容量为N 的二叉max堆，然后执行 deleteMax 方法 （由于本项目实现的是 二叉 min 堆，获取的是执行 n-k 次 deletemin 方法）
     * @param k 第k个最大元素
     */
    public getKMaxNumberOne(k: number): number[] {
        const bHeap: BHeapExt<number> = this.handleToHeap(this.array.slice(0, this.size));
        const minArray: number[] = [];
        let node: KeyValueNode<number> = null;
        for (let i = this.size - k ; i >= 0; i--) {
            node = bHeap.deleteMin();
            if ( node != null) {
                minArray.push(node.key);
            }
        }
        return minArray;
    }
    /**
     * 建立一个容量为k 的二叉min堆， 先插入k 个，然后执行 N - k 次执行 deleteMin 方法 和 insert 方法
     * @param k 第k个最大元素
     */
    public getKMaxNumberTwo(k: number): number[] {
        const bHeap: BHeapExt<number> = this.handleToHeap(this.array.slice(0, k));
        const minArray: number[] = [];

        for (let i = k; i < this.size ; i++) {
            bHeap.deleteMin();
            bHeap.insert(this.array[i]);
        }
        for (let i = 0; i < k; i ++) {
            minArray.push(bHeap.deleteMin().key);
        }
        return minArray;
    }

    private handleToHeap( array: number[]) {
        const bHeap: BHeapExt<number> = new BHeapExt<number>(array.length + 1);
        bHeap.buildArrayToHeap(array);
        return bHeap;
    }
}
