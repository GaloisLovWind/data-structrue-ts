import { MyArray } from "./example/array";
import { Node } from "./example/basic-type/node";
import { ILink } from "./example/interface/link.i";
import { IStack } from "./example/interface/stack.i";
import { Link } from "./example/link/link";
import { ArrayStack } from "./example/stack";

export class App {
    public static main(): void {
        console.log("This is main methods.");
        // console.log("***********0 Array************");
        // App.testArray();
        // console.log("***********01 Array************");
        // App.testNode();
        console.log("***********1 Link************");
        App.testLink();
        // console.log("***********2 Stack************");
        // App.testStack();
    }
    public static testArray() {
        const myArray = new MyArray(10);
        myArray.insert(0, "Galois");
        myArray.insert(1, "Gauss");
        myArray.insert(2, "Abel");
        console.log(myArray);
        console.log(myArray.get(2));
        myArray.set(2, "Eulor");
        console.log(myArray);
        myArray.remove(2);
        console.log(myArray);
    }
    public static testNode() {
        const node: Node<string> = new Node<string>("Galois");
        console.dir(node);
    }
    public static testLink() {
        const link: ILink<string> = new Link<string>();
        link.insert(0, "Galois");
        link.insert(1, "Gauss");
        link.insert(1, "Abel");
        console.log(link);
        link.addFirst("Eulor");
        link.addLast("Jim");
        console.log(link);
        let data = link.get(0);
        console.log("0: %s", data);
        data = link.get(1);
        console.log("1: %s", data);
    }

    public static testStack() {
        const stack: IStack<string> = new ArrayStack(10);
        stack.push("Galois");
        stack.push("Gauss");
        stack.push("Abel");
        console.log(stack);
        console.log(stack.pop());
        console.log(stack);
    }
}
