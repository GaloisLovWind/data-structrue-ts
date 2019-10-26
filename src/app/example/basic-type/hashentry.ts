import { KindOfEntry } from "./kindofentry";

export class HashEntry<T> {

    public data: T;
    public info: KindOfEntry = KindOfEntry.Empty;

    constructor(data: T, info: KindOfEntry = KindOfEntry.Empty) {
        this.data = data;
        this.info = info;
    }
}
