// Home.test.jsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Home } from "../pages/Home/index";

describe("Home Component", () => {
  it("renders the correct text", () => {
    // Render the Home component
    render(<Home />);

    // Assert that the text "Hello world.." is present in the document
    const textElement = screen.getByText(/Hello world\.\./i);
    expect(textElement).toBeInTheDocument();
  });
});
