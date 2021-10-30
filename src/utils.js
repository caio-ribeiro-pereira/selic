function sanitize(value, defaultValue) {
  return value !== undefined ? value : defaultValue;
}

exports.sanitize = sanitize;
