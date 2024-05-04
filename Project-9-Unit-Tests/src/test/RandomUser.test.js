import { fireEvent, screen, render } from "@testing-library/react";
import { RandomUser } from "components/RandomUser/RandomUser";
import axios from "axios";
jest.mock("axios");

describe("<RandomUser/>", () => {
  it("loads user when clicking on the button", async () => {
    render(<RandomUser />);

    axios.get.mockResolvedValueOnce({ data: MOKE_USER_RESPONSE });
    const button = screen.getByRole("button");
    fireEvent.click(button);
    const titleEl = await screen.findByText("Larry Morales");
    expect(titleEl.textContent).toBe("Larry Morales");

    axios.get.mockResolvedValueOnce({ data: MOKE_USER_RESPONSE2 });
    fireEvent.click(button);
    const titleEl2 = await screen.findByText("Cod Iku");
    expect(titleEl2.textContent).toBe("Cod Iku");
  });
});

const MOKE_USER_RESPONSE = {
  results: [
    {
      gender: "male",
      name: { title: "Mr", first: "Larry", last: "Morales" },
      location: {
        street: { number: 5236, name: "Windsor Road" },
        city: "Salford",
        state: "Mid Glamorgan",
        country: "United Kingdom",
        postcode: "V9 4LG",
        coordinates: { latitude: "-9.9339", longitude: "-170.9802" },
        timezone: {
          offset: "-8:00",
          description: "Pacific Time (US & Canada)",
        },
      },
      email: "larry.morales@example.com",
      login: {
        uuid: "9928fbac-300e-4dc3-b08e-dc19963f872e",
        username: "orangetiger884",
        password: "010101",
        salt: "pab52Wpm",
        md5: "0274ab6b6aa035796d7e0a7f7364d39f",
        sha1: "b68eec137331d541922c5f05ca55ab7bf22737ed",
        sha256:
          "f34e5306f371909bebb1716bc69f7fde6d3723faca31053228634a9fcd0719b0",
      },
      dob: { date: "1989-06-20T03:53:35.384Z", age: 33 },
      registered: { date: "2003-12-01T21:10:09.108Z", age: 19 },
      phone: "019467 96259",
      cell: "07331 171837",
      id: { name: "NINO", value: "ZN 08 10 36 X" },
      picture: {
        large: "https://randomuser.me/api/portraits/men/60.jpg",
        medium: "https://randomuser.me/api/portraits/med/men/60.jpg",
        thumbnail: "https://randomuser.me/api/portraits/thumb/men/60.jpg",
      },
      nat: "GB",
    },
  ],
  info: { seed: "9381afd9dbe05396", results: 1, page: 1, version: "1.4" },
};

const MOKE_USER_RESPONSE2 = {
  results: [
    {
      gender: "male",
      name: { title: "Mr", first: "Cod", last: "Iku" },
      location: {
        street: { number: 5236, name: "Windsor Road" },
        city: "Salford",
        state: "Mid Glamorgan",
        country: "United Kingdom",
        postcode: "V9 4LG",
        coordinates: { latitude: "-9.9339", longitude: "-170.9802" },
        timezone: {
          offset: "-8:00",
          description: "Pacific Time (US & Canada)",
        },
      },
      email: "larry.morales@example.com",
      login: {
        uuid: "9928fbac-300e-4dc3-b08e-dc19963f872e",
        username: "orangetiger884",
        password: "010101",
        salt: "pab52Wpm",
        md5: "0274ab6b6aa035796d7e0a7f7364d39f",
        sha1: "b68eec137331d541922c5f05ca55ab7bf22737ed",
        sha256:
          "f34e5306f371909bebb1716bc69f7fde6d3723faca31053228634a9fcd0719b0",
      },
      dob: { date: "1989-06-20T03:53:35.384Z", age: 33 },
      registered: { date: "2003-12-01T21:10:09.108Z", age: 19 },
      phone: "019467 96259",
      cell: "07331 171837",
      id: { name: "NINO", value: "ZN 08 10 36 X" },
      picture: {
        large: "https://randomuser.me/api/portraits/men/60.jpg",
        medium: "https://randomuser.me/api/portraits/med/men/60.jpg",
        thumbnail: "https://randomuser.me/api/portraits/thumb/men/60.jpg",
      },
      nat: "GB",
    },
  ],
  info: { seed: "9381afd9dbe05396", results: 1, page: 1, version: "1.4" },
};
