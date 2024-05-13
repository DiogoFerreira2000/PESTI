import connectMongoDB from "@/app/mongodb/mongodb";
import Appointment from "@/app/model/appointment";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { subject, organizer, date, start, end, open, room_id } = await request.json();
    await connectMongoDB();
    await Appointment.create({ subject, organizer, date, start, end, open, room_id });
    return NextResponse.json({ message: "Appointment Created" }, { status: 201 });
}

export async function GET() {
    await connectMongoDB();
    const appointments = await Appointment.find();
    return NextResponse.json(appointments);
};

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("_id");
    await connectMongoDB();
    await Appointment.findByIdAndDelete(id);
    return NextResponse.json({ message: "Appointment deleted" }, { status: 200 });
}
