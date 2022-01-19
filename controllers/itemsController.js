const Item = require('../models/itemsModel')
const { getPostData } = require('../utils')

//it gets all items using api/items path
const getitems = async (req, res) => {
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
const getitem = async (req, res) => {
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
const createitem = async (req, res) => {
    try {
        const body = await getPostData(req)
        const { title, description, remarks } = JSON.parse(body)

            const item = {
                title,
                description,
                remarks
            }
            
            const newitem = await Item.create(Item)
            res.writeHead(201, {'content-type': 'application/json'})
            return res.end(JSON.stringify(newitem))
    }
    catch(error) {
        console.log(error)
    }
}

module.exports = {
    getitems,
    getitem,
    createitem
}