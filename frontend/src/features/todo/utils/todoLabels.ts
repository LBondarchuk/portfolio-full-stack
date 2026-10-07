const todoLabels: Record<string, string> = {
  all: "Alle",
  other: "Sonstiges",
  personal: "Privat",
  study: "Lernen",
  work: "Arbeit",
  todo: "Offen",
  "in-progress": "In Bearbeitung",
  done: "Erledigt",
  low: "Niedrig",
  medium: "Mittel",
  high: "Hoch",
  Mon: "Mo",
  Tue: "Di",
  Wed: "Mi",
  Thu: "Do",
  Fri: "Fr",
  Sat: "Sa",
  Sun: "So",
};

export const getTodoLabel = (value: string) => todoLabels[value] ?? value;
