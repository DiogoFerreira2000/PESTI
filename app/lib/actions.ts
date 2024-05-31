'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { transformTimeToDate } from './utils';
 
const FormSchema = z.object({
  _id: z.string(),
  subject: z.string()
    .min(5, { message: 'Subject must be at least 5 characters long.' })
    .max(30, { message: 'Subject must be at most 30 characters long.' }),
  organizer: z.string(),
  room_id: z.string({
    invalid_type_error: 'Please select a room.',
  }),
  date: z.coerce.date().refine((date) => date > new Date(), {
    message: 'Invalid date.'
  }),
  start: z.string().regex(/^\d{2}:\d{2}$/, {
    message: 'Start time must be in hh:mm format.',
  }),
  end: z.string().regex(/^\d{2}:\d{2}$/, {
    message: 'End time must be in hh:mm format.',
  }),
  open: z.enum(['True', 'False'], {
    invalid_type_error: 'Please select an appointment status.',
  })
});

const RefinedSchema = FormSchema.omit({ _id: true }).refine((data) => {
  const [startHours, startMinutes] = data.start.split(':').map(Number);
  const [endHours, endMinutes] = data.end.split(':').map(Number);
  const startTime = new Date(data.date).setHours(startHours, startMinutes);
  const endTime = new Date(data.date).setHours(endHours, endMinutes);
  return endTime > startTime;
}, {
  message: 'End time must be greater than start time.',
  path: ['end'],
});

export type State = {
  message: string | null;
  errors?: {
    subject?: string[],
    organizer?: string[],
    room_id?: string[],
    date?: string[],
    start?: string[],
    end?: string[],
    open?: string[],
  };
};

export async function createAppointment(prevState: State, formData: FormData) {
  const validatedFields = RefinedSchema.safeParse({
    subject: formData.get('subject'),
    organizer: formData.get('organizer'),
    room_id: formData.get('room_id'),
    date: formData.get('date'),
    start: formData.get('start'),
    end: formData.get('end'),
    open: formData.get('open'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Appointment.',
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
  
  try {
    await saveAppointment(appointment);
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
  } catch (error: any) {
    return {
      errors: { general: [error.message] },
      message: 'Failed to create appointment due to server error.',
    };
  }
}


export async function updateAppointment(prevState: State, formData: FormData, _id : string) {
  const validatedFields = RefinedSchema.safeParse({
    subject: formData.get('subject'),
    organizer: formData.get('organizer'),
    room_id: formData.get('room_id'),
    date: formData.get('date'),
    start: formData.get('start'),
    end: formData.get('end'),
    open: formData.get('open'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Failed to update the appointment.',
    };
  }

  const { subject, organizer, room_id, date, start, end, open } = validatedFields.data;
  
  let transformedDate, transformedStart, transformedEnd;

  try {
    transformedDate = new Date(date).toISOString();
    transformedStart = transformTimeToDate(start, date);
    transformedEnd = transformTimeToDate(end, date);
  } catch (error) {
    return {
      errors: { general: ['Invalid date or time format.'] },
      message: 'Failed to update appointment due to invalid date or time format.',
    };
  }

  const updatedAppointment = {
    _id,
    subject,
    organizer,
    room_id,
    date: transformedDate,
    start: transformedStart,
    end: transformedEnd,
    open,
  };

  const saveAppointment = async (appointmentData: {
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
      throw new Error('Failed to save appointment');
    }

    return response.json();
  };
  
  try {
    await saveAppointment(updatedAppointment);
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
  } catch (error) {
    return {
      errors: { general: [error] },
      message: 'Failed to update appointment due to server error.',
    };
  }
}
