const express = require('express')
const route = require('./route')
const path = require('path')

const server = express()

// define o arquivo que sera a view engine no caso esse server.js
server.set('view engine', 'ejs')

// define a pasta public que guarda os conteudos, imagens, scripts, styles
server.use(express.static("public"))

// pega a pasta views que ira conter os arquivos .ejs das paginas
server.set('views', path.join(__dirname, 'views'))

// usa o arquivo route com as rotas
server.use(route)

// usa a porta 3000
server.listen(3000, () => console.log('index'))