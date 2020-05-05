let cache = []
function deepClone(source) {
  if (source instanceof Object) {
    let cacheDist = findCache(source)
    if (cacheDist) {
      console.log('有缓存');
      return cacheDist
    } else {
      console.log('灭荒村');
      let dist
      if (source instanceof Array) {
        dist = new Array()
      } else if (source instanceof Function) {
        dist = function () {
          return source.apply(this, arguments)
        }
      } else {
        dist = new Object()
      }
      
      cache.push([source, dist])

      for (let key in source) {
        dist[key] = deepClone(source[key])
      }
      
      return dist
    }
  }
  return source
}

function findCache(source) {
  for (let i = 0; i < cache.length; i++) {
    if(cache[i][0] === source) {
      return cache[i][1]
    }
  }
}

module.exports = deepClone
