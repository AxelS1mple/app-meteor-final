import { Meteor } from 'meteor/meteor';
import { Modules } from './modules';

Meteor.publish('modules', function() {
  return Modules.find();
});
