import { create } from "zustand";
import type { CreateEvent, Event, EventListItem } from "../types/events.types";
import { api } from "../../../api/axios";



type EventsStore = {
  events: EventListItem[];
  event: Event | null;
  eventCounts: Record<string, number>;
  dayCount: number;
  loading: boolean;

  getEvents: (date: string) => Promise<void>;
  addEvent: (event: CreateEvent) => Promise<void>;
  getEvent: (id: string) => Promise<void>;
  updateEvent: (
    id: string,
    data: Partial<Event>,
    onSuccess: () => void,
  ) => Promise<void>;
  deleteEvent: (id: string, onClose: () => void) => Promise<void>;
  getEventCounts: (month: string) => Promise<void>;
  getDayCount: () => Promise<void>;
};

export const useEvents = create<EventsStore>((set) => ({
  events: [],
  eventCounts: {},
  dayCount: 0,
  event: null,
  loading: false,

  getEventCounts: async (month) => {
    set({ loading: true });

    try {
      const { data: eventCounts } = await api(`/events/month?month=${month}`);

      set({ eventCounts });
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  getDayCount: async () => {
    set({ loading: true });

    try {
      const { data } = await api.get("/events/day-count");

      set({ dayCount: data.count });
    } catch (error) {
      console.error("Failed to get event day count:", error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  getEvents: async (date) => {
    set({ loading: true });

    try {
      const { data: events } = await api(`/events?date=${date}`);

      set({ events });
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  addEvent: async (event) => {
    set({ loading: true });

    try {
      const { data } = await api.post("/events", event);

      set((state) => ({
        events: [...state.events, data],
      }));
      await useEvents.getState().getDayCount();
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  getEvent: async (id) => {
    set({ loading: true });

    try {
      const { data: event } = await api(`/events/${id}`);

      set({ event });
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  updateEvent: async (id, data, onSuccess) => {
    set({ loading: true });

    try {
      const { data: updatedEvent } = await api.patch(`/events/${id}`, data);

      set((state) => ({
        events: state.events.map((event) =>
          event.id === id ? updatedEvent : event,
        ),
        event: updatedEvent,
      }));

      if ("date" in data) {
        await useEvents.getState().getDayCount();
      }

      onSuccess();
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  deleteEvent: async (id, onClose) => {
    set({ loading: true });

    try {
      await api.delete(`/events/${id}`);

      set((state) => ({
        events: state.events.filter((event) => event.id !== id),
        event: null,
      }));

      await useEvents.getState().getDayCount();

      onClose();
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
}));
