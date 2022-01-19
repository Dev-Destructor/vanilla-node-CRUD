const items = require('../data/items')
const { v4: uuidv4 } = require('uuid')
const { writeDataToFile } = require('../utils')

const findAll = () => {
    return new Promise((resolve, reject) => {
        resolve(items)
    })
}

const findById = (id) => {
        return new Promise((resolve, reject) => {
        const item = items.find((i) => i.id === id)
        resolve(item)
    })
}

const create = () => {
    return new Promise((resolve, reject) => {
    const newitem = {id: uuidv4(), ...items}
    items.push(newitem)
    writeDataToFile('./data/items.json', items)
    resolve(newitem)
})
}

module.exports = {
    findAll,
    findById,
    create
}