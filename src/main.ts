import { complete } from './completion'

const code = `
  select xxx.yyy, zzz, | from foo.bar
`
const pos = {
  line: code.split('\n').findIndex(s => s.includes('|')) + 1,
  col: code.split('\n').find(s => s.includes('|'))?.indexOf('|') ?? -1
}

complete(code.replace('|', ''), pos)
