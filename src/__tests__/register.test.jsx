import { Register } from "../pages/LoginSystem/register";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";

describe("#Register page", () => {
  it("Register page rendered successfully", () => {
    render(<Register />);
    expect(screen.getByText("Register")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter a username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter a password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Confirm password")).toBeInTheDocument();
  });

  it("validates email format", () => {
    render(<Register />);

    const emailInput = screen.getByPlaceholderText(/Enter your email/i);
    const emailNote = screen.getByTestId("emailnote"); // Ensure the element has a test ID or use an alternative selector

    // Initially, the email note should be hidden
    expect(emailNote).toHaveClass("hidden");

    // Input invalid email
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });

    // Validate that the email note is now visible
    expect(screen.getByText(/Must be a valid email/i)).toBeInTheDocument();
  });

  it("validates password format", () => {
    render(<Register />);

    const passwordInput = screen.getByPlaceholderText(/Enter a password/i);

    // Input invalid password
    fireEvent.change(passwordInput, { target: { value: "short" } });
    expect(screen.getByText(/8 to 24 characters\./i)).toBeInTheDocument();
  });

  it("validates password match", () => {
    render(<Register />);

    const passwordInput = screen.getByPlaceholderText(/Enter a password/i);
    const confirmPasswordInput =
      screen.getByPlaceholderText(/Confirm password/i);

    // Input passwords that do not match
    fireEvent.change(passwordInput, { target: { value: "Password123!" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "DifferentPassword123!" },
    });
    expect(
      screen.getByText(/Must match the first password input field\./i)
    ).toBeInTheDocument();
  });
});
