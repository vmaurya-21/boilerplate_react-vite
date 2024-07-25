import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Login } from "../pages/LoginSystem/login";
import { BrowserRouter as Router } from "react-router-dom";
//import axios from "../lib/axios";

describe("#login", () => {
  it("Login component rendered successfully", () => {
    render(
      <Router>
        <Login />
      </Router>
    );
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Your username or email")
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Your password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign in/i })
    ).toBeInTheDocument();
  });

  it("should update usernameOrEmail state on input change", () => {
    render(
      <Router>
        <Login />
      </Router>
    );
    const usernameInput = screen.getByPlaceholderText("Your username or email");
    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    expect(usernameInput.value).toBe("testuser");
  });

  it("should update password state on input change", () => {
    render(
      <Router>
        <Login />
      </Router>
    );
    const passwordInput = screen.getByPlaceholderText("Your password");
    fireEvent.change(passwordInput, { target: { value: "testpass" } });
    expect(passwordInput.value).toBe("testpass");
  });
});
