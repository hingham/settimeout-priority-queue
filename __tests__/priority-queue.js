let { Scheduler, sayHi, saySomething, beSlow } = require('../index.js');

let mySchedule;
beforeEach(() => {
  mySchedule = new Scheduler();
});

describe('The Scheduler class', () => {
  it('can schedule an event', () => {
    mySchedule.schedule(sayHi, 1);
    let timeSet = mySchedule.queue.expectedAt >= Date.now() ? true : false;
    expect(mySchedule.queue).not.toBeNull();
    expect(timeSet).toBeDefined();
  });

  it('knows how many events are queued', () => {
    mySchedule.schedule(sayHi, 100);
    mySchedule.schedule(sayHi, 100);
    mySchedule.schedule(beSlow, 400);
    expect(mySchedule.numberOfScheduled()).toEqual(3);
  });

  it('correctly places a new event in the priority queueu', () => {
    mySchedule.schedule(sayHi, 100);
    mySchedule.schedule(beSlow, 400);
    let func = mySchedule.queue.next.functionName;
    expect(func).toEqual(beSlow);
  });

  it('stores in the nodes the time that the event should fire', () => {
    mySchedule.schedule(beSlow, 1000);
    mySchedule.schedule(beSlow, 4000);

    let timeout = mySchedule.queue;
    console.log(timeout);
    expect(timeout).toBe('number');
  });

  it('clears out events on an interval if they have already fired', () => {
    mySchedule.schedule(sayHi, 300);
    mySchedule.schedule(saySomething, 600);
    mySchedule.schedule(sayHi, 2000);
    let eventsAfter500;
    setTimeout(() => {
      eventsAfter500 = mySchedule.numberOfScheduled();
      expect(eventsAfter500).toEqual(2);
    }, 500);
  });

  it('cancels all events when cancel is called', () => {
    const sayHi = jest.fn();
    mySchedule.schedule(sayHi, 10);
    mySchedule.cancelAll();
    setTimeout(() => {
      expect(sayHi).not.toBeCalled();
    }, 200);
  });

  it('returns the next up item when nextUp is called', () => {
    mySchedule.schedule(saySomething, 700);
    mySchedule.schedule(sayHi, 200);
    let next = mySchedule.nextUp();
    let func = mySchedule.queue;
    expect(next).toBe(func);
  });
});
