const STORE_KEY_PREFIX = '_bookit'

const makeStoreKey = key => `${STORE_KEY_PREFIX}|${key}`

export const storeItem = (key, item) => {
  localStorage.setItem(makeStoreKey(key), JSON.stringify(item))
}

export const getItem = (key) => {
  const result = localStorage.getItem(makeStoreKey(key))
  return result ? JSON.parse(result) : null
}

export const getItems = (...items) => items.reduce((out, key) => ({ ...out, [key]: localStorage.getItem(makeStoreKey(key)) }), {})

export const clearItem = (...items) => {
  for (const key of items) {
    localStorage.removeItem(makeStoreKey(key))
  }
}

export const storeAuthentication = authn => storeItem('authn', authn)
export const getAuthentication = () => getItem('authn')
export const clearAuthentication = () => clearItem('authn')
