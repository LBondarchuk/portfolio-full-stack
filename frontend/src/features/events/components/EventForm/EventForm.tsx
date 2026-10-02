import { useState } from "react";
import FormField from "../../../../components/form/FormField/FormField";
import Input from "../../../../components/form/Input/Input";
import Select from "../../../../components/form/Select/Select";
import SelectItem from "../../../../components/form/Select/SelectItem";
import Button from "../../../../components/buttons/Button/Button";
import TimePicker from "../../../../components/form/TimePicker/TimePicker";
import DatePicker from "../../../../components/form/DatePicker/DatePicker";
import type { CreateEvent, EventPriority } from "../../types/events.types";
import { useEvents } from "../../store/events.store";
import { useSearchParams } from "react-router";
import { formatDateParam, parseDateParam } from "../../utils/date";
import Loader from "../../../../components/Loader/Loader";
import { minutesToTime, timeToMinutes } from "../../utils/timeline";
import { toast } from "react-toastify";

type Props = {
  onClose: () => void;
  defaultValue?: CreateEvent;
};

const priorities: EventPriority[] = ["low", "medium", "high"];

const getToday = () => {
  return formatDateParam(new Date());
};

const EventForm = ({ onClose, defaultValue }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

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
  const [isPriorityOpen, setIsPriorityOpen] = useState(false);

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

const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
  e.preventDefault();

  try {
    if (!isEditMode) {
      await addEvent(form);

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

    await updateEvent(id, form, handleOnSuccess);

    toast.success("Event updated successfully");
  } catch {
    toast.error(
      isEditMode
        ? "Failed to update event"
        : "Failed to create event",
    );
  }
};

  return (
    <form className="grid gap-6" onSubmit={handleSubmit}>
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-text">
          {isEditMode ? "Edit event" : "Create event"}
        </h2>

        <p className="mt-1 text-sm text-text-secondary">
          {isEditMode
            ? "Update the event details."
            : "Add a new event to your calendar."}
        </p>
      </div>

      <div className="grid gap-4">
        <FormField name="title" title="Title">
          <Input
            id="title"
            name="title"
            type="text"
            placeholder="e.g. Team meeting"
            value={form.title}
            onChange={(e) => setValue("title", e.target.value)}
            required
          />
        </FormField>

        {isEditMode && (
          <FormField name="date" title="Date">
            <DatePicker
              value={parseDateParam(form.date)}
              onChange={(date) => {
                setValue("date", formatDateParam(date));
              }}
            />
          </FormField>
        )}

        <div className="grid grid-cols-2 gap-4">
          <FormField name="startTime" title="Start time">
            <TimePicker
              value={form.startTime}
              onChange={(value) => {
                setForm((prev) => {
                  const start = timeToMinutes(value);
                  const end = timeToMinutes(prev.endTime);

                  return {
                    ...prev,
                    startTime: value,
                    endTime:
                      end <= start ? minutesToTime(start + 30) : prev.endTime,
                  };
                });
              }}
            />
          </FormField>

          <FormField name="endTime" title="End time">
            <TimePicker
              value={form.endTime}
              onChange={(value) => {
                if (timeToMinutes(value) <= timeToMinutes(form.startTime)) {
                  return;
                }

                setValue("endTime", value);
              }}
            />
          </FormField>
        </div>

        <FormField name="location" title="Location">
          <Input
            id="location"
            name="location"
            type="text"
            placeholder="e.g. Office, Gym..."
            value={form.location ?? ""}
            onChange={(e) => setValue("location", e.target.value)}
          />
        </FormField>

        <FormField name="attendees" title="Attendees">
          <Input
            id="attendees"
            name="attendees"
            type="number"
            min={0}
            placeholder="0"
            value={form.attendees ?? ""}
            onChange={(e) =>
              setValue(
                "attendees",
                e.target.value === "" ? undefined : Number(e.target.value),
              )
            }
          />
        </FormField>

        <FormField name="priority" title="Priority">
          <Select
            value={form.priority}
            isOpen={isPriorityOpen}
            onOpen={() => setIsPriorityOpen(true)}
            onClose={() => setIsPriorityOpen(false)}
          >
            {priorities.map((item) => (
              <SelectItem
                key={item}
                isSelected={form.priority === item}
                onClick={() => {
                  setValue("priority", item);
                  setIsPriorityOpen(false);
                }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`size-2.5 rounded-full ${
                      item === "low"
                        ? "bg-success"
                        : item === "medium"
                          ? "bg-primary"
                          : "bg-danger"
                    }`}
                  />

                  <span className="capitalize">{item}</span>
                </div>
              </SelectItem>
            ))}
          </Select>
        </FormField>

        <FormField name="description" title="Description">
          <textarea
            id="description"
            name="description"
            rows={4}
            placeholder="Add some details..."
            value={form.description ?? ""}
            onChange={(e) => setValue("description", e.target.value)}
            className="
              w-full
              resize-none
              rounded-md
              border
              border-border
              bg-surface
              px-3
              py-2
              text-sm
              text-text
              outline-none
              transition-colors
              duration-200
              placeholder:text-text-muted
              focus:border-primary
            "
          />
        </FormField>
      </div>

      <div className="flex items-center justify-end gap-2 border-t border-border pt-4">
        <Button type="button" variant="ghost" onClick={onClose}>
          Cancel
        </Button>

        <Button type="submit">
          {loading ? <Loader /> : isEditMode ? "Save changes" : "Create event"}
        </Button>
      </div>
    </form>
  );
};

export default EventForm;
