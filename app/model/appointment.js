import mongoose, { Schema } from "mongoose";

const appointmentSchema = new Schema(
  {
    subject: String,
    organizer: String,
    date: Date,
    start: Date,
    end: Date,
    open: String,
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room'
    }
  },
  {
    collection: "appointments"
  }
);

const Appointment = mongoose.models.Appointment || mongoose.model("Appointment", appointmentSchema);

export default Appointment;
