const topics = {};
const hOP = topics.hasOwnProperty;

class Events {
  subscribe(topic, listener) {
    // Create the topic's object if not yet created
    if (!hOP.call(topics, topic)) topics[topic] = [];

    // Add the listener to queue
    const index = topics[topic].push(listener) - 1;

    // Provide handle back for removal of topic
    return {
      remove: function () {
        delete topics[topic][index];
      },
    };
  }

  publish(topic, info) {
    // If the topic doesn't exist, or there's no listeners in queue, just leave
    if (!hOP.call(topics, topic)) return;

    // Cycle through topics queue, fire!
    topics[topic].forEach(function (item) {
      item(info !== undefined ? info : {});
    });
  }

  unsubscribe(topic) {
    delete topics[topic];
  }
}

const EventObj = new Events();

export default EventObj;
