import { Node } from "../basic-type/node";

export interface IHash<T, S> {

    find(key: T): S;
    insert(key: T): void;
    delete(key: T): void;
}
