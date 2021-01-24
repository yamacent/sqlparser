import Parser from '../parser'

const dummyPos = { line: 1, col: 0 }

test('select', () => {
  const code = ` select foo, bar.baz `
  const parser = new Parser(code)
  expect(parser.parse()).toStrictEqual([
    {
      type: 'select',
      columns: [
        {
          type: 'QualifiedIdentifier',
          identifiers: [
            'foo'
          ],
          from: { line: 1, col: 8 },
          to: { line: 1, col: 11 },
        },
        {
          type: 'QualifiedIdentifier',
          identifiers: [
            'bar',
            'baz'
          ],
          from: { line: 1, col: 13 },
          to: { line: 1, col: 20 },
        },
      ],
      from: { line: 1, col: 1 },
      to: { line: 1, col: 20 }
    }
  ])
})

test('from', () => {
  const code = ` from foo, bar.baz `
  const parser = new Parser(code)
  expect(parser.parse()).toStrictEqual([
    {
      type: 'from',
      tables: [
        {
          type: 'QualifiedIdentifier',
          identifiers: [
            'foo'
          ],
          from: { line: 1, col: 6 },
          to: { line: 1, col: 9 },
        },
        {
          type: 'QualifiedIdentifier',
          identifiers: [
            'bar',
            'baz'
          ],
          from: { line: 1, col: 11 },
          to: { line: 1, col: 18 },
        },
      ],
      from: { line: 1, col: 1 },
      to: { line: 1, col: 18 }
    }
  ])
})

test('paren', () => {
  const code = ` (select foo from (select))  `
  const parser = new Parser(code)
  expect(parser.parse()).toStrictEqual([
    {
      "type": "Paren",
      "from": {
        "col": 0,
        "line": 1,
      },
      "to": {
        "col": 0,
        "line": 1,
      },
      "nodes": [
        {
          "type": "Keyword",
          "value": "select",
          "from": {
            "col": 2,
            "line": 1,
          },
          "to": {
            "col": 8,
            "line": 1,
          }
        },
        {
          "type": "Identifier",
          "value": "foo",
          "from": {
            "col": 9,
            "line": 1,
          },
          "to": {
            "col": 12,
            "line": 1,
          }
        },
        {
          "type": "Keyword",
          "value": "from",
          "from": {
            "col": 13,
            "line": 1,
          },
          "to": {
            "col": 17,
            "line": 1,
          }
        },
        {
          "type": "Paren",
          "from": {
            "col": 0,
            "line": 1,
          },
          "to": {
            "col": 0,
            "line": 1,
          },
          "nodes": [
            {
              "type": "Keyword",
              "value": "select",
              "from": {
                "col": 19,
                "line": 1,
              },
              "to": {
                "col": 25,
                "line": 1,
              },
            },
          ],
        },
      ]
    }
  ])
})
