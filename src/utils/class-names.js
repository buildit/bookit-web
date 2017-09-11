// const classnames = (...classNames) => new Set(classNames).values().reduce(
//   (out, className) => out.concat(` ${className}`),
//   ''
// )

const classnames = (...classNames) => classNames.reduce(
  (out, className) => out.concat(` ${className}`),
  ''
)

export default classnames
