import * as Expr from './expr';
import { TokenType } from './tokentype';

export class Interpreter implements Expr.Visitor<Object> {
    visitLiteralExpr(expr: Expr.Literal): Object {
        return expr.value
    }

    visitGroupingExpr(expr: Expr.Grouping): Object {
        return this.evaluate(expr.expression)
    }

    visitUnaryExpr(expr: Expr.Unary): Object {
        var right: Object = this.evaluate(expr.right)
        switch (expr.operator.type) {
            case TokenType.MINUS:
                return expr.right.value as number;
        }

        return Object(null);
    }

    evaluate(expr: Expr.Expr): any{
        return expr.accept()
    }
}

