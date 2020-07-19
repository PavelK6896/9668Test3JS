const  NewPromise = require('./promise')

describe('new Promise: ', () => {

    test('should exists and ', () =>{
        expect(NewPromise).toBeDefined() // определена
        expect(typeof NewPromise).toBe('function') // тип функция

    })
})