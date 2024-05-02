export type Room = {
  name: string;
  alias: string;
  email: string;
  appointments: Appointment[];
  busy?: boolean;
};

export type Appointment = {
  subject: string;
  organizer: string;
  start: string;
  end: string;
  private: 'true' | 'false';
};

export type AppointmentsTable = {
  room: string;
  subject: string;
  organizer: string;
  date: string;
  start: string;
  end: string;
  private: 'true' | 'false';
}

export type AppointmentForm = {
  room: string;
  subject: string;
  date: string;
  start: string;
  end: string;
  private: 'true' | 'false';
};

export type RoomField = {
  name: string;
  alias: string;
}

export type RoomsTableType = {
  name: string;
  alias: string;
  email: string;
  total_appointments: number;
  busy?: boolean;
}
