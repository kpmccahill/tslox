/**
 * This is a typescript lox interpreter from the book Crafting Interpreters
 * by Robert Nystrom
 * 
 * modified to typescript by me :).
 */

import * as fs from 'fs';
import * as readLine from 'readline';

import { Scanner } from './scanner';
import * as Error from './error'
import { Token } from './token';
import { Parser } from './parser';
import { Expr } from './expr';
import { AstPrinter } from './astprinter';

// var hadError = false;

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
function runFile(path: string){
    var file = fs.readFileSync(path, 'utf-8');
    run(file);
    if (Error.getHadError() === true){
        process.exit(65);
    }
}

function runPrompt(){
    const rl = readLine.createInterface({ input: process.stdin, output: process.stdout });
    rl.setPrompt("> ");
    rl.prompt();
    rl.on("line", (input) => {
        // console.log(input);
        run(input);
        Error.setHadError(false);
        rl.prompt();
    }) // can prepend this maybe to show errors or something.
}

function run (source: string) {
    var scanner: Scanner = new Scanner(source);
    var tokens = scanner.scanTokens();
    var parser: Parser = new Parser(tokens)
    var expression: Expr = parser.parse()

    if (Error.getHadError()) {
        return
    }

    console.log(new AstPrinter().print(expression))
}

function error(line: number, message: string) {
    report(line, "", message);
}

function report(line: number, where: string, message: string) {
    console.log("[line " + line + "] Error" + where + ": " + message)
    Error.setHadError(true);
}

main(process.argv.slice(2));