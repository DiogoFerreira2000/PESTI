import { fetchFilteredRooms } from '@/app/lib/data';
import RoomsTable from '@/app/ui/rooms/table';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rooms',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';

  const rooms = await fetchFilteredRooms(query);

  return (
    <main>
      <RoomsTable rooms={rooms} />
    </main>
  );
}