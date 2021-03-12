function co(target, value) {
  return new Promise((resolve, reject) => {
    try {
      // 无效参数直接返回
      if (target === undefined || target === null) {
        resolve()
        return 
      }

      // 普通函数和Generator函数都先执行，拿到执行结果再co
      if (isFunction(target)) {
        resolve(co(target()))
        return
      }

      if (isPromise(target)) {
        resolve(target.then(co, reject))
        return
      }

      if (isGenerator(target)) {
        var gen = target.next(value)
        
        if (gen.done) { // 如果已经结束，则返回结果
          if (isArray(gen.value)) { // 如果是数组则用Promise.all包一下
            resolve(Promise.all(gen.value))
            return
          }

          resolve(gen.value)
          return
        }
      
        resolve(co(target, gen.value)) // 否则再次执行co
        return
      }
    } catch(err) {
      reject(err)
    }
  })
}

function isFunction(target) {
  return typeof target === 'function'
}

function isPromise(target) {
  return typeof target.then === 'function'
}

function isGenerator(target) {
  return typeof target.next === 'function' && typeof target.throw === 'function'
}

function isArray(target) {
  return Array.isArray(target)
}

module.exports = co
