//write smaple functions

function sayHi() {
  console.log("hi");
  return;
}

function sayHello(str) {
  console.log("hello", str);
  return str;
}

function beSlow() {
  console.log("i am slow");
  return;
}

// write node class
class Node {
  constructor(timeoutHandler, functionName) {
    this.functionName = functionName;
    this.expectedAt =
      timeoutHandler._idleTimeout + timeoutHandler._idleStart + Date.now();
    this.timeoutHandler = timeoutHandler;
    this.next = null;
  }
}

//write scheduler class
class Scheduler {
  constructor() {
    this.queue = null;
    this.intervalHandler = null;
    this.count = 0;
  }
  //write a construtor with queue, count, and interval handler
  schedule(cb, delay) {
    let timeoutHandler = setTimeout(cb, delay);
    this.addToPriorityQueue(new Node(timeoutHandler, cb));
  }

  //write addToPriorityQueue
  addToPriorityQueue(node) {
    let current = this.queue;
    let prev = this.queue;
    if (this.queue == null) {
      this.queue = node;
      this.startClearOut();
    } else if (node.expectedAt < current.expectedAt) {
      this.queue = node;
      node.next = current;
    } else {
      while (current !== null && node.expectedAt > current.expectedAt) {
        // console.log("current, ", current);
        prev = current;
        current = current.next;
      }
      prev.next = node;
      node.next = current;
    }
    this.count++;
    console.log(this.queue);
    return this.queue;
  }

  numberOfScheduled() {
    // console.log("count", this.count);
    return this.count;
  }

  cancelAll() {
    let current = this.queue;
    while (current) {
      clearTimeout(current.timeoutHandler);
      current = current.next;
    }
  }

  nextUp() {
    return this.queue;
  }

  startClearOut() {
    this.intervalHandler = setInterval(() => {
      this.clearOutQueue();
    }, 500);
  }

  clearOutQueue() {
    console.log("count: ", this.count);

    if (this.queue == null) {
      clearInterval(this.intervalHandler);
    } else if (this.queue.expectedAt < Date.now()) {
      let temp = this.queue;
      this.queue = temp.next;
      temp.next = null;
      this.count--;
    }
  }
}

//write startInvertal -- to call clearOut, pass intervalHandler

//write clearOut to clear out functions already called

//

let mySchedule = new Scheduler();

mySchedule.schedule(sayHi, 3000);
mySchedule.schedule(sayHello, 500);
// mySchedule.schedule(beSlow, 1000);
mySchedule.numberOfScheduled();

// console.log(typeof mySchedule.queue.expectedAt);

module.exports = { sayHi, sayHello, beSlow, Scheduler };
