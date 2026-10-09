import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import TodoForm from "./TodoForm";
import userEvent from "@testing-library/user-event";

describe("TodoForm", () => {
  afterEach(() => {
    cleanup();
  });
  it("renders the form fields and submit button", () => {
    render(<TodoForm closeModal={() => {}} />);

    expect(screen.getByLabelText("Titel")).toBeTruthy();
    expect(screen.getByLabelText("Beschreibung")).toBeTruthy();
    expect(
      screen.getByRole("button", { name: "Aufgabe hinzufügen" }),
    ).toBeTruthy();
  });

  it("shows a validation error when the title contains only spaces", async () => {
    const user = userEvent.setup();
    render(<TodoForm closeModal={() => {}} />);

    await user.type(screen.getByLabelText("Titel"), "   ");
    await user.click(
      screen.getByRole("button", { name: "Aufgabe hinzufügen" }),
    );

    expect(
      screen.getByText("Der Titel darf nicht nur aus Leerzeichen bestehen."),
    ).toBeTruthy();
  });

  it("shows a validation error when the title is too short", async () => {
    const user = userEvent.setup();

    render(<TodoForm closeModal={() => {}} />);

    await user.type(screen.getByLabelText("Titel"), "tt");
    await user.click(
      screen.getByRole("button", { name: "Aufgabe hinzufügen" }),
    );

    const titleInput = screen.getByLabelText("Titel");
    const titleContainer = titleInput.parentElement;

    expect(titleContainer).not.toBeNull();

    expect(
      within(titleContainer!).getByText(
        "Der Titel muss mindestens 3 Zeichen enthalten.",
      ),
    ).toBeTruthy();
  });

  it("shows a validation error when the description is too long", async () => {
    const user = userEvent.setup();
    render(<TodoForm closeModal={() => {}} />);

    const beschreibungTextArea = screen.getByLabelText(
      "Beschreibung",
    ) as HTMLTextAreaElement;
    const beschreibungContainer = beschreibungTextArea.parentElement;
    await user.type(beschreibungTextArea, "a".repeat(901));

    expect(beschreibungContainer).not.toBeNull();
    expect(beschreibungTextArea.value.length).toBe(901);
    await user.click(
      screen.getByRole("button", { name: "Aufgabe hinzufügen" }),
    );
    expect(
      within(beschreibungContainer!).getByText(
        "Die Beschreibung darf höchstens 900 Zeichen enthalten.",
      ),
    ).toBeTruthy();
  });
});
