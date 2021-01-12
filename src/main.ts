import tokenize from './tokenizer'

const code = `
  select * from foo.bar
`

console.log(tokenize(code))
