import Form from '@/app/ui/appointments/update-form';
import Breadcrumbs from '@/app/ui/appointments/breadcrumbs';
import { fetchAppointmentById, fetchRooms } from '@/app/lib/data';
import { notFound } from 'next/navigation';
 
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [appointment, rooms] = await Promise.all([
        fetchAppointmentById(id),
        fetchRooms(),
    ]);

    if (!appointment) {
        notFound();
    }

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Appointments', href: '/dashboard/appointments' },
                    {
                        label: 'Edit Appointment',
                        href: `/dashboard/appointments/${id}/edit`,
                        active: true,
                    },
                ]}
            />
            <Form initialAppointment={appointment} rooms={rooms} />
        </main>
    );
}