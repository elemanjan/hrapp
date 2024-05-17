let Events = {};
let hOP = Events.hasOwnProperty;

export default {
  subscribe(event, listener) {
    // Create the event's object if not yet created
    if (!hOP.call(Events, event)) {
      Events[event] = [];
    }

    // Add the listener to queue
    var index = Events[event].push(listener) - 1;

    // Provide handle back for removal of event
    return {
      remove() {
        delete Events[event][index];
      },
    };
  },

  publish(event, args) {
    // If the event doesn't exist, or there's no listeners in queue, just leave
    if (!hOP.call(Events, event)) {
      return;
    }

    // Cycle through events queue, fire!
    Events[event].forEach(fn => {
      fn(args);
    });
  },
};
