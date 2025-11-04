const Path = require("path");
const Db = require("tingodb")().Db;

class DbManager {
  constructor() {
    const db = new Db(Path.join(__dirname, "../data"), {});
    this.tempData = db.collection("tempData");
    this.tempData.ensureIndex({ time: 1 });
  }

  insert(temp) {
    return new Promise((resolve, reject) => {
      this.tempData.insert(
        { ...temp, time: Math.floor(Date.now() / 1000) },
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  }

  tempHistory(secondsBack) {
    const query = {
      time: { $gt: Math.floor(Date.now() / 1000) - secondsBack }
    };

    console.log(JSON.stringify(query));

    return new Promise((resolve, reject) => {
      this.tempData
        .find(query)
        .sort({ time: 1 })
        .toArray((err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
    });
  }
}

module.exports = DbManager;
