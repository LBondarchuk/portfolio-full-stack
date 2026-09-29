import { create } from "zustand";
import type { CreateEvent,  EventListItem } from "../types/events.types";

type EventsStore = {
  events: EventListItem[];
  addEvent: (event: CreateEvent) => void;
  updateEvent: (id: string, data: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
};

export const useEvents = create<EventsStore>((set) => ({
  events: [],

  addEvent: (event) => {
    const eventTo = { ...event, id: "" + new Date() };
    set((state) => ({
      events: [...state.events, eventTo],
    }));
  },

  updateEvent: (id, data) =>
    set((state) => ({
      events: state.events.map((event) =>
        event.id === id ? { ...event, ...data } : event,
      ),
    })),

  deleteEvent: (id) =>
    set((state) => ({
      events: state.events.filter((event) => event.id !== id),
    })),
}));
