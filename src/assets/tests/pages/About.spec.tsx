import About from "../../pages/About";
import { render } from "@testing-library/react";

describe("About Page", () => {
  it("should render the about page", () => {
    render(<About />);
  });
});
