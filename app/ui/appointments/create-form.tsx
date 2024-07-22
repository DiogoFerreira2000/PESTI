'use client';

import { RoomField } from '@/app/lib/definitions';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { createAppointment, State } from '@/app/lib/actions';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const getMinDate = () => {
  const today = new Date();
  const minDate = today.toISOString().split('T')[0];
  return minDate;
};

export default function CreateAppointmentForm({ 
  rooms,
}: {
  rooms: RoomField[];
}) {
  const initialState: State = {
    errors: {
      subject: [],
      organizer: [],
      room_id: [],
      date: [],
      start: [],
      end: [],
      open: [],
    },
    message: ''
  };

  const [state, setState] = useState<State>(initialState);
  const [result, setResult] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    if (result?.success) {
      router.push('/dashboard/appointments');
    } else if (result) {
      setState(prevState => ({
        ...prevState,
        errors: result.errors,
        message: result.message
      }));
    }
  }, [result, router]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    const submitForm = async () => {
      const res = await createAppointment(state, formData);
      setResult(res);
    };

    submitForm();
  };

  const minDate = getMinDate();

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
              />
              {state.errors?.subject && state.errors.subject.length > 0 && (
                <span className="text-red-500">{state.errors.subject[0]}</span>
              )}
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
              />
              {state.errors?.organizer && state.errors.organizer.length > 0 && (
                <span className="text-red-500">{state.errors.organizer[0]}</span>
              )}
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
            {state.errors?.room_id && state.errors.room_id.length > 0 && (
              <span className="text-red-500">{state.errors.room_id[0]}</span>
            )}
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
                type="date"
                placeholder="Enter the date"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                min={minDate}
              />
              {state.errors?.date && state.errors.date.length > 0 && (
                <span className="text-red-500">{state.errors.date[0]}</span>
              )}
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
                type="time"
                placeholder="Enter the start time"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              {state.errors?.start && state.errors.start.length > 0 && (
                <span className="text-red-500">{state.errors.start[0]}</span>
              )}
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
                type="time"
                placeholder="Enter the end time"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              {state.errors?.end && state.errors.end.length > 0 && (
                <span className="text-red-500">{state.errors.end[0]}</span>
              )}
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
                  name="open"
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
            {state.errors?.open && state.errors.open.length > 0 && (
              <span className="text-red-500">{state.errors.open[0]}</span>
            )}
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
        <Button type="submit">Create</Button>
      </div>
    </form>
  );
}
