import { useState } from "react";
import { useSearchParams } from "react-router";
import { toast } from "react-toastify";
import type { CreateEvent } from "../../types/events.types";
import { useEvents } from "../../store/events.store";
import { formatDateParam } from "../../utils/date";
import { minutesToTime, timeToMinutes } from "../../utils/timeline";
import type { EventInputs } from "./EventForm";

type Props = {
  onClose: () => void;
  defaultValue?: CreateEvent;
};

const getToday = () => {
  return formatDateParam(new Date());
};

export const useEventForm = ({ onClose, defaultValue }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isPriorityOpen, setIsPriorityOpen] = useState(false);

  const isEditMode = Boolean(defaultValue);
  const dateParam = searchParams.get("date");

  const initialForm: CreateEvent = defaultValue ?? {
    title: "",
    startTime: "09:00",
    endTime: "10:00",
    date: dateParam || getToday(),
    priority: "medium",
  };

  const [form, setForm] = useState<CreateEvent>(initialForm);

  const addEvent = useEvents((state) => state.addEvent);
  const updateEvent = useEvents((state) => state.updateEvent);
  const loading = useEvents((state) => state.loading);

  const setValue = <K extends keyof CreateEvent>(
    key: K,
    value: CreateEvent[K],
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleDateChange = (date: Date) => {
    setValue("date", formatDateParam(date));
  };

  const handleStartTimeChange = (value: string) => {
    setForm((prev) => {
      const start = timeToMinutes(value);
      const end = timeToMinutes(prev.endTime);

      return {
        ...prev,
        startTime: value,
        endTime: end <= start ? minutesToTime(start + 30) : prev.endTime,
      };
    });
  };

  const handleEndTimeChange = (value: string) => {
    if (timeToMinutes(value) <= timeToMinutes(form.startTime)) {
      return;
    }

    setValue("endTime", value);
  };

  const handleSubmit = async (data:EventInputs) => {
      try {
      if (!isEditMode) {
        await addEvent({...form, ...data});

        toast.success("Event created successfully");
        onClose();

        return;
      }

      const id = searchParams.get("id");

      if (!id) return;

      const handleOnSuccess = () => {
        const oldDate = defaultValue?.date;
        const newDate = form.date;

        if (oldDate !== newDate) {
          setSearchParams((prev) => {
            const next = new URLSearchParams(prev);
            next.set("date", newDate);
            return next;
          });
        }

        onClose();
      };

      await updateEvent(id, {...form, ...data}, handleOnSuccess);

      toast.success("Event updated successfully");
    } catch {
      toast.error(
        isEditMode ? "Failed to update event" : "Failed to create event",
      );
    }
  };

  return {
    form,
    loading,
    isEditMode,
    isPriorityOpen,
    setValue,
    setIsPriorityOpen,
    handleDateChange,
    handleStartTimeChange,
    handleEndTimeChange,
    handleSubmit,
  };
};
