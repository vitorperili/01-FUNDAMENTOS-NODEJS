import http from 'node:http'
import { json } from './middlewares/json.js'
import { routes } from './routes.js'
import { extractQueryParams } from './utils/extract-query-params.js'


// GET => Buscar um recurso do back-end
// POST => Criar um recurso
// PUT => Atualizar um recurso
// PATCH => Atualizar uma informação específica de um recurso
// DELETE => Deletar um recurso do back-end

// Stateful - Stateless

// JSON -Javascript Object Notation

// Cabeçalhos (Requisoção/resposta) => Metadados

// HTTP Status Code

// Query Parameters: URL Stateful => Filtros, paginação, não-obrigatórios
// Route Parameters: Identificação de recurso
// Request Body: Envio de informações de um formulário (HTPPs)

// http://localhost:3333/users?userId=1&name=Vitor

// http://localhost:3333/users/1

const server = http.createServer(async (req, res  ) => {
    const { method, url } = req

    await json(req, res)

    const route = routes.find(route => {
        return route.method === method && route.path.test(url)
    })

    if(route) {
        const routeParams = req.url.match(route.path)

        // console.log()

        const { query, ...params } = routeParams.groups

        req.params = params
        req.query = query ? extractQueryParams(query) : {}

        return route.handler(req, res)
    }

    return res.writeHead(404).end()
}) 

server.listen(3333)