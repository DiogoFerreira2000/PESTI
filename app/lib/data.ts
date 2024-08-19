import {
  Room,
  Appointment,
  AppointmentsTableType,
  AppointmentForm,
  RoomField,
  RoomsTableType
} from './definitions';
import { unstable_noStore as noStore } from 'next/cache';

const revalidationTime = 5;
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

    appointments.forEach(async (appointment: Appointment) => {
      const id = appointment._id;
      const appointmentEnd = new Date(appointment.end);
      
      const endTime = appointmentEnd.toISOString().split('T')[1].substring(0, 5);
      const [endHours, endMinutes] = endTime.split(':').map(Number);
      const end = new Date(appointment.date).setHours(endHours, endMinutes);

      const currentDateTime = new Date();

      if(end < currentDateTime.getTime()) {
        try {
          const res = await fetch(`http://localhost:3000/api/appointments?_id=${id}`, {
            method: "DELETE",
          });
          if (!res.ok) {
            throw new Error(`Failed to delete appointment with ID: ${id}`);
          }
          console.log(`Appointment with ID: ${id} deleted.`);
        } catch (error) {
          console.error(`Error deleting appointment with ID: ${id}`, error);
        }
      }
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
        _id: appointment._id,
        subject: appointment.subject,
        organizer: appointment.organizer,
        roomName: roomName,
        date: date,
        start: startTime,
        end: endTime,
        open: appointment.open
      }
    });

    const paginatedAppointments = filteredAppointments.slice(offset, offset + ITEMS_PER_PAGE);
    return paginatedAppointments;

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the appointments table.');
  }
}


export async function fetchAppointmentsPages(query: string) {
  noStore();

  try {
    const appointment_res = await fetch('http://localhost:3000/api/appointments', { next: { revalidate: revalidationTime } });
    if (!appointment_res.ok) {
      throw new Error(`HTTP error! Status: ${appointment_res.status}`);
    }
    const appointments = await appointment_res.json();

    const room_res = await fetch('http://localhost:3000/api/rooms');
    if (!room_res.ok) {
      throw new Error(`HTTP error! Status: ${room_res.status}`);
    }
    const rooms = await room_res.json();

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
        _id: appointment._id,
        subject: appointment.subject,
        organizer: appointment.organizer,
        roomName: roomName,
        date: date,
        start: startTime,
        end: endTime,
        open: appointment.open
      }
    });

    const totalPages = Math.ceil(filteredAppointments.length / ITEMS_PER_PAGE);
    return totalPages;

  } catch (error) {
    console.error('Database Error: ', error);
    throw new Error('Failed to fetch the total number of appointments.');
  }
}


export async function fetchAppointmentById(id: string) {
  noStore();

  try {
    const appointment_res = await fetch('http://localhost:3000/api/appointments', { next: { revalidate: revalidationTime } });
    if (!appointment_res.ok) {
      throw new Error(`HTTP error! Status: ${appointment_res.status}`);
    }
    const appointments = await appointment_res.json();

    const filteredAppointment = appointments
    .filter((appointment: Appointment) =>
      appointment._id.includes(id)
    )
    .map((appointment: Appointment): AppointmentForm => {
      return {
        _id: appointment._id,
        subject: appointment.subject,
        date: appointment.date,
        start: appointment.start,
        end: appointment.end,
        room_id: appointment.room_id,
        open: appointment.open,
      }
    });

    return filteredAppointment[0];

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch appointment.');
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

    const roomAvailability: Record<string, boolean> = {};
    rooms.forEach((room: Room) => {
      roomAvailability[room._id] = true;
    });

    appointments.forEach((appointment: Appointment) => {
      const room_id = appointment.room_id;

      const appointmentDate = new Date(appointment.date);
      const appointmentStart = new Date(appointment.start);
      const appointmentEnd = new Date(appointment.end);
      
      const startTime = appointmentStart.toISOString().split('T')[1].substring(0, 5);
      const endTime = appointmentEnd.toISOString().split('T')[1].substring(0, 5);

      const [startHours, startMinutes] = startTime.split(':').map(Number);
      const [endHours, endMinutes] = endTime.split(':').map(Number);

      const start = new Date(appointment.date).setHours(startHours, startMinutes);
      const end = new Date(appointment.date).setHours(endHours, endMinutes);

      const currentDateTime = new Date();

      if(appointmentDate.toDateString() === currentDateTime.toDateString()) {
        if(start <= currentDateTime.getTime() && end > currentDateTime.getTime()) {
          roomAvailability[room_id] = false;
        }
      }
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
        busy: roomAvailability[room._id],
      };
    });

    return filteredRooms;

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the rooms table.');
  }
}
