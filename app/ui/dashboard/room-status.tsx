import clsx from 'clsx';

export default function RoomStatus({ busy }: { busy: boolean }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-sm',
        busy ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
      )}
    >
      {busy ? 'Yes' : 'No'}
    </span>
  );
}
