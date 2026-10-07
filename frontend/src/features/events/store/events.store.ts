
import { create } from "zustand";
import type {
  CreateEvent,
  Event,
  EventListItem,
} from "../types/events.types";
import { api } from "../../../api/axios";

type EventsStore = {
  events: EventListItem[];
  eventsDate: string | null;
  event: Event | null;
  eventCounts: Record<string, number>;
  dayCount: number;

  loading: boolean;
  eventsLoading: boolean;

  getEvents: (date: string, signal?: AbortSignal) => Promise<void>;
  addEvent: (event: CreateEvent) => Promise<void>;
  getEvent: (id: Event["id"], signal?: AbortSignal) => Promise<void>;
  updateEvent: (
    id: Event["id"],
    data: Partial<Event>,
    onSuccess: () => void,
  ) => Promise<void>;
  deleteEvent: (id: Event["id"], onClose: () => void) => Promise<void>;
  getEventCounts: (month: string, signal?: AbortSignal) => Promise<void>;
  getDayCount: (signal?: AbortSignal) => Promise<void>;
};

export const useEvents = create<EventsStore>((set) => ({
  events: [],
  eventsDate: null,
  event: null,
  eventCounts: {},
  dayCount: 0,

  loading: false,
  eventsLoading: false,

getEvents: async (date) => {
  set({
    eventsDate: date,
    eventsLoading: true,
    events: [],
  });

  try {
    const { data } = await api(`/events?date=${date}`);

    set({
      events: data,
    });
  } catch (error) {
    console.error("Failed to get events:", error);
    throw error;
  } finally {
    set({
      eventsLoading: false,
    });
  }
},
  getEventCounts: async (month, signal) => {
    try {
      const { data } = await api(`/events/month?month=${month}`, {
        signal,
      });

      set({
        eventCounts: data,
      });
    } catch (error) {
      if (!signal?.aborted) {
        console.error("Failed to get event counts:", error);
      }

      throw error;
    }
  },

  // Get total number of days that contain events
  getDayCount: async (signal) => {
    try {
      const { data } = await api.get("/events/day-count", {
        signal,
      });

      set({
        dayCount: data.count,
      });
    } catch (error) {
      if (!signal?.aborted) {
        console.error("Failed to get event day count:", error);
      }

      throw error;
    }
  },

  // Get one event
  getEvent: async (id, signal) => {
    set({
      loading: true,
    });

    try {
      const { data } = await api(`/events/${id}`, {
        signal,
      });

      set({
        event: data,
      });
    } catch (error) {
      if (!signal?.aborted) {
        console.error("Failed to get event:", error);
      }

      throw error;
    } finally {
      set({
        loading: false,
      });
    }
  },

  // Create event
  addEvent: async (newEvent) => {
    set({
      loading: true,
    });

    try {
      const { data: createdEvent } = await api.post<Event>(
        "/events",
        newEvent,
      );

      const eventDate = createdEvent.date.slice(0, 10);

      // Reload events for the current day.
      // This keeps EventListItem data consistent with the API.
      if (useEvents.getState().eventsDate === eventDate) {
        await useEvents.getState().getEvents(eventDate);
      }

      // Reload calendar counters.
      await Promise.all([
        useEvents
          .getState()
          .getEventCounts(eventDate.slice(0, 7)),

        useEvents.getState().getDayCount(),
      ]);
    } catch (error) {
      console.error("Failed to add event:", error);
      throw error;
    } finally {
      set({
        loading: false,
      });
    }
  },

  // Update event
  updateEvent: async (id, data, onSuccess) => {
    set({
      loading: true,
    });

    try {
      const { data: updatedEvent } = await api.patch<Event>(
        `/events/${id}`,
        data,
      );

      set((state) => ({
        events: state.events.map((event) =>
          event.id === id ? updatedEvent : event,
        ),
        event: updatedEvent,
      }));

      // If the date changed, reload calendar counters.
      if ("date" in data) {
        const month = updatedEvent.date.slice(0, 7);

        await useEvents.getState().getEventCounts(month);
        await useEvents.getState().getDayCount();
      }

      onSuccess();
    } catch (error) {
      console.error("Failed to update event:", error);
      throw error;
    } finally {
      set({
        loading: false,
      });
    }
  },

  // Delete event
  deleteEvent: async (id, onClose) => {
    set({
      loading: true,
    });

    try {
      const deletedEvent = useEvents.getState().event;

      await api.delete(`/events/${id}`);

      set((state) => ({
        events: state.events.filter((event) => event.id !== id),
        event: null,
      }));

      // Reload calendar counters after deletion.
      if (deletedEvent) {
        const month = deletedEvent.date.slice(0, 7);

        await useEvents.getState().getEventCounts(month);
        await useEvents.getState().getDayCount();
      }

      onClose();
    } catch (error) {
      console.error("Failed to delete event:", error);
      throw error;
    } finally {
      set({
        loading: false,
      });
    }
  },
}));

