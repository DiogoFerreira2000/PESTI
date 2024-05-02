import { lusitana } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import { RoomsTableType } from '@/app/lib/definitions';

export default async function RoomsTable({
  rooms,
}: {
  rooms: RoomsTableType[];
}) {
  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>
        Rooms
      </h1>
      <Search placeholder="Search rooms..." />
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              <div className="md:hidden">
                {rooms?.map((room) => (
                  <div
                    key={room.alias}
                    className="mb-2 w-full rounded-md bg-white p-4"
                  >
                    <div className="border-b pb-4">
                      <p className="text-lg font-semibold">{room.name}</p> 
                      <p className="text-sm text-gray-500">{room.alias}</p> 
                      <p className="text-sm text-gray-500">{room.email}</p>
                    </div>
                    <div className="flex w-full items-center justify-between py-5">
                      <div className="flex w-1/2 flex-col">
                        <p className="text-xs">Total Appointments</p>
                        <p className="font-medium">{room.total_appointments}</p>
                      </div>
                      <div className="flex w-1/2 flex-col">
                        <p className="text-xs">Busy</p>
                        <p className="font-medium">{room.busy}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Alias
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Email
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Total Appointments
                    </th>
                    <th scope="col" className="px-4 py-5 font-medium">
                      Busy
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {rooms.map((room) => (
                    <tr key={room.alias} className="group">
                      <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                        {room.name}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {room.alias}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {room.email}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {room.total_appointments}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                        {room.busy}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
