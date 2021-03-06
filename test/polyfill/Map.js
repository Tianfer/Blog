const map = new Map()
const key1 = {}
const key2 = {}

map.set(key1, 1)
map.set(key2, 2)
console.log(map.get(key2)) // 2
console.log(map.has(key2)) // true
console.log(map.get(key1) === map.get(key2)) // false
map.delete(key1)
console.log(map.get(key1)) // undefined
console.log(map.has(key1)) // false
console.log(map.clear())
console.log(map.has(key2)) // false

const map1 = new Map()
map1.set(key1, 1)
map1.set(key2, 2)
const map2 = new Map(map1)
console.log(map2.keys())
console.log(map2.values())
console.log(map2.entries())
console.log([...map2])
