import * as path from "path"
import * as fs from "fs/promises"

import { ReaScriptUSDocML, Type } from "./reascript-USDocML.types"
import reascriptDocs from "./results.json"

interface NamespaceMethod {
  typescriptCode: string
  description?: string
}

interface NamespaceMap {
  [name: string]: NamespaceMethod[]
}

const LUA_TO_TS_MAP: Partial<Record<Type, string>> = {
  // TODO: Fix parsing of three-word types like "optional number countIn" in the parser
  [Type.Optional]: "any | 'optional'",
  [Type.String]: "string",
  [Type.Table]: "object",
  [Type.Number]: "number",
  [Type.Integer]: "number",
  [Type.Boolean]: "boolean",
}

const RESERVED_WORDS = [
  "await",
  "break",
  "case",
  "catch",
  "class",
  "const",
  "continue",
  "debugger",
  "default",
  "delete",
  "do",
  "else",
  "enum",
  "export",
  "extends",
  "false",
  "finally",
  "for",
  "function",
  "if",
  "implements",
  "import",
  "in",
  "instanceof",
  "interface",
  "let",
  "new",
  "null",
  "package",
  "private",
  "protected",
  "public",
  "return",
  "super",
  "switch",
  "static",
  "this",
  "throw",
  "try",
  "True",
  "typeof",
  "var",
  "void",
  "while",
  "with",
  "yield",
]

const isCustomReaperType = (type: Type) =>
  Boolean(LUA_TO_TS_MAP[type] == undefined)

const convertLuaTypeToTSType = (type: Type) =>
  isCustomReaperType(type) ? type : LUA_TO_TS_MAP[type]

const sanitizeIdentifier = (identifier: string | undefined) =>
  identifier && RESERVED_WORDS.includes(identifier)
    ? `_${identifier}`
    : identifier

async function main() {
  const reaperTypes = new Set<string>()
  const namespaces = {} as NamespaceMap

  const functions = reascriptDocs as ReaScriptUSDocML[]
  for (const fn of functions) {
    // If it's an array, it means it's empty
    if (Array.isArray(fn.signatures)) continue
    if (!fn.signatures.lua.method_name) continue

    const [namespace, method] = fn.signatures.lua.method_name.split(".")
    if (!namespaces[namespace]) namespaces[namespace] = []

    const params = []
    for (const param of fn.signatures.lua.parameters) {
      if (isCustomReaperType(param.type) && !reaperTypes.has(param.type)) {
        reaperTypes.add(param.type)
      }
      params.push(
        `${sanitizeIdentifier(param.identifier)}: ${convertLuaTypeToTSType(
          param.type
        )}`
      )
    }

    let definition = `function ${method}(` + params.join(", ") + `): `

    // void function
    if (fn.signatures.lua.return_values.length == 0) {
      definition += "void"
      // returns single value, no need for tuple
    } else if (fn.signatures.lua.return_values.length == 1) {
      definition += convertLuaTypeToTSType(
        fn.signatures.lua.return_values[0].type
      )
    } else {
      // returns a tuple of values, need to unpack and label them
      const retvals = []
      for (const retval of fn.signatures.lua.return_values) {
        const name = sanitizeIdentifier(retval.identifier)
        const type = convertLuaTypeToTSType(retval.type)
        retvals.push(`${name}: ${type}`)
      }
      definition += "MultiReturn<[" + retvals.join(", ") + "]>"
    }

    namespaces[namespace].push({
      typescriptCode: definition,
      description: fn.description.description.split("\n").join("\n\t*\n\t* "),
    })
  }

  let typedefs = `type REAPER<T extends string> = {
      type: T
      value: string
    }
    
  `

  for (const type of reaperTypes) {
    typedefs +=
      `type ${sanitizeIdentifier(type)} = REAPER<'${sanitizeIdentifier(
        type
      )}'>` + "\n"
  }

  for (const namespace in namespaces) {
    typedefs += `
    /** @noSelf **/
    declare namespace ${namespace} {

    `
    for (const method of namespaces[namespace]) {
      typedefs += `
      /** ${method.description} */
      ${method.typescriptCode}

      `
    }

    typedefs += "}" + "\n"
  }

  const outfile = path.join(__dirname, "./generated", "reaper-types.d.ts")
  await fs.writeFile(outfile, typedefs)
}

main()
