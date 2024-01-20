import { Token } from "./token";
import { TokenType } from "./tokentype";
import {
    Expr,
    Binary,
    Grouping,
    Literal,
    Unary,
} from "./expr";

export class Parser {
    private readonly tokens: Token[];
    private current: number = 0;

    constructor(tokens: Token[]) {
        this.tokens = tokens
    }

    private expression(): Expr {
        return this.equality()
    }

    private equality(): Expr {
        var expr: Expr = this.comparison()

        while(this.match(TokenType.BANG_EQUAL, TokenType.EQUAL_EQUAL)) {
            var operator: Token = this.previous()
            var right: Expr = this.comparison()
            expr = new Binary(expr, operator, right)
        }

        return expr
    }

    private match(...types: TokenType[]): boolean {
        for (const type of types) {
            if (this.check(type)) {
                this.advance();
                return true;
            }
        }
        return false;
    }

    private check(...types: TokenType[]): boolean {
        if (this.isAtEnd()){ return false };
        return (this.peek().type == true);
    }