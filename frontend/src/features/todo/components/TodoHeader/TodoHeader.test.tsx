import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { userEvent } from "@testing-library/user-event";
import TodoHeader from "./TodoHeader";

describe("TodoHeader", () => {
  afterEach(() => {
    cleanup();
  });
  it("render the add todo button", () => {
    render(<TodoHeader />);
    expect(
      screen.getByRole("button", { name: "Aufgabe hinzufügen" }),
    ).toBeTruthy();
  });
  it("opens the modal when add button is clicked", async () => {
    const user = userEvent.setup();

    render(<TodoHeader />);

    await user.click(
      screen.getByRole("button", { name: "Aufgabe hinzufügen" }),
    );

    expect(screen.getByLabelText("Titel")).toBeTruthy();
    expect(screen.getByLabelText("Beschreibung")).toBeTruthy();
  });
});
