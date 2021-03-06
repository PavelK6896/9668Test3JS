function noop() {} // пустая функция

class NewPromise {
    constructor(executor) {
        this.queue = [] // очередь
        this.errorHandler = noop
        this.finallyHandler = noop
        try {
            //bind(this) - чтобы не терялся контекст
            executor.call(null, this.onResolve.bind(this), this.onReject.bind(this))
        } catch (e) {
            this.errorHandler(e)
        } finally {
            this.finallyHandler()
        }
    }

    onResolve(data) {
        this.queue.forEach(callback => {
            data = callback(data) // модифицируем данные
        })
       this.finallyHandler() // всегда вызываем финал
    }

    onReject(error) {
        this.errorHandler(error)
        this.finallyHandler()
    }


    then(fn) {
        this.queue.push(fn) // в очередь ложем
        return this
    }

    catch(fn) {
        this.errorHandler = fn
        return this
    }

    finally(fn) {
        this.finallyHandler = fn
        return this
    }
}

const promise = new NewPromise((resolve, reject) => {
    setTimeout(() => {
         resolve('NgRx')
     //   reject('Some Error')
    }, 1500)
})
``
promise
    .then(course => course.toUpperCase())
    .then(title => console.log('Vladilen Promise:', title))
    .catch(err => console.log('Error:', err))
    .finally(() => console.log('Finally'))

module.exports = NewPromise