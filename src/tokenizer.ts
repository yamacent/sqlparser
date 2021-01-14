interface Token {
  type: string
  value: any
  pos: {
    line: number
    col: number
  }
}

function isWhitespace(ch: string) {
  return [' ', '\n', '\t'].includes(ch)
}

export default class Tokenizer {
  private line: number = 1
  private col: number = 0

  private pos: number = 0

  constructor(private code: string) {}

  tokenize(): Token[] {
    const r: Token[] = []
    while (this.peek()) {
      const token = this.dispatch()
      if (token) r.push(token)
    }
    return r
  }

  private dispatch(): Token | null {
    const ch = this.peek()
    if (isWhitespace(ch)) {
      this.skipWhitespace()
      return null
    }
    if (ch === '"') {
      return this.handleString()
    }
    return null
  }

  private skipWhitespace() {
    let ch = this.peek()
    while (ch && isWhitespace(ch)) {
      this.next()
      ch = this.peek()
    }
  }

  private handleString(): Token {
    let s = ''
    this.next()
    let ch = this.next()
    while (ch) {
      if (ch === '"') {
        return {
          type: 'String',
          value: s,
          pos: {
            line: this.line,
            col: this.col
          }
        }
      }
      s += ch
      ch = this.next()
    }
    throw new Error("string doesn't terminate")
  }

  private next() {
    const ch = this.code.charAt(this.pos++)
    if (ch === '\n') {
      this.line++
      this.col = 0
    } else {
      this.col++
    }
    return ch
  }

  private peek() {
    return this.code.charAt(this.pos)
  }
}
