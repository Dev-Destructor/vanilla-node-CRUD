const fs = require("fs");

function writeDataToFile(filename, content) {
  fs.appendFile(filename, content + "\n", "utf-8", (err) => {
    if (err) {
      fs.appendFile(
        "./logs/errorLogs.txt",
        `${new Date()}, output: ${err}\n`,
        (error) => {
          if (error) throw error;
          console.log("Error log saved from function writeDataToFile!");
        }
      );
    }
  });
}

function getPostData(req) {
  return new Promise((resolve, reject) => {
    try {
      let body = " ";

      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        resolve(body);
      });
    } catch (error) {
      fs.appendFile(
        "./logs/errorLogs.txt",
        `${new Date()}, output: ${err}\n`,
        (error) => {
          if (error) throw error;
          console.log("Error log saved from function getPostData!");
        }
      );
      reject(err);
    }
  });
}

module.exports = {
  writeDataToFile,
  getPostData,
};
