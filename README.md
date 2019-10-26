# lambda-calculus

An implementation of the lambda calculus inspired by [this](http://www.cse.chalmers.se/research/group/logic/TypesSS05/Extra/geuvers.pdf) paper and
[this](https://ryanflannery.net/research/logic-notes/Barendregt-LambdaCalculus-Chap1-5.pdf) paper.

## Example

```
; All expressions must be within parentheses, i.e
(x. (x x))
; NOT
; (x. x x) or x. (x x) or x. x x

; The X combinator
(x.(x x))

; The constant function
(x.(y.x))

; The identity function
(x.x)
```

## Usage

To get started, you can build the project and access an interactive REPL like so:

```
git clone https://github.com/tkaden4/lambda-calculus
cd lambda-calculus
yarn install
node build
```
