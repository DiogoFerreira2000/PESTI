import mongoose, { Schema } from "mongoose";

const appointmentSchema = new Schema(
  {
    room: String,
    subject: String,
    organizer: String,
    date: Date,
    start: Date,
    end: Date,
    open: Boolean,
  },
  {
    collection: "appointments"
  }
);

const Appointment = mongoose.models.Appointment || mongoose.model("Appointment", appointmentSchema);

export default Appointment;
