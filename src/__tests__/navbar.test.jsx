import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Navbar } from "../components/Navbar";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthProvider";
import useAuth from "../hooks/auth/useAuth";
import useLogout from "../hooks/auth/useLogout";

vi.mock("../hooks/auth/useAuth", () => ({
  __esModule: true,
  default: vi.fn(),
}));

vi.mock("../hooks/auth/useLogout.js", () => ({
  __esModule: true,
  default: vi.fn(),
}));

describe("Navbar Component", () => {
  const mockLogout = vi.fn();
  const mockUseAuth = useAuth;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows logout button when authenticated", () => {
    mockUseAuth.mockReturnValue({ auth: { accessToken: "test-token" } });

    render(
      <AuthProvider>
        <Router>
          <Navbar />
        </Router>
      </AuthProvider>
    );

    expect(screen.getByText("Log out")).toBeInTheDocument();
    expect(screen.queryByText("Log in")).not.toBeInTheDocument();
  });

  it("shows login link when unauthenticated", () => {
    mockUseAuth.mockReturnValue({ auth: {} });

    render(
      <AuthProvider>
        <Router>
          <Navbar />
        </Router>
      </AuthProvider>
    );

    expect(screen.getByText("Log in")).toBeInTheDocument();
    expect(screen.queryByText("Log out")).not.toBeInTheDocument();
  });

  it("toggles mobile menu open and closed", () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );

    // Open mobile menu
    fireEvent.click(screen.getByTestId("menu-btn"));
    expect(screen.getByTestId("home-link-menu")).toBeVisible();
    expect(screen.getByTestId("protected-link-menu")).toBeVisible();
    expect(screen.getByTestId("admin-link-menu")).toBeVisible();

    // // Close mobile menu
    fireEvent.click(screen.getByTestId("menu-btn"));
    expect(screen.getByTestId("home-link-menu")).toBeVisible();
    expect(screen.getByTestId("protected-link-menu")).toBeVisible();
    expect(screen.getByTestId("admin-link-menu")).toBeVisible();
  });

  it("navigates to correct links", () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );

    expect(screen.getByTestId("home-link")).toHaveAttribute("href", "/");
    expect(screen.getByTestId("protected-link")).toHaveAttribute(
      "href",
      "/protected"
    );
    expect(screen.getByTestId("admin-link")).toHaveAttribute("href", "/admin");
  });

  it("calls logout function when logout button is clicked", () => {
    mockUseAuth.mockReturnValue({ auth: { accessToken: "test-token" } });
    vi.mocked(useLogout).mockReturnValue(mockLogout);

    render(
      <Router>
        <Navbar />
      </Router>
    );

    fireEvent.click(screen.getByText("Log out"));
    expect(mockLogout).toHaveBeenCalled();
  });
});
