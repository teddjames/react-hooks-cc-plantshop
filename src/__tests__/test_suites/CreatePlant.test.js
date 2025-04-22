import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "../../components/App";
import "@testing-library/jest-dom";

describe("2nd Deliverable", () => {
  test("adds a new plant when the form is submitted", async () => {
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue({
        name: "foo",
        image: "foo_plant_image_url",
        price: "10",
      }),
    });

    const { getByPlaceholderText, findByText, getByText } = render(<App />);

    fireEvent.change(getByPlaceholderText("Plant name"), {
      target: { value: "foo" },
    });
    fireEvent.change(getByPlaceholderText("Image URL"), {
      target: { value: "foo_plant_image_url" },
    });
    fireEvent.change(getByPlaceholderText("Price"), {
      target: { value: "10" },
    });
    fireEvent.click(getByText("Add Plant"));

    expect(fetch).toHaveBeenCalledWith("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify({
        name: "foo",
        image: "foo_plant_image_url",
        price: 10,
      }),
    });

    const newPlant = await findByText("foo");
    expect(newPlant).toBeInTheDocument();
  });
});
