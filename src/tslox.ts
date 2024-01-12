/**
 * This is a typescript lox interpreter from the book Crafting Interpreters
 * by Robert Nystrom
 * 
 * modified to typescript by me :).
 */

import * as fs from 'fs';
import * as readLine from 'readline';

import { Scanner } from './scanner';

/**
 * Entry point for the lox interpreter
 * 
 * @param args command line args. atm just file path.
 */
function main(args: string[]) {
    if (args.length > 1) {
        console.log("Usage: npm run tslox [script]");
        process.exit(64);
    } else if (args.length == 1) {
        // console.log("This will run the specified script file");
        runFile(args[0]);
    } else {
        runPrompt();
    }
}

/**
 * Runs the file given in path.
 * 
 * @param path path to script file
 */
async function runFile(path: string){
    var file = await fs.readFileSync(path, 'utf-8');
    console.log(file);
}

function runPrompt(){
    const rl = readLine.createInterface({ input: process.stdin, output: process.stdout });
    rl.setPrompt("> ");
    rl.prompt();
    rl.on("line", (input) => {
        // console.log(input);
        run(input);
        rl.prompt();
    }) // can prepend this maybe to show errors or something.
}

function run (source: string) {
    var scanner: Scanner = new Scanner(source);
    var tokens = scanner.scanTokens();

    for (var token in tokens) {
        console.log(token);
    }
}

function error(line: number, ) {

}

main(process.argv.slice(2));