import { Expr, Binary, Literal, Grouping, Unary } from './expr';
import { TokenType } from './tokentype';

export class Interpreter implements Visitor<any> {
    visitLiteralExpr(expr: Literal): Object {
        return expr.value
    }

    visitGroupingExpr(expr: Grouping): any {
        return this.evaluate(expr.expression)
    }

    visitUnaryExpr(expr: Unary): any {
        var right = this.evaluate(expr.right)
        switch (expr.operator.type) {
            case TokenType.MINUS:
                return -right; // can probably get away with type casting here 
        }

        return Object(null);
    }

    evaluate(expr: Expr) {
        return expr.accept(expr)
    }
}

