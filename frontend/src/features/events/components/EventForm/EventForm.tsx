import { useForm } from "react-hook-form";
import FormField from "../../../../components/form/FormField/FormField";
import Input from "../../../../components/form/Input/Input";
import Select from "../../../../components/form/Select/Select";
import SelectItem from "../../../../components/form/Select/SelectItem";
import Button from "../../../../components/buttons/Button/Button";
import TimePicker from "../../../../components/form/TimePicker/TimePicker";
import DatePicker from "../../../../components/form/DatePicker/DatePicker";
import type { CreateEvent, EventPriority } from "../../types/events.types";
import Loader from "../../../../components/Loader/Loader";
import { parseDateParam } from "../../utils/date";
import { useEventForm } from "./useEventForm";

type Props = {
  onClose: () => void;
  defaultValue?: CreateEvent;
};

export type EventInputs = Pick<
  CreateEvent,
  "title" | "description" | "attendees"
>;

const priorities: EventPriority[] = ["low", "medium", "high"];

const EventForm = ({ onClose, defaultValue }: Props) => {
  const {
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
  } = useEventForm({
    onClose,
    defaultValue,
  });

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
  } = useForm<EventInputs>({
    defaultValues: {
      title: defaultValue?.title ?? "",
      description: defaultValue?.description ?? "",
      attendees: defaultValue?.attendees,
    },
    mode: "onBlur",
  });

  return (
    <form className="grid gap-6" onSubmit={hookFormSubmit(handleSubmit)}>
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
            {...register("title", {
              required: "Title is required.",
              minLength: {
                value: 3,
                message: "Title must contain at least 3 characters.",
              },
              maxLength: {
                value: 100,
                message: "Title must not exceed 100 characters.",
              },
              validate: (value) =>
                value.trim().length > 0 || "Title cannot contain only spaces.",
            })}
            id="title"
            type="text"
            placeholder="e.g. Team meeting"
            aria-invalid={Boolean(errors.title)}
          />

          {errors.title && (
            <p className="mt-1.5 text-xs text-danger">{errors.title.message}</p>
          )}
        </FormField>

        {isEditMode && (
          <FormField name="date" title="Date">
            <DatePicker
              value={parseDateParam(form.date)}
              onChange={handleDateChange}
            />
          </FormField>
        )}

        <div className="grid grid-cols-2 gap-4">
          <FormField name="startTime" title="Start time">
            <TimePicker
              value={form.startTime}
              onChange={handleStartTimeChange}
            />
          </FormField>

          <FormField name="endTime" title="End time">
            <TimePicker value={form.endTime} onChange={handleEndTimeChange} />
          </FormField>
        </div>

        <FormField name="location" title="Location">
          <Input
            id="location"
            name="location"
            type="text"
            placeholder="e.g. Office, Gym..."
            value={form.location ?? ""}
            onChange={(event) => setValue("location", event.target.value)}
          />
        </FormField>

        <FormField name="attendees" title="Attendees">
          <Input
            {...register("attendees", {
              setValueAs: (value) => (value === "" ? undefined : Number(value)),

              min: {
                value: 0,
                message: "Attendees cannot be negative.",
              },

              max: {
                value: 100,
                message: "Maximum 100 attendees allowed.",
              },

              validate: (value) => {
                if (value === undefined) {
                  return true;
                }

                return (
                  Number.isInteger(value) || "Attendees must be a whole number."
                );
              },
            })}
            id="attendees"
            type="number"
            min={0}
            max={100}
            placeholder="0"
            aria-invalid={Boolean(errors.attendees)}
          />

          {errors.attendees && (
            <p className="mt-1.5 text-xs text-danger">
              {errors.attendees.message}
            </p>
          )}
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
            {...register("description", {
              maxLength: {
                value: 500,
                message: "Description must not exceed 500 characters.",
              },
            })}
            id="description"
            rows={4}
            placeholder="Add some details..."
            aria-invalid={Boolean(errors.description)}
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

          <div className="mt-1.5 flex items-center justify-between">
            {errors.description ? (
              <p className="text-xs text-danger">
                {errors.description.message}
              </p>
            ) : (
              <span />
            )}

            <span className="text-xs text-text-muted">Max. 500 characters</span>
          </div>
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
