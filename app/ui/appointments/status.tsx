import clsx from 'clsx';

export default function AppointmentStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-sm',
        {
          'bg-green-500 text-white': status === 'True',
          'bg-red-500 text-white': status === 'False',
        },
      )}
    >
      {status === 'True' ? (
        <>
          No
        </>
      ) : null}
      {status === 'False' ? (
        <>
          Yes
        </>
      ) : null}
    </span>
  );
}
