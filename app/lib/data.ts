import {
  Room,
  Appointment,
  AppointmentsTable,
  RoomField,
  RoomsTableType,
} from './definitions';
import { unstable_noStore as noStore } from 'next/cache';

export const revalidationTime = 5;

export async function fetchAllAppointments(): Promise<AppointmentsTable[]> {
  noStore();

  try {
    const res = await fetch('https://rooms.aad-bonfim.devscope.net/api/rooms', { next: { revalidate: revalidationTime } });
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const rooms: Room[] = await res.json();
    let allAppointments: AppointmentsTable[] = [];

    rooms.forEach((room: Room) => {
      const roomAppointments = room.appointments.map((appointment: Appointment): AppointmentsTable => {
        // Convert timestamps into JavaScript Date objects
        const startDate = new Date(appointment.start);
        const endDate = new Date(appointment.end);

        // Extract and format the date part
        const date = startDate.toISOString().split('T')[0]; // Will format as "yyyy-mm-dd"

        // Extract and format the time parts
        const startTime = startDate.toISOString().split('T')[1].slice(0, 5); // Will format as "hh:mm"
        const endTime = endDate.toISOString().split('T')[1].slice(0, 5); // Will format as "hh:mm"

        return {
          room: room.name,
          subject: appointment.subject,
          organizer: appointment.organizer,
          date,
          start: startTime,
          end: endTime,
          private: appointment.private
        };
      });

      allAppointments = allAppointments.concat(roomAppointments);
    });

    return allAppointments;

  } catch (error) {
    console.error("Failed to fetch all appointments: ", error);
    throw error;
  }
}


export async function fetchRooms(): Promise<RoomField[]> {
  noStore();

  try {
    const res = await fetch('https://rooms.aad-bonfim.devscope.net/api/rooms');
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const rooms = await res.json();

    const allRooms: RoomField[] = rooms.map((room: Room): RoomField => {
      return {
        name: room.name,
        alias: room.alias
      };
    });

    return allRooms;

  } catch (error) {
    console.error("Failed to fetch all rooms: ", error);
    throw error;
  }
}


export async function fetchFilteredRooms(query: string): Promise<RoomsTableType[]> {
  noStore();

  try {
    const res = await fetch('https://rooms.aad-bonfim.devscope.net/api/rooms', { next: { revalidate: revalidationTime } });
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const rooms: Room[] = await res.json();

    let filteredRooms: RoomsTableType[] = rooms
      .filter((room) => room.name.includes(query) || room.alias.includes(query))
      .map((room): RoomsTableType => {
        return {
          name: room.name,
          alias: room.alias,
          email: room.email,
          total_appointments: room.appointments.length,
          busy: room.busy,
        };
      });

    return filteredRooms;

  } catch (error) {
    console.error("Failed to fetch room table: ", error);
    throw error;
  }
}
