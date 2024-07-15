import mongoose from 'mongoose';

import { Schema } from 'mongoose';

export interface Iuser {
  _id?: string;
  firstname: string;
  lastname: string;
  password: string;
  email: string;
}

const userSchema: Schema = new mongoose.Schema<Iuser>(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const user = mongoose.model<Iuser>('user', userSchema);
