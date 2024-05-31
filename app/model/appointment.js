import mongoose, { Schema } from "mongoose";

const appointmentSchema = new Schema(
  {
    subject: { type: String, required: true },
    organizer: { type: String, required: true },
    date: { type: Date, required: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    open: { type: String, required: true },
    room_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
      required: true
    }
  },
  {
    versionKey: false,
    collection: "appointments"
  }
);

const Appointment = mongoose.models.Appointment || mongoose.model("Appointment", appointmentSchema);

export default Appointment;
