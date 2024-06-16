import fetch from 'jest-fetch-mock';
import { request } from "../helpers";

describe("request Tests", () => {

  it("Should throw an error if response is not ok", async () => {
    const response = {
      ok: false,
      status: 404,
    };

    global.fetch = jest.fn().mockResolvedValue(response);

    await expect(request("/api/vehicles.json")).rejects.toThrow(
      `API call failed: ${response.status}`
    );
  });
  it("Should return a json response if response is ok", async () => {
    const response = { ok: true, json: jest.fn() };

    global.fetch = jest.fn().mockResolvedValue(response);

    await request("/api/vehicles.json");

    expect(response.json).toBeCalled();
  });

  it("Should throw an error if fetch fails", async () => {
    const error = new Error("An error occurred");
    global.fetch = jest.fn().mockRejectedValue(error);

    await expect(request("/api/vehicles.json")).rejects.toThrow(
      `Failed to fetch from /api/vehicles.json: ${error.message}`
    );
  });
})