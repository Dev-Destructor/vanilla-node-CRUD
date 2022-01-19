let items = require('../data/items')
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

const update = (id, item) => {
    return new Promise((resolve, reject) => {
        const index = items.findIndex((p) => p.id === id)
        items[index] = {id, ...item}

        writeDataToFile('./data/items.json', items)
        resolve(items[index])
})
}

const remove = (id, item) => {
    return new Promise((resolve, reject) => {
        items = items.filter((p) => p.id !== id)

        writeDataToFile('./data/items.json', items)
        resolve()
})
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
}