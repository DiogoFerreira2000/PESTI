'use server';

import { z } from 'zod';
import { transformTimeToDate } from './utils';
 
const AppointmentSchema = z.object({
  _id: z.string().optional(),
  subject: z.string()
    .min(5, { message: 'Subject must be at least 5 characters long.' })
    .max(30, { message: 'Subject must be at most 30 characters long.' }),
  organizer: z.string()
    .min(1, { message: 'Please insert an organizer.'}),
  room_id: z.string({
    required_error: 'Please select a room.',
  }),
  date: z.coerce.date(),
  start: z.string().regex(/^\d{2}:\d{2}$/, {
    message: 'Please insert a start time.',
  }),
  end: z.string().regex(/^\d{2}:\d{2}$/, {
    message: 'Please insert an end time.',
  }),
  open: z.enum(['True', 'False'], {
    required_error: 'Please select an appointment status.',
  })
}).superRefine((data, ctx) => {
  const [startHours, startMinutes] = data.start.split(':').map(Number);
  const [endHours, endMinutes] = data.end.split(':').map(Number);
  const startTime = new Date(data.date).setHours(startHours, startMinutes);
  const endTime = new Date(data.date).setHours(endHours, endMinutes);
  const currentTime = new Date();

  if (data.date.toDateString() === currentTime.toDateString()) {
    if (startTime <= currentTime.getTime()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Start time must be greater than the current time.',
        path: ['start'],
      });
    }
  }

  if (endTime <= startTime) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'End time must be greater than start time.',
      path: ['end'],
    });
  }
});

export type State = {
  errors?: {
    _id?: string[] | undefined,
    subject?: string[] | undefined,
    organizer?: string[] | undefined,
    room_id?: string[] | undefined,
    date?: string[] | undefined,
    start?: string[] | undefined,
    end?: string[] | undefined,
    open?: string[] | undefined,
  };
  message?: string | null;
};


export const createAppointment = async (prevState: State, formData: FormData) => {
  const validatedFields = AppointmentSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Appointment.',
      success: false,
    };
  }

  const { subject, organizer, room_id, date, start, end, open } = validatedFields.data;
  
  const transformedDate = date.toISOString();
  const transformedStart = transformTimeToDate(start, date);
  const transformedEnd = transformTimeToDate(end, date);

  const appointment = {
    subject,
    organizer,
    date: transformedDate,
    start: transformedStart,
    end: transformedEnd,
    open,
    room_id,
  };
  
  try {
    const saveAppointment = async (appointmentData: {
      subject: string; 
      organizer: string; 
      date: string; 
      start: string; 
      end: string; 
      open: "True" | "False"; 
      room_id: string; 
    }) => {
      const response = await fetch(`http://localhost:3000/api/appointments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to save appointment');
      }
  
      return response.json();
    };

    await saveAppointment(appointment);
    return { success: true, errors: {}, message: null };
    
  } catch (error) {
    console.error('Error creating appointment:', error);
    return { message: "Failed to create appointment.", success: false, errors: {} };
  }
};


export async function updateAppointment(_id : string, prevState: State, formData: FormData) {
  const validatedFields = AppointmentSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Appointment.',
      success: false,
    };
  }

  const { subject, organizer, room_id, date, start, end, open } = validatedFields.data;
  
  const transformedDate = new Date(date).toISOString();
  const transformedStart = transformTimeToDate(start, date);
  const transformedEnd = transformTimeToDate(end, date);

  const updatedAppointment = {
    _id,
    subject,
    organizer,
    date: transformedDate,
    start: transformedStart,
    end: transformedEnd,
    open,
    room_id,
  };

  try {
    const editAppointment = async (appointmentData: {
      _id: string;
      subject: string;
      organizer: string;
      date: string; 
      start: string; 
      end: string; 
      open: "True" | "False"; 
      room_id: string; 
    }) => {
      const response = await fetch(`http://localhost:3000/api/appointments/${appointmentData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update appointment');
      }
  
      return response.json();
    };

    await editAppointment(updatedAppointment);
    return { success: true, errors: {}, message: null };
    
  } catch (error) {
    console.error('Error creating appointment:', error);
    return { message: "Failed to create appointment.", success: false, errors: {} };
  }
}
