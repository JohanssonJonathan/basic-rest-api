import fs from 'fs'
import { v4 as uuidv4 } from 'uuid';

const namesFile = 'names.json'
export const getAllNames = () => {
    return new Promise((resolve) => {
        const readFileSync  = fs.readFileSync(`./${namesFile}`, 'utf8');
        resolve(JSON.parse(readFileSync))
    })
}


export const findById = (id) => {
    return new Promise((resolve) => {
        const readFileSync  = fs.readFileSync(`./${namesFile}`, 'utf8');
        const currentReport = JSON.parse(readFileSync).find((report) => report.id === id);
        console.log('currentReport: ', currentReport)
        resolve(currentReport)
    })
}


export const deleteById = (id) => {
    return new Promise((resolve, reject) => {
        const readFileSync  = fs.readFileSync(`./${namesFile}`, 'utf8');
        const parsedJson = JSON.parse(readFileSync)
        const currentReport = parsedJson.find((report) => report.id === id);
       
        if (!currentReport) {
            return reject()
        }

        const newJson = parsedJson.filter((report) => report.id !== id);

        try {
            fs.writeFileSync(`./${namesFile}`, JSON.stringify(newJson))
            resolve()
        } catch {
            reject()
        }
    })
}

export const create = (body) => {
    return new Promise((resolve, reject) => {
        const readFileSync  = fs.readFileSync('./names.json').toString();
        const currentFileData = JSON.parse(readFileSync)

        const newName = {...body, id: uuidv4()} 
        currentFileData.push(newName)

        try {
            fs.writeFileSync(`./${namesFile}`, JSON.stringify(currentFileData))
            resolve(newName)
        } catch {
            reject()
        }
    })
}
