const NewPromise = require('./promise')

const t = setTimeout

describe('new Promise: ', () => {

    let promise;
    let executorSpy;

    const successResult = 42
    const errorResult = 'I am error'

    beforeEach(() => { // хук запускаеться перед каждым тестом
        executorSpy = jest.fn(r => t(() => r(successResult), 150))
        promise = new NewPromise(executorSpy)
    })

    test('1should exists and ', () => {
        expect(NewPromise).toBeDefined() // определена
        expect(typeof NewPromise).toBe('function') // тип функция
    })

    test('2instance should have methods: then, catch, finally', () => { // у класса есть методы
        expect(promise.then).toBeDefined()
        expect(promise.catch).toBeDefined()
        expect(promise.finally).not.toBeUndefined()
    })

    test('3should call executor function', () => {
        expect(executorSpy).toHaveBeenCalled() // метод должен быть вызван
    })

    test('4should get data in then block and chain them', async () => { //
        const result = await promise.then(num => num).then(num => num * 2)
        expect(result).toBe(successResult * 2) // ожидаемое значение
    })

    test('should catch error', () => {
        const errorExecutor = (_, r) => t(() => r(errorResult), 150)
        const errorPromise = new NewPromise(errorExecutor)

        return new Promise(resolve => {
            errorPromise.catch(error => { // поймает ошибку
                expect(error).toBe(errorResult) // прокинутая ошибка
                resolve()
            })
        })
    })

    test('should call finally method', async () => {
        const finallySpy = jest.fn(() => {})
        await promise.finally(finallySpy) // ждем пока выполниться
        expect(finallySpy).toHaveBeenCalled() //ожидаем
    })

})