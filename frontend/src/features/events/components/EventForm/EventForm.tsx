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
import Textarea from "../../../../components/form/Textarea/Textarea";

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
  });

  return (
    <form className="grid gap-6" onSubmit={hookFormSubmit(handleSubmit)}>
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-text">
          {isEditMode ? "Termin bearbeiten" : "Termin erstellen"}
        </h2>

        <p className="mt-1 text-sm text-text-secondary">
          {isEditMode
            ? "Termindetails aktualisieren."
            : "Einen neuen Termin zum Kalender hinzufügen."}
        </p>
      </div>

      <div className="grid gap-4">
        <FormField name="title" title="Titel">
          <Input
            {...register("title", {
              required: "Bitte gib einen Titel ein.",
              minLength: {
                value: 3,
                message: "Der Titel muss mindestens 3 Zeichen enthalten.",
              },
              maxLength: {
                value: 100,
                message: "Der Titel darf höchstens 100 Zeichen enthalten.",
              },
              validate: (value) =>
                value.trim().length > 0 || "Der Titel darf nicht nur aus Leerzeichen bestehen.",
            })}
            error={errors.title?.message}
            id="title"
            type="text"
            placeholder="z. B. Teambesprechung"
            aria-invalid={Boolean(errors.title)}
          />
        </FormField>

        {isEditMode && (
          <FormField name="date" title="Datum">
            <DatePicker
              value={parseDateParam(form.date)}
              onChange={handleDateChange}
            />
          </FormField>
        )}

        <div className="grid grid-cols-2 gap-4">
          <FormField name="startTime" title="Beginn">
            <TimePicker
              value={form.startTime}
              onChange={handleStartTimeChange}
            />
          </FormField>

          <FormField name="endTime" title="Ende">
            <TimePicker value={form.endTime} onChange={handleEndTimeChange} />
          </FormField>
        </div>

        <FormField name="location" title="Ort">
          <Input
            id="location"
            name="location"
            type="text"
            placeholder="z. B. Büro, Fitnessstudio …"
            value={form.location ?? ""}
            onChange={(event) => setValue("location", event.target.value)}
          />
        </FormField>

        <FormField name="attendees" title="Teilnehmende">
          <Input
            {...register("attendees", {
              setValueAs: (value) => (value === "" ? undefined : Number(value)),

              min: {
                value: 0,
                message: "Die Anzahl der Teilnehmenden darf nicht negativ sein.",
              },

              max: {
                value: 100,
                message: "Es sind höchstens 100 Teilnehmende möglich.",
              },

              validate: (value) => {
                if (value === undefined) {
                  return true;
                }

                return (
                  Number.isInteger(value) || "Bitte gib eine ganze Zahl ein."
                );
              },
            })}
            id="attendees"
            type="number"
            min={0}
            max={100}
            placeholder="0"
            aria-invalid={Boolean(errors.attendees)}
            error={errors.attendees?.message}
          />

          {errors.attendees && (
            <p className="mt-1.5 text-xs text-danger">
              {errors.attendees.message}
            </p>
          )}
        </FormField>

        <FormField name="priority" title="Priorität">
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

                  <span className="capitalize">{{ low: "Niedrig", medium: "Mittel", high: "Hoch" }[item]}</span>
                </div>
              </SelectItem>
            ))}
          </Select>
        </FormField>

        <FormField name="description" title="Beschreibung">
          <Textarea
            {...register("description", {
              maxLength: {
                value: 500,
                message: "Die Beschreibung darf höchstens 500 Zeichen enthalten.",
              },
            })}
            id="description"
            rows={4}
            placeholder="Weitere Details hinzufügen …"
            aria-invalid={Boolean(errors.description)}
            error={errors.description?.message}
          />
        </FormField>
      </div>

      <div className="flex items-center justify-end gap-2 border-t border-border pt-4">
        <Button type="button" variant="ghost" onClick={onClose}>
          Abbrechen
        </Button>

        <Button type="submit">
          {loading ? <Loader /> : isEditMode ? "Änderungen speichern" : "Termin erstellen"}
        </Button>
      </div>
    </form>
  );
};

export default EventForm;
