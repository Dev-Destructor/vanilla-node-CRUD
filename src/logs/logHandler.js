const { writeDataToFile } = require("../utils/utils");

const systemLog = (content, httpStatus) => {
  writeDataToFile(
    `${__dirname}/systemLogs.txt`,
    `${new Date()}, http status: ${httpStatus}, output: ${content}\n`,
    (err) => {
      if (err) {
        console.log(err);
      };
      console.log("System log saved");
    }
  );
};

const errorLog = (content) => {
  writeDataToFile(
    `${__dirname}/systemLogs.txt`,
    `${new Date()}, output: ${content}\n`,
    (err) => {
      if (err) {
        console.log(err);
      }
      console.log("Error log saved");
    }
  );
};

module.exports = {
  systemLog,
  errorLog,
}