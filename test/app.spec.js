const app = require('../src/app')

describe('App', () => {
    it('GET / responds with 200 conatining "Yo, yo..."', () => {
        return supertest(app)
            .get('/')
            .expect(200, 'Yo, yo...')
    })
})