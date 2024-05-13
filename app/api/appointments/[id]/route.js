import connectMongoDB from "@/app/mongodb/mongodb";
import Appointment from "@/app/model/appointment";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    const { id } = params;
    const { 
        subject: newSubject, 
        organizer: newOrganizer, 
        date: newDate, 
        start: newStart, 
        end: newEnd, 
        open: newOpen, 
        room_id: newRoomId 
    } = await request.json();

    await connectMongoDB();

    const update = {
        subject: newSubject,
        organizer: newOrganizer,
        date: newDate,
        start: newStart,
        end: newEnd,
        open: newOpen,
        room_id: newRoomId
    };

    await Appointment.findByIdAndUpdate(id, update);
    return NextResponse.json({ message: "Appointment updated" }, { status: 200 });
}

export async function GET(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    const appointment = await Appointment.findOne({ _id: id });
    return NextResponse.json({ appointment }, { status: 200 });
}
