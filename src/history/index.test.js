import { drawHistory, loadHistory, saveHistory, keepHistory } from ".";

describe("drawHistory", () => {
  let el;

  beforeEach(() => {
    el = document.createElement("div");
  });

  it("is a function", () => {
    expect(drawHistory).toBeInstanceOf(Function);
  });

  it("renders city list in history", () => {
    const cities = ["Moscow", "Kazan", "Ekaterinburg"];
    drawHistory(el, cities);
    expect(el.innerHTML).toBe(
      `<ul>\
<li class="city">Moscow</li>\
<li class="city">Kazan</li>\
<li class="city">Ekaterinburg</li>\
</ul>`
    );
  });
});

describe("loadHistory", () => {
  it("is a function", () => {
    expect(loadHistory).toBeInstanceOf(Function);
  });

  it("returns an empty array when local storage is empty", () => {
    jest
      .spyOn(Object.getPrototypeOf(window.localStorage), "getItem")
      .mockImplementation(() => null);
    expect(loadHistory()).toStrictEqual([]);
  });

  it("returns array of cities when local storage contains data", () => {
    jest
      .spyOn(Object.getPrototypeOf(window.localStorage), "getItem")
      .mockImplementation(() => `["Moscow","Ekaterinburg"]`);
    expect(loadHistory()).toStrictEqual(["Moscow", "Ekaterinburg"]);
  });
});

describe("keepHistory", () => {
  it("is a function", () => {
    expect(keepHistory).toBeInstanceOf(Function);
  });

  it("calls localstorage.setItem", () => {
    const cities = ["Moscow", "Ekaterinburg"];
    const spy = jest.spyOn(
      Object.getPrototypeOf(window.localStorage),
      "setItem"
    );

    saveHistory(cities);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith("cities", JSON.stringify(cities));
    spy.mockRestore();
  });
});

describe("saveHistory", () => {
  it("is a function", () => {
    expect(saveHistory).toBeInstanceOf(Function);
  });

  it("keeps maximum 10 items in history", () => {
    const list = [];
    for (let i = 0; i <= 20; i += 1) {
      keepHistory(i, list);
      expect(list.length).toBeLessThan(11);
    }
    expect(list.length).toBe(10);
  });

  it("doesn't add double items in history", () => {
    const list = [0, 1, 2, 3, 4, 5];
    for (let i = 0; i <= 5; i += 1) {
      keepHistory(i, list);
      expect(list.length).toBe(6);
      expect(list).toStrictEqual([0, 1, 2, 3, 4, 5]);
    }
  });
});
