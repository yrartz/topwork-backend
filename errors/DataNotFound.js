class DataNotFound extends Error {
  constructor(msg) {
    super(msg)
  }
}

module.exports = DataNotFound