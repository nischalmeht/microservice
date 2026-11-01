import { model, Schema } from 'mongoose';

export const MOBILE_NUMBER_PATTERN = /^[1-9][0-9]{9}$/;

const userSchema = new Schema({
  username: { type: String, required: true },
  mobileNumber: {
    type: String,
    required: true,
    match: [
      MOBILE_NUMBER_PATTERN,
      'The value of path {PATH} ({VALUE}) is not a valid mobile number.',
    ],
  },
  createdAt: { type: Date, default: Date.now },
});

export const User = model('User', userSchema);
