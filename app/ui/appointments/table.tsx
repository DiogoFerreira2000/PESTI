import AppointmentStatus from '@/app/ui/appointments/status';
import { AppointmentsTableType } from '@/app/lib/definitions';

export default async function AppointmentsTable({
  appointments
}: {
  appointments: AppointmentsTableType[]
}) {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {appointments?.map((appointment) => (
              <div
                key={appointment.subject}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="text-lg text-gray-500">{appointment.subject}</p> 
                    <p className="text-lg text-gray-500">{appointment.organizer}</p> 
                    <p className="text-lg text-gray-500">{appointment.roomName}</p>
                    <p className="text-lg font-gray-500">{appointment.date}</p> 
                    <p className="text-lg text-gray-500">{appointment.start}</p>
                    <p className="text-lg text-gray-500">{appointment.end}</p>
                  </div>
                  <AppointmentStatus status={appointment.open} />
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Subject
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Organizer
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Room
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Start
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  End
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Private
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {appointments?.map((appointment) => (
                <tr
                  key={appointment.subject}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    {appointment.subject}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {appointment.organizer}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {appointment.roomName}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {appointment.date}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {appointment.start}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {appointment.end}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <AppointmentStatus status={appointment.open} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
