import connectMongoDB from "@/app/mongodb/mongodb";
import Room from "@/app/model/room";
import { NextResponse } from "next/server";

export async function GET() {
    await connectMongoDB();
    const rooms = await Room.find();
    return NextResponse.json(rooms);
};
