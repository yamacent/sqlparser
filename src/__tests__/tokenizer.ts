import Tokenizer from '../tokenizer'

test('string', () => {
  const code = `  "hoge"   `
  const tokenizer = new Tokenizer(code)
  expect(tokenizer.tokenize()).toStrictEqual([
    {
      type: 'String',
      value: 'hoge',
      from: {
        line: 1,
        col: 2
      },
      to: {
        line: 1,
        col: 8
      }
    }
  ])
})

test('number', () => {
  const code = `  123   `
  const tokenizer = new Tokenizer(code)
  expect(tokenizer.tokenize()).toStrictEqual([
    {
      type: 'Number',
      value: 123,
      from: {
        line: 1,
        col: 2
      },
      to: {
        line: 1,
        col: 5
      }
    }
  ])
})

test('identifier', () => {
  const code = `  foo_select   `
  const tokenizer = new Tokenizer(code)
  expect(tokenizer.tokenize()).toStrictEqual([
    {
      type: 'Identifier',
      value: 'foo_select',
      from: {
        line: 1,
        col: 2
      },
      to: {
        line: 1,
        col: 12
      }
    }
  ])
})

test('keyword', () => {
  const code = `  select   `
  const tokenizer = new Tokenizer(code)
  expect(tokenizer.tokenize()).toStrictEqual([
    {
      type: 'Keyword',
      value: 'select',
      from: {
        line: 1,
        col: 2
      },
      to: {
        line: 1,
        col: 8
      }
    }
  ])
})

test('operator', () => {
  const code = `  *   `
  const tokenizer = new Tokenizer(code)
  expect(tokenizer.tokenize()).toStrictEqual([
    {
      type: 'Operator',
      value: '*',
      from: {
        line: 1,
        col: 2
      },
      to: {
        line: 1,
        col: 3
      }
    }
  ])
})

test('left paren', () => {
  const code = `  (   `
  const tokenizer = new Tokenizer(code)
  expect(tokenizer.tokenize()).toStrictEqual([
    {
      type: 'LParen',
      value: '(',
      from: {
        line: 1,
        col: 2
      },
      to: {
        line: 1,
        col: 3
      }
    }
  ])
})

test('right paren', () => {
  const code = `  )   `
  const tokenizer = new Tokenizer(code)
  expect(tokenizer.tokenize()).toStrictEqual([
    {
      type: 'RParen',
      value: ')',
      from: {
        line: 1,
        col: 2
      },
      to: {
        line: 1,
        col: 3
      }
    }
  ])
})

test('comma', () => {
  const code = `  ,   `
  const tokenizer = new Tokenizer(code)
  expect(tokenizer.tokenize()).toStrictEqual([
    {
      type: 'Comma',
      value: ',',
      from: {
        line: 1,
        col: 2
      },
      to: {
        line: 1,
        col: 3
      }
    }
  ])
})

test('statement', () => {
  const code = `select *
from foo.bar`
  const tokenizer = new Tokenizer(code)
  expect(tokenizer.tokenize()).toStrictEqual([
    {
      type: 'Keyword',
      value: 'select',
      from: {
        line: 1,
        col: 0
      },
      to: {
        line: 1,
        col: 6
      }
    },
    {
      type: 'Operator',
      value: '*',
      from: {
        line: 1,
        col: 7
      },
      to: {
        line: 1,
        col: 8
      }
    },
    {
      type: 'Keyword',
      value: 'from',
      from: {
        line: 2,
        col: 0
      },
      to: {
        line: 2,
        col: 4
      }
    },
    {
      type: 'Identifier',
      value: 'foo',
      from: {
        line: 2,
        col: 5
      },
      to: {
        line: 2,
        col: 8
      }
    },
    {
      type: 'Period',
      value: '.',
      from: {
        line: 2,
        col: 8
      },
      to: {
        line: 2,
        col: 9
      }
    },
    {
      type: 'Identifier',
      value: 'bar',
      from: {
        line: 2,
        col: 9
      },
      to: {
        line: 2,
        col: 12
      }
    }
  ])
})
