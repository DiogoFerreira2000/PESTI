export type Room = {
  _id: string;
  name: string;
  roomAlias: string;
  email: string;
  busy: boolean;
};

export type Appointment = {
  _id: string;
  subject: string;
  organizer: string;
  date: string;
  start: string;
  end: string;
  open: 'True' | 'False';
  room_id: string;
};

export type AppointmentsTableType = {
  subject: string;
  organizer: string;
  roomName: string;
  date: string;
  start: string;
  end: string;
  open: 'True' | 'False';
}

export type RoomField = {
  _id: string;
  name: string;
}

export type RoomsTableType = {
  name: string;
  roomAlias: string;
  email: string;
  total_appointments: number;
  busy: boolean;
}
