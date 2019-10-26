# lambda-calculus

An implementation of the lambda calculus inspired by [this](http://www.cse.chalmers.se/research/group/logic/TypesSS05/Extra/geuvers.pdf) paper and
[this](https://ryanflannery.net/research/logic-notes/Barendregt-LambdaCalculus-Chap1-5.pdf) paper.

## Example

```
; The X combinator
(x.(x x))

; The constant function
(x.(y.x))

; The identify function
(x.x)
```

## Evaluation
