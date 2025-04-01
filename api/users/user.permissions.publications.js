import { Meteor } from "meteor/meteor";

Meteor.publish("allUsers", function () {
  if (!this.userId) {
    return this.ready();
  }

  return Meteor.users.find({}, { fields: { username: 1, permissions: 1 } });
});
