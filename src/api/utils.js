/* eslint-disable no-underscore-dangle */
const configParam = (key, defaultVal) => (window.__CONFIG && window.__CONFIG[key]) || defaultVal

export const apiBaseUrl = configParam('apiBaseUrl', 'http://localhost:8888')
