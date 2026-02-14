import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  contactNumber: { type: String, required: true },
  expert: { type: String, required: false },
  sessionDate: { type: String, required: true },
  sessionTime: { type: String, required: true },
  fees: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

delete mongoose.models.User;
export const User = mongoose.models.User || model("User", UserSchema);

const ContactSchema = new Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Contact = mongoose.models.Contact || model("Contact", ContactSchema);

const OtpSchema = new Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

export const Otp = models.Otp || model("Otp", OtpSchema);

const SettingsSchema = new Schema({
  key: { type: String, required: true, unique: true },
  value: { type: Schema.Types.Mixed, required: true },
});

export const Settings = models.Settings || model("Settings", SettingsSchema);

const AdminSchema = new Schema({
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

export const Admin = models.Admin || model("Admin", AdminSchema);
