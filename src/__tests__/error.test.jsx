// Error.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Error } from "../pages/Error/index";
import { BrowserRouter as Router } from "react-router-dom"; // Router is needed to use Link and useNavigate
import { AuthProvider } from "../contexts/AuthProvider.jsx";

// Create a mock for useNavigate
// const mockNavigate = vi.fn();

describe("Error Component", () => {
  it("renders 404 error correctly", () => {
    // Render the Error component with a 404 code inside a Router context
    render(
      <AuthProvider>
        <Router>
          <Error code="404" />
        </Router>
      </AuthProvider>
    );

    // Check the presence of 404 code and error messages
    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByText("Page not found.")).toBeInTheDocument();
    expect(
      screen.getByText(
        "The page you're looking for may have been moved, deleted, or has never existed."
      )
    ).toBeInTheDocument();

    // Check the presence of the Back to home link
    expect(screen.getByText("Back to home")).toBeInTheDocument();
  });

  it("renders 403 error correctly and the Go back button", () => {
    // Render the Error component with a 403 code inside a Router context
    render(
      <AuthProvider>
        <Router>
          <Error code="403" />
        </Router>
      </AuthProvider>
    );

    // Check the presence of 403 code and error messages
    expect(screen.getByText("403")).toBeInTheDocument();
    expect(screen.getByText("Forbidden.")).toBeInTheDocument();
    expect(
      screen.getByText("You do not have access to this page.")
    ).toBeInTheDocument();

    // Check the presence of the Back to home link and Go back button
    expect(screen.getByText("Back to home")).toBeInTheDocument();
    expect(screen.getByText("Go back")).toBeInTheDocument();
  });

  it("navigates to home on Back to home link click", () => {
    // Render the Error component inside a Router context
    render(
      <AuthProvider>
        <Router>
          <Error code="403" />
        </Router>
      </AuthProvider>
    );

    // Find and click the Back to home link
    fireEvent.click(screen.getByText("Back to home"));

    // Check if the link click navigates to the home page ("/")
    expect(window.location.pathname).toBe("/");
  });
});
