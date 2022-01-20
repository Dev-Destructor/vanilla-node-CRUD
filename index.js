const http = require('http')
const { getitems, getitem, createitem, updateitem, removeitem } = require('./controllers/itemsController')

const port = process.env.PORT || 5000

const server = http.createServer((req, res) => {
    if (req.url === '/api/items' && req.method === 'GET') {
        const id = req.url.split('/')[3] 
        getitems(req, res, id)
    } 
    else if (req.url.match(/\/api\/items\/([0-9]+)/) && req.method === 'GET') {
        const id = req.url.split('/')[3]
        getitem(req, res, id)
    }
    else if (req.url.match(/\/api\/items\/([0-9]+)/) && req.method === 'PUT') {
        const id = req.url.split('/')[3]
        updateitem(req, res, id)
    }
    else if (req.url === '/api/items' && req.method === 'POST') {
        createitem(req, res)
    }
    else if (req.url.match(/\/api\/items\/([0-9]+)/) && req.method === 'DELETE') {
        const id = req.url.split('/')[3]
        removeitem(req, res, id)
    }
    else {
        res.writeHead(404, {'content-type': 'application/json'})
        res.end(JSON.stringify({message: 'Route not found'}))
    }
})

server.listen(port, (err) => {
    if (err) throw err 
    console.log('Server is listening to port ' + port)
})