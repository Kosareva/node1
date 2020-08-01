const {pipeline, Transform} = require('stream')
const {StringDecoder} = require('string_decoder')
const readable = process.stdin
const writable = process.stdout

class Reverse extends Transform {
    constructor(options) {
        super(options)
        this._decoder = new StringDecoder('utf-8')
    }

    _transform(chunk, encoding, callback) {
        if (encoding === 'buffer') {
            chunk = this._decoder.write(chunk)
        }
        chunk = chunk.split('').reverse().join('')
        callback(null, chunk)
    }
}

pipeline(
    readable,
    new Reverse(),
    writable,
    err => {
        if (err) {
            console.log('Pipeline failed: ')
        } else {
            console.log('Pipeline succeeded.')
        }
    }
)
