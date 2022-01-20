const Item = require('../models/itemsModel')
const { getPostData } = require('../utils')

//it gets all items using api/items path
async function getitems(req, res) {
    try {
        const items = await Item.findAll()
        
        res.writeHead(200, {'content-type': 'application/json'})
        res.end(JSON.stringify(items))
    }
    catch(error) {
       console.log(error) 
    }
}

//it gets one item using api/item/id path
async function getitem(req, res, id) {
    try {
        const item = await Item.findById(id)
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
//it create one item using POST api/items path
async function createitem(req, res) {
    try {
        const body = await getPostData(req)
        const { name, description, remarks } = JSON.parse(body)
            const things = {
                name,
                description,
                remarks
            }
            const newitem = await Item.create(things)
            res.writeHead(201, {'content-type': 'application/json'})
            return res.end(JSON.stringify(newitem))
    }
    catch(error) {
        console.log(error)
    }
}

//to update one item using PUT api/items/id path
async function updateitem(req, res, id) {
    try {
        const item = await Item.findById(id)
        if (!item) {
            res.writeHead(404, {'content-type': 'application/json'})
            res.end(JSON.stringify({message: 'Item Not Found'}))
        }
        else {
            const body = await getPostData(req)
        const { name, description, remarks } = JSON.parse(body)

            const things = {
                name: name || Item.name,
                description: description || Item.description,
                remarks: remarks || Item.remarks
            }
            
            const upditem = await Item.update(id, things)
            res.writeHead(201, {'content-type': 'application/json'})
            return res.end(JSON.stringify(upditem))
        }
    }
    catch(error) {
        console.log(error)
    }
}

//deletes an item using DELETE api/items/id path 
const removeitem = async (req, res, id) => {
    try {
        const item = await Item.findById(id)
        if (!item) {
            res.writeHead(404, {'content-type': 'application/json'})
            res.end(JSON.stringify({message: 'Item Not Found'}))
        }
        else {
            await Item.remove(id)
            res.writeHead(200, {'content-type': 'application/json'})
            res.end(JSON.stringify({message: `product ${id} has been removed`}))
        }
        
    }
    catch(error) {
       console.log(error) 
    }
}

module.exports = {
    getitems,
    getitem,
    createitem,
    updateitem,
    removeitem
}