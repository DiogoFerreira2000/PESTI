import connectMongoDB from "@/app/libs/mongodb";
import Appointment from "@/app/model/appointment";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    const { id } = params;
    const { newRoom: room, newSubject: subject, newOrganizer: organizer, newDate: date, newStart: start, newEnd: end, newOpen: open } = await request.json();
    await connectMongoDB();
    await Appointment.findByIdAndUpdate(id, { room, subject, organizer, date, start, end, open });
    return NextResponse.json({ message: "Appointment updated" }, { status: 200 });
}

export async function GET(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    const appointment = await Appointment.findOne({ _id: id });
    return NextResponse.json({ appointment }, { status: 200 });
}
