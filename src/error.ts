import { Token } from "./token";
import { TokenType } from "./tokentype";

var hadError = false;

export function error(line: number, message: string) {
    report(line, "", message);
}

export function parserError(token: Token, message: string) {
    if (token.type === TokenType.EOF) {
        report(token.line, " at end", message)
    } else {
        report(token.line, " at '" + token.lexeme + "'", message)
    }
}

export function report(line: number, where: string, message: string) {
    console.log("[line " + line + "] Error" + where + ": " + message)
    hadError = true;
}

export function setHadError(e: boolean) {
    hadError = e
}

export function getHadError(): boolean {
    return hadError
}