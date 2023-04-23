const Item = require("../utils/itemsModel");
const { getPostData } = require("../utils/utils");
const { systemLog, errorLog } = require("../logs/logHandler");

//it gets all items using api/items path
async function getItems(req, res) {
  try {
    const items = await Item.findAll();

    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify(items));
    systemLog(JSON.stringify(items), 200);
  } catch (error) {
    errorLog(JSON.stringify(error));
    console.log(error)
    res.writeHead(500, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "Internal Server Error" }));
  }
}

//it gets one item using api/item/id path
async function getItem(req, res, id) {
  try {
    const item = await Item.findById(id);
    if (!item) {
      systemLog("Item not found", 404);
      res.writeHead(404, { "content-type": "application/json" });
      res.end(JSON.stringify({ message: "Item Not Found" }));
    } else {
      systemLog(JSON.stringify(item), 200);
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify(item));
    }
  } catch (error) {
    errorLog(JSON.stringify(error));
    // console.log(JSON.stringify(error))
    res.writeHead(500, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "Internal Server Error" }));
  }
}

//it create one item using POST api/items path
async function createItem(req, res) {
  try {
    const body = await getPostData(req);
    const { name, description, remarks } = JSON.parse(body);
    const data = {
      name,
      description,
      remarks,
    };
    const newItem = await Item.create(data);
    systemLog(JSON.stringify(data), 201);
    res.writeHead(201, { "content-type": "application/json" });
    return res.end(JSON.stringify(newItem));
  } catch (error) {
    errorLog(JSON.stringify(error));
    res.writeHead(500, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "Internal Server Error" }));
  }
}

//to update one item using PUT api/items/id path
async function updateItem(req, res, id) {
  try {
    const item = await Item.findById(id);
    if (!item) {
      systemLog("Item not found", 404);
      res.writeHead(404, { "content-type": "application/json" });
      res.end(JSON.stringify({ message: "Item Not Found" }));
    } else {
      const body = await getPostData(req);
      const { name, description, remarks } = JSON.parse(body);

      const data = {
        name: name || Item.name,
        description: description || Item.description,
        remarks: remarks || Item.remarks,
      };
      const updatedItem = await Item.update(id, data);
      systemLog(JSON.stringify(data), 200);
      res.writeHead(200, { "content-type": "application/json" });
      return res.end(JSON.stringify(updatedItem));
    }
  } catch (error) {
    errorLog(JSON.stringify(error));
    res.writeHead(500, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "Internal Server Error" }));
  }
}

//deletes an item using DELETE api/items/id path
const removeItem = async (req, res, id) => {
  try {
    const item = await Item.findById(id);
    if (!item) {
      systemLog("Item not found", 404);
      res.writeHead(404, { "content-type": "application/json" });
      res.end(JSON.stringify({ message: "Item Not Found" }));
    } else {
      await Item.remove(id);
      systemLog(`product ${id} has been removed`, 200);
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ message: `product ${id} has been removed` }));
    }
  } catch (error) {
    errorLog(error);
    res.writeHead(500, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "Internal Server Error" }));
  }
};

module.exports = {
  getItems,
  getItem,
  createItem,
  updateItem,
  removeItem,
};
