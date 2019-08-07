ArrayBuffer.concat = function (list, length) {
  if (!Array.isArray(list)) {
    throw new Error('Usage: Buffer.concat(list, length)')
  }

  if (list.length === 0) {
    return new ArrayBuffer(0);
  } else if (list.length === 1) {
    return list[0]
  }

  if (typeof length !== 'number') {
    length = 0
    for (let i = 0; i < list.length; i++) {
      const buf = array[i];
      length += buf.length
    }
  }

  const buffer = new buffer(length)
  let pos = 0
  for (let i = 0; i < list.length; i++) {
    const buf = list[i];
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}