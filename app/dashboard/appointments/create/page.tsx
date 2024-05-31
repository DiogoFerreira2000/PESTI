'use client';

import Form from '@/app/ui/appointments/create-form';
import Breadcrumbs from '@/app/ui/appointments/breadcrumbs';
import { fetchRooms } from '@/app/lib/data';
 
export default async function Page() {
  const rooms = await fetchRooms();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Appointments', href: '/dashboard/appointments' },
          {
            label: 'Create Appointments',
            href: '/dashboard/appointments/create',
            active: true,
          },
        ]}
      />
      <Form rooms={rooms} />
    </main>
  );
}