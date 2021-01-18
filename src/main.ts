import Parser from './parser'

const code = `
  select xxx.yyy, zzz from foo.bar
`

new Parser(code).parse()
