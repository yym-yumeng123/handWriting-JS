import * as chai from "chai"
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai';
chai.use(sinonChai)
const assert = chai.assert

import Promise from "../src/promise"

// 描述
describe("Promise", () => {
  it("是一个类", () => {
    assert.isFunction(Promise)
    assert.isObject(Promise.prototype)
  })

  it("new Promise() 必须接受一个函数", () => {
    assert.throw(() => {
      // @ts-ignore
      new Promise()
    })
    assert.throw(() => {
      // @ts-ignore
      new Promise("42")
    })
  })

  it("new Promise(fn) 会生成一个对象, 对象有 then 方法", () => {
    const promise = new Promise(() => {})
    assert.isFunction(promise.then)
  })

  it('new Promise(fn) 中的 fn 会立即执行', () => {
    let fn = sinon.fake()
    new Promise(fn)
    assert(fn.called)
  });
  
  // done 运行结束才执行
  it('new Promise(fn) 中的 fn 执行时 接收 resolve 和 reject 两个函数', done => {
    const promise = new Promise((resolve, reject) => {
      assert.isFunction(resolve)
      assert.isFunction(reject)
      done()
    })
  });
  
  it('promise.then(success) 中的 success 会在 resolve被调用的时候执行 ', done => {
    const success = sinon.fake()
    const promise = new Promise((resolve, reject) => {
      assert.isFalse(success.called)
      resolve()
      setTimeout(() => {
        assert.isTrue(success.called)
        done()
      })
    })

    promise.then(success, () => {})
  });
  
})
