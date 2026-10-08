import { describe, expect, it, vi } from "vitest";
import { api } from "../../../../api/axios";
import { testAnalytics } from "./todo.test-data";
import { useTodo } from "../todo.store";

describe("get todo analytics", () => {
  it("should load todo analytics", async () => {
    vi.spyOn(api, "get").mockResolvedValue({ data: testAnalytics });
    await useTodo.getState().getTodoAnalytics();

    expect(useTodo.getState().analytics).toEqual(testAnalytics);
    expect(api.get).toHaveBeenCalledWith("/todos/analytics", {});
  });

  it("should throw an error when loading analytics fails", async () => {
    vi.spyOn(api, "get").mockRejectedValue(
      new Error("Failed to load analytics"),
    );
    await expect(useTodo.getState().getTodoAnalytics()).rejects.toThrow(
      "Failed to load analytics",
    );
  });
});
