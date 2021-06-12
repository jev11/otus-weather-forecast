import { drawWeather, getWeather } from ".";

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

const weatherInfo = {
  coord: {
    lon: 37.6156,
    lat: 55.7522,
  },
  weather: [
    {
      id: 502,
      main: "Rain",
      description: "heavy intensity rain",
      icon: "10d",
    },
  ],
  base: "stations",
  main: {
    temp: 16.1,
    feels_like: 15.38,
    temp_min: 14.75,
    temp_max: 17.24,
    pressure: 1005,
    humidity: 62,
    sea_level: 1005,
    grnd_level: 987,
  },
  visibility: 10000,
  wind: {
    speed: 5.02,
    deg: 151,
    gust: 6.35,
  },
  rain: {
    "1h": 4.04,
  },
  clouds: {
    all: 32,
  },
  dt: 1621493432,
  sys: {
    type: 2,
    id: 2000314,
    country: "RU",
    sunrise: 1621472965,
    sunset: 1621532579,
  },
  timezone: 10800,
  id: 524901,
  name: "Moscow",
  cod: 200,
};

describe("drawWeather", () => {
  let el;

  beforeEach(() => {
    el = document.createElement("div");
  });

  it("is a function", () => {
    expect(drawWeather).toBeInstanceOf(Function);
  });

  it("renders weather in an element", () => {
    drawWeather(el, weatherInfo);
    expect(el.innerHTML).toBe(
      `<div>
    <span>
    Moscow
    </span>
    <span>
    <img src="https://openweathermap.org/img/wn/10d.png">
    </span>
    <span>
    Temperature: 16C
    </span>
    </div>`
    );
  });
});

describe("getWeather", () => {
  it("is a function", () => {
    expect(getWeather).toBeInstanceOf(Function);
  });

  it("returns weather for a given city", () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(weatherInfo),
      })
    );
    return getWeather("Moscow", "abc").then((data) => {
      expect(data).toMatchObject(weatherInfo);
    });
  });

  it("returns null if exception occurs", async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.reject(new Error("Something bad happened"))
    );
    expect(await getWeather("Moscow", "abc")).toBeNull();
  });
});
