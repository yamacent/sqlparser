interface Position {
  line: number
  col: number
}

interface Token {
  type: string
  value: any
  from: Position
  to: Position
}

const keywords = new Set(['select', 'from'])

function isWhitespace(ch: string) {
  return [' ', '\n', '\t'].includes(ch)
}

function isNumber(ch: string) {
  return /[0-9]/.test(ch)
}

function isIdentifierStart(ch: string) {
  return /^[a-zA-Z_]$/.test(ch)
}

function isIdentifier(ch: string) {
  return /[a-zA-Z_0-9\-]/.test(ch)
}

function isKeyword(ident: string) {
  return keywords.has(ident.toLowerCase())
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
    if (isNumber(ch)) {
      return this.handleNumber()
    }
    if (isIdentifierStart(ch)) {
      return this.handleIdentifier()
    }
    if (['+', '-', '*', '/'].includes(ch)) {
      const from = this.getPos()
      this.next()
      return {
        type: 'Punc',
        value: ch,
        from,
        to: this.getPos()
      }
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
    const from = this.getPos()
    let s = ''
    this.next()
    let ch = this.next()
    while (ch) {
      if (ch === '"') {
        return {
          type: 'String',
          value: s,
          from,
          to: this.getPos()
        }
      }
      s += ch
      ch = this.next()
    }
    throw new Error("string doesn't terminate")
  }

  private handleNumber() {
    const from = this.getPos()
    let n = this.next()
    let ch = this.peek()
    while (ch && isNumber(ch)) {
      n += this.next()
      ch = this.peek()
    }
    return {
      type: 'Number',
      value: Number(n),
      from,
      to: this.getPos()
    }
  }

  private handleIdentifier() {
    const from = this.getPos()
    let s = this.next()
    let ch = this.peek()
    while (ch && isIdentifier(ch)) {
      s += this.next()
      ch = this.peek()
    }
    return {
      type: isKeyword(s) ? 'Keyword' : 'Identifier',
      value: s,
      from,
      to: this.getPos()
    }
  }

  private getPos(): Position {
    return {
      line: this.line,
      col: this.col
    }
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
