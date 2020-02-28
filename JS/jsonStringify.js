function jsonStringify(obj) {
  if (!arguments.length || typeof obj === "function") {
    return
  }

  let type = typeof obj;

  if (type !== "object" || obj === null) {
    return String(type === "string" ? `"${obj}"` : obj)
  }

  let json = []
  let isArr = Array.isArray(obj)

  for (let k in obj) {
    let v = obj[k];
    let type = typeof v;

    if (type === 'undefined') {
      if (!isArr) {
        break
      }
      v = "null"
    }
    if (type === 'string') {
      v = `"${v}"`
    } 
    if (type === "object") {
      v = jsonStringify(v);
    }

    json.push((isArr ? "" : `"${k}":`) + String(v));
  }
  return isArr ? `[${String(json)}]` : `{${String(json)}}`
}

jsonStringify({
  x: 5
}) // "{"x":5}"
jsonStringify([1, "false", false]) // "[1,"false",false]"
jsonStringify({
  b: undefined
}) // "{"b":"undefined"}"