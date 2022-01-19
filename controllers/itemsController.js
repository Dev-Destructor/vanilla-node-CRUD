const item = require('../models/itemsModel')

//it gets all items using api/items path
const getitems = async (req, res) => {
    try {
        const items = await item.findAll()
        
        res.writeHead(200, {'content-type': 'application/json'})
        res.end(JSON.stringify(items))
    }
    catch(error) {
       console.log(error) 
    }
}

//it gets one item using api/item/id path
const getitem = async (req, res) => {
    try {
        const item = await item.findById(id)
        if (!item) {
            res.writeHead(404, {'content-type': 'application/json'})
            res.end(JSON.stringify({message: 'Item Not Found'}))
        }
        else {
            res.writeHead(200, {'content-type': 'application/json'})
            res.end(JSON.stringify(item))
        }
        
    }
    catch(error) {
       console.log(error) 
    }
}

module.exports = {
    getitems,
    getitem
}