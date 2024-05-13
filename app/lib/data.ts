import {
  Room,
  Appointment,
  AppointmentsTableType,
  RoomField,
  RoomsTableType
} from './definitions';
import { unstable_noStore as noStore } from 'next/cache';

export const revalidationTime = 5;
const ITEMS_PER_PAGE = 6;

export async function fetchFilteredAppointments(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  noStore();

  try {
    const room_res = await fetch('http://localhost:3000/api/rooms');
    if (!room_res.ok) {
      throw new Error(`HTTP error! Status: ${room_res.status}`);
    }
    const rooms = await room_res.json();

    const appointment_res = await fetch('http://localhost:3000/api/appointments', { next: { revalidate: revalidationTime } });
    if (!appointment_res.ok) {
      throw new Error(`HTTP error! Status: ${appointment_res.status}`);
    }
    const appointments = await appointment_res.json();

    const roomNameMap: Record<string, string> = {};
    rooms.forEach((room: Room) => {
      roomNameMap[room._id] = room.name;
    });

    const filteredAppointments = appointments
      .filter((appointment: Appointment) =>
        appointment.subject.includes(query) || roomNameMap[appointment.room_id].includes(query)
      )
      .map((appointment: Appointment): AppointmentsTableType => {
        const roomName = roomNameMap[appointment.room_id];
        
        const appointmentDate = new Date(appointment.date);
        const appointmentStart = new Date(appointment.start);
        const appointmentEnd = new Date(appointment.end);

        const date = appointmentDate.toISOString().split('T')[0];
        const startTime = appointmentStart.toISOString().split('T')[1].substring(0, 5);
        const endTime = appointmentEnd.toISOString().split('T')[1].substring(0, 5);

        return {
          subject: appointment.subject,
          organizer: appointment.organizer,
          roomName: roomName,
          date: date,
          start: startTime,
          end: endTime,
          open: appointment.open
        }
      });

    return filteredAppointments;

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the appointments table.');
  }
}


export async function fetchRooms() {
  noStore();

  try {
    const res = await fetch('http://localhost:3000/api/rooms');
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const rooms = await res.json();

    const allRooms: RoomField[] = rooms.map((room: Room): RoomField => {
      return {
        _id: room._id,
        name: room.name,
      };
    });

    return allRooms;

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch all rooms.');
  }
}


export async function fetchFilteredRooms(query: string) {
  noStore();

  try {
    const room_res = await fetch('http://localhost:3000/api/rooms');
    if (!room_res.ok) {
      throw new Error(`HTTP error! Status: ${room_res.status}`);
    }
    const rooms = await room_res.json();

    const appointment_res = await fetch('http://localhost:3000/api/appointments', { next: { revalidate: revalidationTime } });
    if (!appointment_res.ok) {
      throw new Error(`HTTP error! Status: ${appointment_res.status}`);
    }
    const appointments = await appointment_res.json();

    const appointmentRoomCounts: Record<string, number> = {};
    appointments.forEach((appointment: Appointment) => {
      const room_id = appointment.room_id;
      appointmentRoomCounts[room_id] = (appointmentRoomCounts[room_id] || 0) + 1;
    });

    const filteredRooms = rooms
    .filter((room: Room) => 
      room.name.includes(query) || room.roomAlias.includes(query) || room.email.includes(query)
    )
    .map((room: Room): RoomsTableType => {
      return {
        name: room.name,
        roomAlias: room.roomAlias,
        email: room.email,
        total_appointments: appointmentRoomCounts[room._id] || 0,
        busy: room.busy
      };
    });

    return filteredRooms;

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the rooms table.');
  }
}
