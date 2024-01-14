/**
 * Scanner defs.
*/

import { Token } from "./token"
import { TokenType } from "./tokentype"
import * as Error from './error'


export class Scanner {
    private readonly source: string
    private tokens: Token[] = new Array<Token>
    private start: number = 0
    private current: number = 0
    private line: number = 1       // since files start on line one duh

    constructor (source: string) {
        this.source = source
    }

    /**
     * scan all tokens in `this.source`
     * 
     * @returns Token[] - an array of tokens
     */
    public scanTokens(): Array<Token> {
        while (!this.isAtEnd()) {
            this.start = this.current
            this.scanToken()
        }
        this.tokens.push(new Token(TokenType.EOF, "", null, this.line))
        return this.tokens
    }
     
    /**
     * Scan the current token and advance one character
     */
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
                this.addToken(this.match('=') ? TokenType.BANG_EQUAL : TokenType.BANG)
                break
            case '=':
                this.addToken(this.match('=') ? TokenType.EQUAL_EQUAL : TokenType.EQUAL)
                break
            case '<':
                this.addToken(this.match('=') ? TokenType.LESS_EQUAL : TokenType.LESS)
                break
            case '>':
                this.addToken(this.match('=') ? TokenType.GREATER_EQUAL : TokenType.GREATER)
                break
            case '/': {
                if (this.match('/')) {
                    while (this.peek() != '\n' && !this.isAtEnd()) {
                        this.advance()
                    }
                } else {
                    this.addToken(TokenType.SLASH)
                }
                break;
            }
            case ' ': break
            case '\r': break
            case '\t':
                break
            case '\n':
                this.line = this.line + 1
                break
            case '"': this.string(); break;
            default: {
                if (this.isDigit(c)) {
                    this.number()
                } else if (this.isAlpha(c)) {
                    this.identifier()
                } else {
                    Error.error(this.line, "Unexpected character.")
                }
                break;
            }
        }
    }   

    /** 
     * Add an identifier literal
     */
    private identifier() {
        while(this.isAlphaNumeric(this.peek())) {
            this.advance();
        }

        this.addToken(TokenType.IDENTIFIER)
    }   

    /**
     * Adds a numeric literal.
     */
    private number() {
        while (this.isDigit(this.peek())){
            this.advance();
        }

        if (this.peek() == '.' && this.isDigit(this.peekNext())) {
            this.advance()

            while(this.isDigit(this.peek())) {
                this.advance();
            }
        }

        this.addTokenWithLiteral(TokenType.NUMBER, parseFloat(this.source.substring(this.start, this.current)))
    }   

    /**
     * adds a string literal, errors if unterminated
     * 
     * @returns void
     * 
     */
    private string () {
        while (this.peek() != '"' && !this.isAtEnd()) {
            if (this.peek() == "\n") this.line++;
            this.advance();
        }

        if (this.isAtEnd()) {
            Error.error(this.line, "Unterminated string.")
            return;
        }

        this.advance()
        
        var value: string = this.source.substring(this.start + 1, this.current - 1)
        this.addTokenWithLiteral(TokenType.STRING, value)

    }

    /**
     * checks if the current character matches the passed in value
     * @param expected string - expected value
     * @returns boolean - true if matched.
     */
    private match(expected: string): boolean {
        if (this.isAtEnd()) return false;
        if(this.source.charAt(this.current) != expected) return false;

        this.current++
        return true
    }

    /**
     * look at the current char
     * @returns the next character ahead
     */
    private peek(): string {
        if (this.isAtEnd()) {
            return '\0'
        }
        return this.source.charAt(this.current)
    }

    /**
     * look one char ahead.
     * @returns two characters ahead
     */
    private peekNext(): string {
        if (this.current + 1 >= this.source.length) {
            return '\0';
        }
        return this.source.charAt(this.current + 1);
    }

    private isAlpha(c: string) {
        return (c >= 'a' && c <= 'z') ||
                (c >= 'A' && c <= 'Z')  ||
                (c === '_')
    }

    private isAlphaNumeric(c: string) {
        return (this.isAlpha(c)) || (this.isDigit(c))
    }

    private isDigit(c: string): boolean {
        return c >= '0' && c <= '9'
    }

    /**
     * advance current by one and return the character under it.
     * @returns string - the next character
     */
    private advance(): string {
        return this.source.charAt(this.current++)
    }

    /**
     * adds a token without a literal
     * 
     * @param type TokenType
     */
    private addToken(type: TokenType) {
        this.addTokenWithLiteral(type, null)
    }

    /**
     * adds a token with the passed in literal type (null or value)
     * @param type TokenType
     * @param literal either null or a literal value
     */
    private addTokenWithLiteral(type: TokenType, literal: any | null) {
        var text: string = this.source.substring(this.start, this.current)
        this.tokens.push(new Token(type, text, literal, this.line))
    }

    /**
     * return true if at end of source file
     * @returns boolean
     */
    private isAtEnd(): boolean {
        return this.current >= this.source.length
    }
    
}
