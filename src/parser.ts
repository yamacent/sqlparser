import Tokenizer, { Token } from "./tokenizer";

interface Query {
  select: string[]
  from: string[]
}

export default class Parser {
  tokens: Token[]

  private pos: number = 0

  constructor(code: string) {
    const tokenizer = new Tokenizer(code)
    this.tokens = tokenizer.tokenize()
  }

  parse(): Query[] {
    const queries: Query[] = []
    while (this.peek()) {
      this.dispatch()
    }
    return []
  }

  private dispatch() {
    const token = this.peek()
    if (!token) {
      return
    }
    if (token.type === 'Keyword' && token.value === 'select') {
      const columns = this.handleSelect()
      console.log(columns)
    }
    throw new Error('unexpected token: ' + token.value)
  }

  private handleSelect() {
    this.next()
    const columns: string[] = []
    let tmp: string[] = []
    let token = this.peek()
    while (token && !this.isSelectEnd()) {
      if (token.type === 'Identifier') {
        tmp.push(token.value)
      }
      if (token.type === 'Period') {
      }
      if (token.type === 'Comma') {
        columns.push(tmp.join('.'))
        tmp = []
      }
      this.next()
      token = this.peek()
    }
    if (tmp.length) {
      columns.push(tmp.join('.'))
    }
    return columns
  }

  private isSelectEnd() {
    const token = this.peek()
    return !token || token.type === 'Keyword' && token.value === 'from'
  }

  private next() {
    return this.pos < this.tokens.length ? this.tokens[this.pos++] : null
  }

  private peek() {
    return this.pos < this.tokens.length ? this.tokens[this.pos] : null
  }
}
