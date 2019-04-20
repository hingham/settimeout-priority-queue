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

// node class
class Node {
  constructor(timeoutHandler, functionName) {
    this.functionName = functionName;
    this.expectedAt =
      timeoutHandler._idleTimeout + timeoutHandler._idleStart + Date.now();
    this.timeoutHandler = timeoutHandler;
    this.next = null;
  }
}

//scheduler class
class Scheduler {
    //construtor with queue, count, and interval handler
  constructor() {
    this.queue = null;
    this.intervalHandler = null;
    this.count = 0;
  }

  // schedule events in the queue according to when event will be executed
  schedule(cb, delay) {
    let timeoutHandler = setTimeout(cb, delay);
    return this.addToPriorityQueue(new Node(timeoutHandler, cb));
  }

  // update queue with new node
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
        prev = current;
        current = current.next;
      }
      prev.next = node;
      node.next = current;
    }
    this.count++;
    return this.queue;
  }

  // return the number of events in queue
  numberOfScheduled() {
    return this.count;
  }

  // cancel all events in the queue
  cancelAll() {
    let current = this.queue;
    while (current) {
      clearTimeout(current.timeoutHandler);
      current = current.next;
    }
  }

  // find the next event that will be executed
  nextUp() {
    return this.queue;
  }

  startClearOut() {
    this.intervalHandler = setInterval(() => {
      this.clearOutQueue();
    }, 500);
  }

  // clear out events that have already happened from the queue
  clearOutQueue() {
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

module.exports = { sayHi, sayHello, beSlow, Scheduler };
