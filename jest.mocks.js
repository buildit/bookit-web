const storageMock = () => {
  let store = {};
  return {
    getItem: key => store[key],
    setItem: (key, value) => { store[key] = value.toString(); },
    removeItem: (key) => { delete store[key]; },
    clear: () => { store = {}; },
  };
};

const localStorageMock = (() => storageMock())();

global.localStorage = localStorageMock;

Object.defineProperty(
  window,
  'localStorage',
  { value: localStorageMock, configurable: true, enumerable: true, writable: true }
);
