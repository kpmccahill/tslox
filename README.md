# TsLox
This is a typescript implementation of the tree walk interpreter from the book Crafting Interpreters by Robert Nystrom.

### Usage
1. After cloning the repo, run `npm install`.
2. After the install has finished, run `tsc` from the root of the project. This will compile the typescript code.
3. After compilation has finished, the interactive intepreter can be run using `npm run tslox`. Alternatively, you can run a Lox file using `npm run tslox <filename>`

### Note on completion
This implementation is still in progress and is incomplete. At the time of writing this, a basic parser is wired up. 
However actual logical assignment has not been completed, so the language does not actually produce any code yet. However if you are interested you can see the underlying tree
if a valid expression or statement has been passed in.
