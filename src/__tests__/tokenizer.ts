import Tokenizer from '../tokenizer'

test('tokenizer', () => {
  const code = `  "hoge"   `
  const tokenizer = new Tokenizer(code)
  expect(tokenizer.tokenize()).toStrictEqual([
    {
      type: 'String',
      value: 'hoge',
      pos: {
        line: 1,
        col: 8
      }
    }
  ])
})
