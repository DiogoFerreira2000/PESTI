'use client';

import { Appointment, RoomField } from '@/app/lib/definitions';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { State, updateAppointment } from '@/app/lib/actions';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const getMinDate = () => {
  const today = new Date();
  const minDate = today.toISOString().split('T')[0];
  return minDate;
};

export default function UpdateAppointmentForm ({
  initialAppointment,
  rooms,
}: {
  initialAppointment: Appointment,
  rooms: RoomField[];
}) {
  
  const initialState: State = {
    errors: {
      subject: [],
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

    if (initialAppointment && initialAppointment._id) {
      formData.append('_id', initialAppointment._id);
      formData.append('organizer', initialAppointment.organizer);

      const submitForm = async () => {
        const res = await updateAppointment(initialAppointment._id, state, formData);
        setResult(res);
      };

      submitForm();
    } else {
      setState(prevState => ({
        ...prevState,
        message: 'Appointment ID is missing.'
      }));
    }
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
                defaultValue={initialAppointment?.subject || ''}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>

        {/* Room Name */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Choose a room
          </label>
          <div className="relative">
            <select
              id="room"
              name="room_id"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={initialAppointment?.room_id || ''}
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
                defaultValue={initialAppointment?.date?.split('T')[0] || ''}
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
                type="time"
                placeholder="Enter the start time"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue={initialAppointment?.start?.split('T')[1]?.substring(0, 5) || ''}
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
                type="time"
                placeholder="Enter the end time"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue={initialAppointment?.end?.split('T')[1]?.substring(0, 5) || ''}
              />
            </div>
          </div>
        </div>

        {/* Appointment Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the Appointment status
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
                  defaultChecked={initialAppointment.open === "True"}
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
                  defaultChecked={initialAppointment.open === "False"}
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
        <Button type="submit">Update</Button>
      </div>
    </form>
  );
}
