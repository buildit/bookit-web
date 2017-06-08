/* eslint-disable no-underscore-dangle */

const configParam = (key, defaultVal) => (window.__CONFIG && window.__CONFIG[key]) || defaultVal

export default configParam
