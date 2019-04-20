## Schedule Functions called with `setTimeout`
##### Problem Domain:
Design a system for tracking when functions called with setTimeout will be fired. Include methods that allow you to cancel all functions, see what function will be fired next, and see the number of funtions set to be called in the future. 

##### Solution: 
Create a node class to store when the function will be executed, a reference to the function. Allow the node to be created with a timeoutHandler and a reference to the next node.

Create a Scheduler class with a priority queue that uses a linked list to store nodes in the correct order. Store the count and a reference to the intervalHandler in the constructor.

Methods:
`schedule` 
* input: callback function, delay in milliseconds
* action: 
  * uses setTimout to create a timeoutHandler
  * calls `addToPriorityQueue` with a new Node created with timeoutHanlder
* return: reference to the queue

`addToPriorityQueue`
* input: node 
* action: adds node to the correct place in the priority queue
  * ordered according to the point in time when the passed function will fire
  * first node in queue stores reference to the timeoutHandler that will expire first
  * increments count by 1
  * calls `startClearOut` if the queue was empty
* return: reference to the queue

`numberOfScheduled`
* return the count

`startClearOut`
* action: uses setInterval to call `clearOutQueue` and stores intervalHanlder in the class object

`clearOutQueue` 
* action: 
  * checks the first item in the queue for the time when fired and removes it from queue if time has passed (meaning event has already fired)
  * cancels the intervalHanlder if the queue is empty
  * decrements count if items are cleared out

Setup:
* clone repo
* npm i


Testing
* running tests: `npm test`
* assertions: 
  * nodes correctly added to queue
  * nodes store reference to correct function
  * queue is accurately cleared and count is correct
  * events can be canceled

