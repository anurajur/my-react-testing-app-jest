import { render, screen, act } from "@testing-library/react";
import UserForm from "./UserForm";
import user from "@testing-library/user-event";

test("it shows two inputs and a button", () => {
  render(<UserForm />);

  const inputs = screen.getAllByRole("textbox");
  const button = screen.getByRole("button");

  expect(button).toBeInTheDocument();
  expect(inputs).toHaveLength(2);
});

test("it calls onUserAdd when the form is submitted", () => {
  const mock = jest.fn();
  render(<UserForm onUserAdd={mock} />);
  //find the two inputs
  const nameInput = screen.getByRole("textbox", { name: /name/i });
  const emailInput = screen.getByRole("textbox", { name: /email/i });
  //simulate typing in a name
  user.click(nameInput);
  user.keyboard("anu");
  //simulate typing in an email
  user.click(emailInput);
  user.keyboard("anu@anu.com");
  //find the button
  const button = screen.getByRole("button");
  user.click(button);
  //assertion to make sure 'onUserAdd' gets called with email/name
  expect(mock).toHaveBeenCalled();
  expect(mock).toHaveBeenCalledWith({ name: "anu", email: "anu@anu.com" });
});

test("empties the two inputs when form is submitted", () => {
  render(<UserForm onUserAdd={() => {}} />);

  const nameInput = screen.getByRole("textbox", { name: /name/i });
  const emailInput = screen.getByRole("textbox", { name: /email/i });
  const button = screen.getByRole("button");
  act(() => {
    user.type(nameInput, "anu");
    user.type(emailInput, "anu@anu.com");
    user.click(button);
  });

  // Use .toHaveValue() directly on the input elements
  expect(nameInput).toHaveValue("");
  expect(emailInput).toHaveValue("");
});
