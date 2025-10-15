import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { addHours, format } from "date-fns";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { LoadForm } from "./form";
import type { ReactNode } from "react";

const mockDriversQuery = vi.hoisted(() =>
  vi.fn(() => ({
    data: [
      { id: "driver-1", name: "Driver 1" },
      { id: "driver-2", name: "Driver 2" },
    ],
    isLoading: false,
  })),
);

vi.mock("@/queries", () => ({
  useDriversQuery: mockDriversQuery,
}));

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

describe("LoadForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("requires a load name", async () => {
    const user = userEvent.setup();
    const startDate = addHours(new Date(), 1);
    const endDate = addHours(startDate, 2);

    render(
      <LoadForm
        onCancel={vi.fn()}
        onSubmit={vi.fn()}
        defaultValues={{
          name: "",
          driverId: "driver-1",
          start: startDate,
          end: endDate,
        }}
      />,
      { wrapper: createWrapper() },
    );

    await user.click(screen.getByRole("button", { name: /save/i }));

    await waitFor(() => {
      const nameInput = screen.getByLabelText(/name/i);
      const fieldContainer = nameInput.closest('[role="group"]');
      const error = fieldContainer?.querySelector('[data-slot="field-error"]');
      expect(error?.textContent).toMatch(/required/i);
    });
  });

  it("requires a driver", async () => {
    const user = userEvent.setup();
    const startDate = addHours(new Date(), 1);
    const endDate = addHours(startDate, 2);

    render(
      <LoadForm
        onCancel={vi.fn()}
        onSubmit={vi.fn()}
        defaultValues={{
          name: "Test Load",
          driverId: "",
          start: startDate,
          end: endDate,
        }}
      />,
      { wrapper: createWrapper() },
    );

    await user.click(screen.getByRole("button", { name: /save/i }));

    await waitFor(() => {
      const driverSelect = screen.getByLabelText(/driver/i);
      const fieldContainer = driverSelect.closest('[role="group"]');
      const error = fieldContainer?.querySelector('[data-slot="field-error"]');
      expect(error?.textContent).toMatch(/required/i);
    });
  });

  it("requires a start date in the future", async () => {
    const user = userEvent.setup();
    const pastDate = addHours(new Date(), -1);
    const endDate = addHours(pastDate, 2);

    render(
      <LoadForm
        onCancel={vi.fn()}
        onSubmit={vi.fn()}
        defaultValues={{
          name: "Test Load",
          driverId: "driver-1",
          start: pastDate,
          end: endDate,
        }}
      />,
      { wrapper: createWrapper() },
    );

    await user.click(screen.getByRole("button", { name: /save/i }));

    await waitFor(() => {
      const startInput = screen.getByLabelText(/pickup/i);
      const fieldContainer = startInput.closest('[role="group"]');
      const error = fieldContainer?.querySelector('[data-slot="field-error"]');
      expect(error?.textContent).toMatch(/start date must be in the future/i);
    });
  });

  it("requires an end date", async () => {
    const user = userEvent.setup();
    const startDate = addHours(new Date(), 1);

    render(
      <LoadForm
        onCancel={vi.fn()}
        onSubmit={vi.fn()}
        defaultValues={{
          name: "Test Load",
          driverId: "driver-1",
          start: startDate,
        }}
      />,
      { wrapper: createWrapper() },
    );

    await user.click(screen.getByRole("button", { name: /save/i }));

    await waitFor(() => {
      const startInput = screen.getByLabelText(/dropoff/i);
      const fieldContainer = startInput.closest('[role="group"]');
      const error = fieldContainer?.querySelector('[data-slot="field-error"]');
      expect(error?.textContent).toMatch(/required/i);
    });
  });

  it("requires end date to be after start date", async () => {
    const user = userEvent.setup();
    const startDate = addHours(new Date(), 1);
    const endDate = addHours(startDate, -1);

    render(
      <LoadForm
        onCancel={vi.fn()}
        onSubmit={vi.fn()}
        defaultValues={{
          name: "Test Load",
          driverId: "driver-1",
          start: startDate,
        }}
      />,
      { wrapper: createWrapper() },
    );

    const endInput = screen.getByLabelText(/dropoff/i);
    await user.clear(endInput);
    await user.type(endInput, format(endDate, "yyyy-MM-dd'T'HH:mm"));
    await user.tab();

    await waitFor(() => {
      const startInput = screen.getByLabelText(/dropoff/i);
      const fieldContainer = startInput.closest('[role="group"]');
      const error = fieldContainer?.querySelector('[data-slot="field-error"]');
      expect(error?.textContent).toMatch(/must be after start date/i);
    });
  });

  it("requires the end date to be within 24 hours of the start date", async () => {
    const user = userEvent.setup();
    const startDate = addHours(new Date(), 1);
    const endDate = addHours(startDate, 25);

    render(
      <LoadForm
        onCancel={vi.fn()}
        onSubmit={vi.fn()}
        defaultValues={{
          name: "Test Load",
          driverId: "driver-1",
          start: startDate,
        }}
      />,
      { wrapper: createWrapper() },
    );

    const endInput = screen.getByLabelText(/dropoff/i);
    await user.clear(endInput);
    await user.type(endInput, format(endDate, "yyyy-MM-dd'T'HH:mm"));

    await waitFor(() => {
      const startInput = screen.getByLabelText(/dropoff/i);
      const fieldContainer = startInput.closest('[role="group"]');
      const error = fieldContainer?.querySelector('[data-slot="field-error"]');
      expect(error?.textContent).toMatch(/cannot be longer than 24 hours/i);
    });
  });
});
