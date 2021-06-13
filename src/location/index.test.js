import { getCurrentLocation, drawMap } from ".";

let error;

beforeEach(() => {
  error = console.error;
  console.error = jest.fn();
  global.fetch = jest.fn();
});
afterEach(() => {
  global.fetch.mockClear();
  console.error = error;
});

describe("getCurrentLocation", () => {
  it("is a function", () => {
    expect(getCurrentLocation).toBeInstanceOf(Function);
  });

  it("returns geo data for given ip", () => {
    const reply = { city: "Moscow" };
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ city: "Moscow" }),
      })
    );
    return getCurrentLocation().then((data) => {
      expect(data).toMatchObject(reply);
    });
  });

  it("returns null if exception occurs", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.reject(new Error("Something bad happened"))
    );
    expect(await getCurrentLocation()).toBeNull();
  });
});

describe("drawMap", () => {
  let el;

  beforeEach(() => {
    el = document.createElement("div");
  });

  it("is a function", () => {
    expect(drawMap).toBeInstanceOf(Function);
  });

  it("renders city map", () => {
    const lat = "37.0194";
    const lon = "7.9304";
    const key = "abc";
    drawMap(el, lat, lon, key);
    expect(el.innerHTML).toBe(
      `<img src="https://maps.googleapis.com/maps/api/staticmap?center=
${lat},${lon}&amp;zoom=12&amp;size=400x400&amp;key=${key}">`
    );
  });
});
