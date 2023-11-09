jest
  .spyOn(window.localStorage.__proto__, "setItem")
  .mockImplementation((key, value) => {
    window.localStorage[key] = value;
  });

jest
  .spyOn(window.localStorage.__proto__, "getItem")
  .mockImplementation((key) => {
    return window.localStorage[key];
  });
