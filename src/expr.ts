import { Token } from "./token";

/**
 * Expr base class defs, all expression classes inherit from this.
 */
export abstract class Expr { }


/**
 * Bianry base class.
 */
export class Binary extends Expr {
    readonly left: Expr;
    readonly operator: Token;
    readonly right: Expr;

    constructor(left: Expr, operator: Token, right: Expr) {
        super()
        this.left = left;
        this.operator = operator;
        this.right = right;
    }
}