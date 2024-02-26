import { render, screen, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";
import App from "./App";

test("can recieve a new user and show it on a list", async () => {
  render(<App />);

  const nameInput = screen.getByRole("textbox", { name: /name/i });
  const emailInput = screen.getByRole("textbox", { name: /email/i });
  const button = screen.getByRole("button");

  user.click(nameInput);
  user.keyboard("anu");

  user.click(emailInput);
  user.keyboard("anu@anu.com");

  user.click(button);

  await waitFor(() => {
    const name = screen.getByRole("cell", { name: "anu" });
    const email = screen.getByRole("cell", { name: "anu@anu.com" });

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  });
});
