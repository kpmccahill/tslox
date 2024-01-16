/**
 * 'Pretty Print' an abstract syntax tree.
 */
import * as Expr from "./expr";
import { Token } from "./token";
import { TokenType } from "./tokentype";

class AstPrinter implements Expr.Visitor <string> {

    print( expr: Expr.Expr ): string {
        return expr.accept(this);
    }

    visitBinaryExpr(expr: Expr.Binary): string {
        return this.parenthesize(expr.operator.lexeme, expr.left, expr.right)
    }

    visitGroupingExpr(expr: Expr.Grouping): string {
        return this.parenthesize("group", expr.expression)
    }
    
    visitLiteralExpr(expr: Expr.Literal): string {
        if (expr.value === null) return "nil";
        return expr.value.toString()
    }

    visitUnaryExpr(expr: Expr.Unary): string {
        return this.parenthesize(expr.operator.lexeme, expr.right)
    }

    private parenthesize(name: string, ...exprs: Expr.Expr[]) {
        let str = ""
        str += `(${name}`

        for (var expr in exprs) {
            str += ` ${exprs[expr].accept(this)}`
        }
        str += ")"

        return str
    }
}

function main() {
    var expression: Expr.Expr = new Expr.Binary (
        new Expr.Unary(
            new Token(TokenType.MINUS, "-", null, 1),
            new Expr.Literal(123)
        ),
        new Token( TokenType.STAR, "*", null, 1),
        new Expr.Grouping(
            new Expr.Literal(45.67)
        )
    )

    console.log(new AstPrinter().print(expression))
}

main()