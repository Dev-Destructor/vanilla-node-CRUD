const items = require('../data/items')

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

module.exports = {
    findAll,
    findById
}