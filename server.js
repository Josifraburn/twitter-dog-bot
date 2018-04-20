const http = require('http')
require('./index.js')

const PORT = 3000;

const app = http.createServer((request, response) => {
    response.write('<h1>Hello World</h1>');
    response.end()
})

app.listen(PORT, () => {
    console.log(`App is up at http://localhost:${PORT}`)
})