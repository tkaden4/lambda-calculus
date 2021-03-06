# lambda-calculus

An implementation of the lambda calculus inspired by [this](http://www.cse.chalmers.se/research/group/logic/TypesSS05/Extra/geuvers.pdf) paper and
[this](https://ryanflannery.net/research/logic-notes/Barendregt-LambdaCalculus-Chap1-5.pdf) paper.

[![Run on Repl.it](https://repl.it/badge/github/tkaden4/lambda-calculus)](https://repl.it/github/tkaden4/lambda-calculus)

## Example

```
; Identity function, or I combinator
(lambda x x)

; X combinator
(lambda x (x x))

; K combinator
(lambda x (lambda y x))

; K* combinator, or K(I)
(lambda x (lambda y y))

; application
((lambda x x)(lambda y y))
((lambda x x) y)
((lambda x x) (lambda x (lambda y x)))
```

## Usage

To get started, you can build the project and access an interactive REPL like so:

```
git clone https://github.com/tkaden4/lambda-calculus
cd lambda-calculus
yarn|npm install
node build
```
