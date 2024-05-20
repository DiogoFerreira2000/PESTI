'use client';

import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function CreateAppointment() {
  return (
    <Link
      href="/dashboard/appointments/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Appointment</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateAppointment({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/appointments/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteAppointment({ id }: { id: string }) {
  const router = useRouter();
  const removeAppointment = async () => {
    const confirmed = confirm("Are you sure?");
 
    if (confirmed) {
      console.log(`Deleting appointment with id: ${id}`);
      const res = await fetch(`http://localhost:3000/api/appointments?_id=${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      console.log(`Response:`, data);
 
      if (res.ok) {
        console.log(`Appointment deleted successfully`);
        router.refresh();
      } else {
        console.log(`Failed to delete appointment`);
      }
    }
  };
 
  return (
    <button onClick={removeAppointment} className="btn btn-error ml-2">
      Delete
    </button>
  );
}
