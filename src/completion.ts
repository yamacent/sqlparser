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

select | from emp e join dept d on e.deptId = d.id
=> id, first, last, deptId, role, id, name

select d.| from emp e join dept d on e.deptId = d.id
=> id, name

select | from (select 123 as foo, 456 as bar)
=> foo, bar

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
