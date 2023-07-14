let items = require("../models/items");
const { v4: uuidv4 } = require("uuid");
const { writeDataToFile } = require("./utils");
const fs = require("fs");

const findAll = () => {
  return new Promise((resolve, reject) => {
    resolve(items);
  });
};

const findById = (id) => {
  return new Promise((resolve, reject) => {
    const item = items.find((i) => i.id === id);
    resolve(item);
  });
};

const create = () => {
  return new Promise((resolve, reject) => {
    const newItem = { id: uuidv4(), ...items };
    items.push(newItem);
    writeDataToFile("./data/items.json", items);
    resolve(newItem);
  });
};

const update = (id, item) => {
  return new Promise((resolve, reject) => {
    const index = items.findIndex((p) => p.id === id);
    items[index] = { id, ...item };

    writeDataToFile("./data/items.json", items);
    resolve(items[index]);
  });
};

const remove = (id, item) => {
  return new Promise((resolve, reject) => {
    item = items.filter((p) => p.id !== id);

    writeDataToFile("./data/items.json", items);
    resolve();
  });
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
