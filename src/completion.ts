import { Position } from "./common";
import Parser from "./parser";

export function complete(code: string, pos: Position) {
  const parser = new Parser(code)
  const nodes = parser.parse()
  console.log(nodes)
}
