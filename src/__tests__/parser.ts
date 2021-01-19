import Parser from '../parser'

const dummyPos = { line: 1, col: 0 }

test('select', () => {
  const code = ` select foo, bar.baz `
  const parser = new Parser(code)
  expect(parser.parse()).toStrictEqual([
    {
      type: 'select',
      columns: ['foo', 'bar.baz'],
      from: dummyPos,
      to: dummyPos
    }
  ])
})
