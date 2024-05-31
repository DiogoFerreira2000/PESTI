import RoomStatus from '@/app/ui/dashboard/room-status';
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
                    key={room.roomAlias}
                    className="mb-2 w-full rounded-md bg-white p-4"
                  >
                    <div className="border-b pb-4">
                      <p className="text-lg text-gray-500">{room.name}</p> 
                      <p className="text-lg text-gray-500">{room.roomAlias}</p> 
                      <p className="text-lg text-gray-500">{room.email}</p>
                      <p className="text-lg font-gray-500">{room.total_appointments}</p> 
                      <p className="text-lg text-gray-500">{room.busy}</p>
                    </div>
                    <RoomStatus busy={room.busy} />
                  </div>
                ))}
              </div>
              <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                <thead className="rounded-md bg-gray-50 text-left text-lg font-normal">
                  <tr>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Alias
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Email
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Number of Appointments
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Busy
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {rooms.map((room) => (
                    <tr key={room.roomAlias} className="group">
                      <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                        {room.name}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {room.roomAlias}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {room.email}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {room.total_appointments}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        <RoomStatus busy={room.busy} />
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
