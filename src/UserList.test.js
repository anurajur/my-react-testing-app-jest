import { render, screen, within } from "@testing-library/react";
import UserList from "./UserList";

function renderComponent() {
  const users = [
    { name: "anu", email: "anu@anu.com" },
    { name: "sam", email: "sam@sam.com" },
  ];
  render(<UserList users={users} />);
  return {
    users,
  };
}

test("render one row per user", () => {
  renderComponent();
  //find the all rows in the table
  const rows = within(screen.getByTestId("users")).getAllByRole("row");

  //assertion
  expect(rows).toHaveLength(2);
});

test("render the email and name of the each user", () => {
  const { users } = renderComponent();
  for (let user of users) {
    const name = screen.getByRole("cell", { name: user.name });
    const email = screen.getByRole("cell", { name: user.email });

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  }
});
