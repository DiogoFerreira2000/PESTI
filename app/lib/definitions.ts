export type Room = {
  _id: string;
  name: string;
  roomAlias: string;
  email: string;
  busy: boolean;
};

export type Appointment = {
  _id: string;
  room_id: string;
  subject: string;
  organizer: string;
  start: string;
  end: string;
  open: 'true' | 'false';
};

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
