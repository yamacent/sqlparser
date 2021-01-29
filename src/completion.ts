import { Position } from "./common";
import Parser from "./parser";

export function complete(code: string, pos: Position) {
  const parser = new Parser(code)
  const nodes = parser.parse()
  console.log(nodes)
}

/*
Tables
  - emp (id, first, last, deptId, role)
  - dept (id, name)

select | from emp
=> id, first, last, deptId, role

{
  type: Prog,
  pos,
  nodes: [
    {
      type: Select,
      pos,
      nodes: []
    },
    {
      type: From,
      pos,
      nodes: [
        {
          type: Ident,
          pos,
          val: emp
        }
      ]
    }
  ]
}

select from |
=> emp, dept

{
  type: Prog,
  pos,
  nodes: [
    {
      type: Select,
      pos,
      nodes: []
    },
    {
      type: From,
      pos,
      nodes: []
    }
  ]
}

select | from emp e join dept d on e.deptId = d.id
=> id, first, last, deptId, role, id, name

{
  type: Prog,
  pos,
  nodes: [
    {
      type: Select,
      pos,
      nodes: []
    },
    {
      type: From,
      pos,
      nodes: {
        type: Inner Join,
        pos,
        left: {
          type: AliacedValue,
          pos,
          val: {
            type: Ident,
            pos,
            val: emp
          },
          alias: e
          {
          type: AliacedValue,
          pos,
          val: {
            type: Ident,
            pos,
            val: emp
          },
          alias: e
        },
        right: {
          type: AliacedValue,
          pos,
          val: {
            type: Ident,
            pos,
            val: dept
          },
          alias: d
          {
          type: AliacedValue,
          pos,
          val: {
            type: Ident,
            pos,
            val: dept
          },
          alias: d
        },
        condition: {
          type: Expression,
          val: {
            type: Comparison,
            left: {
              type: QualifiedIdent,
              idents: [
                {
                  type: Ident,
                  val: e
                },
                {
                  type: Ident,
                  val: deptId
                }
              ]
            },
            right: {
              type: QualifiedIdent,
              idents: [
                {
                  type: Ident,
                  val: d
                },
                {
                  type: Ident,
                  val: id
                }
              ]
            }
          }
        }
      }
    }
  ]
}

select abs(1 + 2)

{
  type: Prog,
  pos,
  nodes: [
    {
      type: Select,
      pos,
      nodes: [
        {
          type: FunctionCall,
          callee: {
            type: Ident,
            val: abs
          },
          params: [
            {
              type: +,
              left: {
                type: Number,
                val: 1
              },
              right: {
                type: Number,
                val: 2
              }
            }
          ]
        }
      ]
    }
  ]
}

select d.| from emp e join dept d on e.deptId = d.id
=> id, name

{
  type: Prog,
  pos,
  nodes: [
    {
      type: Select,
      pos,
      nodes: [
        {
          type: QualifiedIdent,
          idents: [
            {
              type: Ident,
              val: d
            },
          ]
        },
      ]
    },
    {
      type: From,
      pos,
      nodes: {
        type: Inner Join,
        pos,
        left: {
          type: AliacedValue,
          pos,
          val: {
            type: Ident,
            pos,
            val: emp
          },
          alias: e
          {
          type: AliacedValue,
          pos,
          val: {
            type: Ident,
            pos,
            val: emp
          },
          alias: e
        },
        right: {
          type: AliacedValue,
          pos,
          val: {
            type: Ident,
            pos,
            val: dept
          },
          alias: d
          {
          type: AliacedValue,
          pos,
          val: {
            type: Ident,
            pos,
            val: dept
          },
          alias: d
        },
        condition: {
          type: Expression,
          val: {
            type: Comparison,
            left: {
              type: QualifiedIdent,
              idents: [
                {
                  type: Ident,
                  val: e
                },
                {
                  type: Ident,
                  val: deptId
                }
              ]
            },
            right: {
              type: QualifiedIdent,
              idents: [
                {
                  type: Ident,
                  val: d
                },
                {
                  type: Ident,
                  val: id
                }
              ]
            }
          }
        }
      }
    }
  ]
}

select | from (select 123 as foo, 456 as bar)
=> foo, bar

{
  type: Prog,
  pos,
  nodes: [
    {
      type: Select,
      pos,
      nodes: []
    },
    {
      type: From,
      pos,
      sub: {
        type: Prog,
        pos
        nodes: [
          {
            type: Select,
            pos,
            nodes: [
              {
                type: AliacedValue,
                pos,
                val: {
                  type: Number,
                  val: 123
                },
                alias: foo
              },
              {
                type: AliacedValue,
                pos,
                val: {
                  type: Number,
                  val: 456
                },
                alias: bar
              },
            ]
          }
        ]
      }
    }
  ]
}

select | from (select * from dept)
=> id, name

select | from (select id from dept)
=> id

with w1 as (
  select * from |
)
=> emp, dept

with w1 as (
  select 'foo' as foo
)
select * from |
=> w1, emp, dept

with w1 as (
  select 'foo' as foo
)
select | from w1
=> foo

codntion, case, union, expression, function call, comparison
*/
