import mongoose, { Schema } from "mongoose";

const appointmentSchema = new Schema(
  {
    subject: String,
    organizer: String,
    date: Date,
    start: Date,
    end: Date,
    open: String,
    room_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room'
    }
  },
  {
    versionKey: false,
    collection: "appointments"
  }
);

const Appointment = mongoose.models.Appointment || mongoose.model("Appointment", appointmentSchema);

export default Appointment;
