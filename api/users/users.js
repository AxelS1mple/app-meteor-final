import { Mongo } from 'meteor/mongo';

export const UsersCollection = new Mongo.Collection('app_users');

export const UserSchema = {
  UserName: { type: String, label: 'User Name' },
  firstName: { type: String, label: 'First Name' },
  middleName: { type: String, label: 'Middle Name' },
  lastName: { type: String, label: 'Last Name' },
  birthDate: { type: Date, label: 'Birth Date' },
  age: { type: Number, label: 'Age' },
  email: { type: String, label: 'Email' },
  phone: { type: String, label: 'Phone' },
  password: { type: String, label: 'Password' },
  gender: { type: String, label: 'Gender' },
  status: { type: String, label: 'Status' },
};
