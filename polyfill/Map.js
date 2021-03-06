function getIndex(keys, key) {
  if (key === key) { // 不是NaN
    return keys.findIndex((item) => item === key)
  }

  return keys.findIndex((item) => item !== item)
}

function Map(map) {
  this._keys = []
  this._values = []

  if (typeof map !== 'object') {
    return
  }

  for (let item of map) {
    if (typeof item !== 'object') {
      throw `${item} is not a object`
    }
    this._keys.push(item[0])
    this._values.push(item[1])
  }
}

Map.prototype = {
  [Symbol.iterator]() {
    const keys = this.keys()
    const values = this.values()
  
    return {
      next() {
        if (this._index < keys.length) {
          const index = this._index++
  
          return {
            value: [keys[index], values[index]],
            done: false,
          }
        }
  
        return { done: true }
      },
      _index: 0,
    }
  },
  set(key, value) {
    const index = getIndex(this._keys, key)
    if (index === -1) {
      this._keys.push(key)
      this._values.push(value)
      return
    }

    this._values[index] = value
  },
  get(key) {
    const index = getIndex(this._keys, key)
    return this._values[index]
  },
  clear() {
    this._keys = []
    this._values = []
  },
  delete(key) {
    const index = getIndex(this._keys, key)

    if (index === -1) {
      return false
    }

    this._keys.splice(index, 1)
    this._values.splice(index, 1)
  },
  has(key) {
    const index = getIndex(this._keys, key)

    return index !== -1
  },
  keys() {
    return this._keys.slice() // 浅拷贝，避免外部拿到_keys对其修改影响Map实例内部
  },
  values() {
    return this._values.slice() // 同上
  },
  entries() {
    return this._keys.map((key, index) => {
      return [key, this._values[index]]
    })
  },
  forEach(callback, thisArg) {
    if (typeof callback !== 'function') {
      return
    }
  
    const fn = thisArg ? callback.bind(thisArg) : callback
  
    for (let i = 0, l = this._keys.length; i < l; i++) {
      fn(this._keys[index], this._values[index], this)
    }
  }
}
