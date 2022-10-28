import * as user from "../user";

describe("user test", () => {
  it("should create a new user", async () => {
    const request = {
      body: { username: "test12345678", password: "password" },
    };
    let status, data;
    const response = {
      status: (arg) => {
        status = arg;
        return response;
      },
      send: (json) => {
        data = json;
      },
    };
    await user.signup(request as any, response as any, null);
    expect(status).toBe(200);
    console.log(data.token);
    expect(typeof data.token === "string").toBeTruthy();
  });
});
