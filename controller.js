import { getAllNames, findById, create, deleteById } from "./model.js";

export const getName = async (res, id) => {
    try {
        const data = await findById(id)

        if(!data) throw new Error()

        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({ "message" : data }));
    } catch(err) {
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({ "message" : "Not found" }));
    } 
} 

export const getNames = async (res) => {

    try {
        const data = await getAllNames()
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({ "message" : data }));
    } catch(err) {
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({ "message" : "Not found" }));
    } 
} 

export const createName = async (req, res) => {

    try {
      
        let body = ''
        req.on('data', (chunk) => {
            body += chunk
        })

        req.on('end', async () => {
            const parsedBody = JSON.parse(body);
            const includesRequired = Object.keys(parsedBody).length === 1 && parsedBody.name;

            if (!includesRequired) {
                res.writeHead(403, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({ "message" : "Only name is allowed" }));
            } else {
                const data = await create(parsedBody)
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({ "message" : data }));
            }

        })

    } catch(err) {
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({ "message" : "Not found" }));
    } 
} 


export const deleteName = async (res, id) => {
    try {
        await deleteById(id)
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({ "message" : `Successfully deleted ${id}` }));
    } catch(err) {
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({ "message" : "Not found" }));
    } 
} 

