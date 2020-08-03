import {Reverse} from "./Reverse.mjs";
import {pipeline} from 'stream';

async function run() {
    pipeline(
        process.stdin,
        new Reverse(),
        process.stdout,
        err => {
            if (err) {
                console.log('Pipeline failed: ')
            } else {
                console.log('Pipeline succeeded.')
            }
        }
    )
}

run()
