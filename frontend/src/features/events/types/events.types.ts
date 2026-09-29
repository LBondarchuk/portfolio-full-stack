export type EventPriority = "low" | "medium" | "high";

export type Event = {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  location?: string;
  description?: string;
  attendees?: number;
  priority?: EventPriority;
};


export type  CreateEvent = Omit<Event,"id">

export type EventListItem = Pick<
  Event,
  "id" | "title" | "startTime" | "endTime" | "priority" |"location"
>;