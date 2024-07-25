import ProtectedPage from "../pages/Protected";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

describe("#Protected Page", () => {
  it("Protected page rendered successfully", () => {
    render(<ProtectedPage />);
    expect(screen.getByText("Protected Page")).toBeInTheDocument();
  });
});
