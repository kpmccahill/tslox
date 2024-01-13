/**
 * Scanner defs.
*/

import { Token } from "./token"
import { TokenType } from "./tokentype"
import * as Error from './error'


export class Scanner {
    private readonly source: string
    private readonly tokens: Token[] = new Array<Token>
    private start: number = 0
    private current: number = 0
    private line: number = 1       // since files start on line one duh

    constructor (source: string) {
        this.source = source
    }

    public scanTokens(): Token[] {
        while (!this.isAtEnd()) {
            this.start = this.current
            this.scanToken()
        }
        this.tokens.push(new Token(TokenType.EOF, "", null, this.line))
        return this.tokens
    }

    private scanToken() {
        var c = this.advance();
        switch(c) {
            case '(': this.addToken(TokenType.LEFT_PAREN); break;
            case ')': this.addToken(TokenType.RIGHT_PAREN); break;
            case '{': this.addToken(TokenType.LEFT_BRACE); break;
            case '}': this.addToken(TokenType.RIGHT_BRACE); break;
            case ',': this.addToken(TokenType.COMMA); break;
            case '.': this.addToken(TokenType.DOT); break;
            case '-': this.addToken(TokenType.MINUS); break;
            case '+': this.addToken(TokenType.PLUS); break;
            case ';': this.addToken(TokenType.SEMICOLON); break;
            case '*': this.addToken(TokenType.STAR); break;
            case '!':
                    this.addToken(this.match("=") ? TokenType.BANG_EQUAL : TokenType.BANG);
            case '\r':
            case '\n':
                this.line++;
                break
            default:
                Error.error(this.line, "Unexpected character.")
                break

        }
    }

    private match(expected: string): boolean {
        if (this.isAtEnd()) return false;
        if(this.source.charAt(this.current) != expected) return false;

        this.current++
        return true
    }

    private advance(): string {
        return this.source.charAt(this.current++)
    }

    private addToken(type: TokenType) {
        this.addTokenWithLiteral(type, null)
    }

    private addTokenWithLiteral(type: TokenType, literal: any | null) {
        var text: string = this.source.substring(this.start, this.current)
        this.tokens.push(new Token(type, text, literal, this.line))
        console.log(this.tokens.pop())
    }

    private isAtEnd(): boolean {
        return this.current >= this.source.length
    }
    
}
