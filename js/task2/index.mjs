import fs from 'fs';
import csv from 'csvtojson';
import {once} from 'events';

const input = './csv/task1_input.csv'
const output = './txt/task1_input.txt'

const readable = fs.createReadStream(input)
const writable = fs.createWriteStream(output)
const lineReader = require("readline").createInterface({
    input: readable
})

async function run() {
    const headers = [];

    lineReader.on('line', (line) => {
        headers.push(...line.split(',').map(el => el.toLowerCase()))
        lineReader.close()
        lineReader.removeAllListeners()
    });
    writable.on('error', (e) => console.log('write error: ', e));

    const onError = (e) => {
        console.log('read error: ', e)
    }
    await once(lineReader, 'close')
    csv({
        headers,
        ignoreColumns: /(amount)/
    })
        .fromFile(input)
        .subscribe((json) => {
            writable.write(JSON.stringify(json) + '\n')
        }, onError)
}

run()
