let request = require('request')
describe('calc', () => {
    it('should multiply 2 and 2', () => {
        expect(2*2).toBe(4)
    })
})

describe('get messegs', () => {
    it('should return 200 ok', (done) => {
        request.get('http://localhost:5000/messages', (err, res) => {
            expect(res.statusCode).toEqual(200)
            done()
        })
    })

    it('should return a list, thats not empty', (done) => {
        request.get('http://localhost:5000/messages', (err, res) => {
            expect(res.body.length).toBeGreaterThan(40)
            done()
        })
    })
})

describe('get message from user', () => {
    it('should return 200 ok', (done) => {
        request.get('http://localhost:5000/messages/tung', (err, res) => {
            expect(res.statusCode).toEqual(200)
            done()
        })
    })
    it('name should be tung', (done) => {
        request.get('http://localhost:5000/messages/tung', (err, res) => {
            expect(JSON.parse(res.body)[0].name).toEqual('tung')
            done()
        })
    })
})