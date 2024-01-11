import * as fs from 'node:fs';

export function main(args: Array<String>) {
    if (args.length > 1) {
        console.log("Usage: npm run tslox [script]");
        process.exit(64);
    } else if (args.length == 1) {
        console.log("This will run the specified script file");
    } else {
        console.log("This will launch an interactive session.");
    }
}

main(process.argv.slice(2));