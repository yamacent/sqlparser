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
