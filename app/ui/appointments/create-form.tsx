'use client';

import { RoomField } from '@/app/lib/definitions';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { State, createAppointment } from '@/app/lib/actions';
import { redirect, useRouter } from 'next/navigation';
import { useState } from 'react';
import { revalidatePath } from 'next/cache';

export default function CreateAppointmentForm({ 
  rooms,
}: {
  rooms: RoomField[];
}) {
  const router = useRouter();
  const initialState: State = { message: null, errors: {} };
  const [state, setState] = useState(initialState);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const result = await createAppointment(state, formData);

    if (!result.errors) {
      revalidatePath('/dashboard/invoices');
      redirect('/dashboard/invoices');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Appointment Subject */}
        <div className="mb-4">
          <label htmlFor="subject" className="mb-2 block text-sm font-medium">
            Set the subject
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="subject"
                name="subject"
                type="string"
                placeholder="Enter the subject"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Appointment Organizer */}
        <div className="mb-4">
          <label htmlFor="organizer" className="mb-2 block text-sm font-medium">
            Set the organizer
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="organizer"
                name="organizer"
                type="string"
                placeholder="Enter the organizer"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Room Name */}
        <div className="mb-4">
          <label htmlFor="room" className="mb-2 block text-sm font-medium">
            Choose a room
          </label>
          <div className="relative">
            <select
              id="room"
              name="room_id"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="room-error"
            >
              <option value="" disabled>
                Select a room
              </option>
              {rooms.map((room) => (
                <option key={room._id} value={room._id}>
                  {room.name}
                </option>
              ))}
            </select>
          </div>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.room_id &&
              state.errors.room_id.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
            ))}
          </div>
        </div>

        {/* Appointment Date */}
        <div className="mb-4">
          <label htmlFor="date" className="mb-2 block text-sm font-medium">
            Set the date
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="date"
                name="date"
                type="string"
                placeholder="Enter the date"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Appointment Start */}
        <div className="mb-4">
          <label htmlFor="start" className="mb-2 block text-sm font-medium">
            Set the start time
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="start"
                name="start"
                type="string"
                placeholder="Enter the start time"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Appointment End */}
        <div className="mb-4">
          <label htmlFor="end" className="mb-2 block text-sm font-medium">
            Set the end time
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="end"
                name="end"
                type="string"
                placeholder="Enter the end time"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Appointment Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the appointment status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="True"
                  name="open"
                  type="radio"
                  value="True"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="True"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-sm font-medium text-white"
                >
                  Open
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="False"
                  name="closed"
                  type="radio"
                  value="False"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="False"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-red-500 px-3 py-1.5 text-sm font-medium text-white"
                >
                  Closed 
                </label>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/appointments"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Appointment</Button>
      </div>
    </form>
  );
}
