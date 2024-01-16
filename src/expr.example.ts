/** 
 * This is an example for comparison agains the test AST generation file.
*/
import { Token } from "./token";

/**
 * Expr base class defs, all expression classes inherit from this.
 * This is an example file for what it will look like.
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