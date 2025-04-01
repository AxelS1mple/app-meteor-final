import { Meteor } from "meteor/meteor";
import { ProfilesCollection } from "./profile";

if (Meteor.isServer) {
  Meteor.publish("profiles", function () {
    if (!this.userId) {
      return this.ready();
    }
    return ProfilesCollection.find();
  });
}
