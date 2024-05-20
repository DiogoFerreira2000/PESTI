import AppointmentsTable from '@/app/ui/appointments/table';
import Search from '@/app/ui/search';
import Pagination from '@/app/ui/appointments/pagination';
import { CreateAppointment } from '@/app/ui/appointments/buttons';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { fetchAppointmentsPages } from '@/app/lib/data';
import { AppointmentsTableSkeleton } from '@/app/ui/skeletons';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Appointments',
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
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchAppointmentsPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Appointments</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search appointments..." />
        <CreateAppointment />
      </div>
      <Suspense key={query + currentPage} fallback={<AppointmentsTableSkeleton />}>
        <AppointmentsTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}