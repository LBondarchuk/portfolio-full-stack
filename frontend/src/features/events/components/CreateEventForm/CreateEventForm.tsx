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

type Props = {
  onClose: () => void;
};

const defaultForm: CreateEvent = {
  title: "",
  startTime: "08:00",
  endTime: "22:00",
  date: new Date().toISOString(),
  priority: "medium",
};
const colors: EventPriority[] = ["low", "medium", "high"];

const CreateEventForm = ({ onClose }: Props) => {
  const addEvent = useEvents((state) => state.addEvent);
  const [isColorOpen, setIsColorOpen] = useState(false);
  const [form, setForm] = useState<CreateEvent>(defaultForm);

  const handleCreate = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
      addEvent(form);
      setForm(defaultForm)
    onClose();
  };

  return (
    <form className="grid gap-6" onSubmit={handleCreate}>
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-text">
          Create event
        </h2>

        <p className="mt-1 text-sm text-text-secondary">
          Add a new event to your calendar.
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
            onChange={(e) =>
              setForm((prev) => ({ ...prev, title: e.target.value }))
            }
          />
        </FormField>

        <FormField name="date" title="Date">
          <DatePicker
            value={new Date(form.date)}
            onChange={(date) =>
              setForm((prev) => ({ ...prev, date: date.toISOString() }))
            }
          />
        </FormField>

        <div className="grid grid-cols-2 gap-4">
          <FormField name="startTime" title="Start time">
            <TimePicker
              value={form.startTime}
              onChange={(startTime) =>
                setForm((prev) => ({ ...prev, startTime }))
              }
            />
          </FormField>

          <FormField name="endTime" title="End time">
            <TimePicker
              value={form.endTime}
              onChange={(endTime) => setForm((prev) => ({ ...prev, endTime }))}
            />
          </FormField>
        </div>

        <FormField name="location" title="Location">
          <Input
            value={form.location}
            onChange={(e) => {
              setForm((prev) => ({ ...prev, location: e.target.value }));
            }}
            id="location"
            name="location"
            type="text"
            placeholder="e.g. Office, Gym..."
          />
        </FormField>

        <FormField name="attendees" title="Attendees">
          <Input
            value={form.attendees}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, attendees: +e.target.value }))
            }
            id="attendees"
            name="attendees"
            type="number"
            min={0}
            placeholder="0"
          />
        </FormField>

        <FormField name="color" title="Color">
          <Select
            value={form.priority}
            isOpen={isColorOpen}
            onOpen={() => setIsColorOpen(true)}
            onClose={() => setIsColorOpen(false)}
          >
            {colors.map((item) => (
              <SelectItem
                key={item}
                isSelected={form.priority === item}
                onClick={() => {
                  setForm((prev) => ({ ...prev, priority: item }));
                  setIsColorOpen(false);
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
            onChange={(e) =>
              setForm((prev) => ({ ...prev, description: e.target.value }))
            }
            id="description"
            name="description"
            rows={4}
            placeholder="Add some details..."
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

        <Button type="submit">Create event</Button>
      </div>
    </form>
  );
};

export default CreateEventForm;
