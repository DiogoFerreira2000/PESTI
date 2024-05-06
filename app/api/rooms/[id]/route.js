import connectMongoDB from "@/app/mongodb/mongodb";
import Room from "@/app/model/room";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    const appointment = await Room.findOne({ _id: id });
    return NextResponse.json({ appointment }, { status: 200 });
}
