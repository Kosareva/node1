const fs = require("fs")
const path = require("path")
const csv = require("csvtojson")
const {once} = require('events');
const input = path.join(__dirname, '/csv/task1_input.csv')
const output = path.join(__dirname, '/csv/task1_input.txt')
const readable = fs.createReadStream(input)
const writable = fs.createWriteStream(output)
const lineReader = require("readline").createInterface({
    input: readable
})
const headers = [];

lineReader.on('line', (line) => {
    headers.push(...line.split(',').map(el => el.toLowerCase()))
    lineReader.close()
    lineReader.removeAllListeners()
});
writable.on('error', (e) => console.log('write error: ', e));

(async () => {
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
})()
