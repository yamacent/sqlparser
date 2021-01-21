import { Position } from "./common";
import Tokenizer, { Token } from "./tokenizer";

interface Node {
  type: string
  from: Position
  to: Position
}

interface Select extends Node {
  type: 'select'
  columns: QualifiedIdentifier[]
}

interface From extends Node {
  type: 'from'
  tables: string[]
}

interface QualifiedIdentifier extends Node {
  type: 'QualifiedIdentifier'
  identifiers: string[]
}

export default class Parser {
  tokens: Token[]

  private pos: number = 0

  constructor(code: string) {
    const tokenizer = new Tokenizer(code)
    this.tokens = tokenizer.tokenize()
  }

  parse(): Node[] {
    const nodes: Node[] = []
    while (this.peek()) {
      const node = this.dispatch()
      if (node) {
        nodes.push(node)
      }
    }
    return nodes
  }

  private dispatch(): Node | null {
    const token = this.peek()
    if (!token) {
      return null
    }
    if (token.type === 'Keyword' && token.value === 'select') {
      const columns = this.handleSelect()
      return {
        type: 'select',
        columns,
        from: token.from,
        to: columns.length ? columns[columns.length - 1].to : token.to
      } as Select
    }
    if (token.type === 'Keyword' && token.value === 'from') {
      const tables = this.handleFrom()
      return {
        type: 'from',
        tables,
        from: { line: 1, col: 0 },
        to: { line: 1, col: 0 }
      } as From
    }
    throw new Error('unexpected token: ' + token.value)
  }

  private handleSelect() {
    this.next()
    const columns: QualifiedIdentifier[] = []
    let tmp: Token[] = []
    let token = this.peek()
    let from: Position
    let to: Position
    while (token && !this.isSelectEnd()) {
      if (token.type === 'Identifier') {
        tmp.push(token)
      }
      if (token.type === 'Period') {
      }
      if (token.type === 'Comma') {
        if (tmp.length) {
          columns.push({
            type: 'QualifiedIdentifier',
            identifiers: tmp.map(token => token.value),
            from: tmp[0].from,
            to: tmp[tmp.length - 1].to
          })
          tmp = []
        }
      }
      this.next()
      token = this.peek()
    }
    if (tmp.length) {
      columns.push({
        type: 'QualifiedIdentifier',
        identifiers: tmp.map(token => token.value),
        from: tmp[0].from,
        to: tmp[tmp.length - 1].to
      })
    }
    return columns
  }

  private handleFrom() {
    this.next()
    const tables: string[] = []
    let tmp: string[] = []
    let token = this.peek()
    while (token && !this.isFromEnd()) {
      if (token.type === 'Identifier') {
        tmp.push(token.value)
      }
      if (token.type === 'Period') {
      }
      if (token.type === 'Comma') {
        tables.push(tmp.join('.'))
        tmp = []
      }
      this.next()
      token = this.peek()
    }
    if (tmp.length) {
      tables.push(tmp.join('.'))
    }
    return tables
  }

  private isSelectEnd() {
    const token = this.peek()
    return !token || token.type === 'Keyword' && token.value === 'from'
  }

  private isFromEnd() {
    const token = this.peek()
    return !token || token.type === 'Keyword' && token.value === 'where'
  }

  private next() {
    return this.pos < this.tokens.length ? this.tokens[this.pos++] : null
  }

  private peek() {
    return this.pos < this.tokens.length ? this.tokens[this.pos] : null
  }
}
