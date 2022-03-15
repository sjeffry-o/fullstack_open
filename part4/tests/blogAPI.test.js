const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 5000)

test("blogs have 'id' parameter", async () => {
  await api
    .get('/api/blogs')
    .then(response => {
      //console.log(response._body)
      expect(response._body[0].id).toBeDefined()
    })
}, 5000)

/*test("POST request to '/api/blogs' is succesful", async () => {
  await api
    .post('/api/blogs')
    .send(
      {
        "title": "hey",
        "author": "Bradbury",
        "url": "definedeeee.com",
        "likes": 2
      }
    )
    .then(response => {
      console.log(response)
      //expect(response._body[response._body.length - 1]).toEqual(newBlog)
    })
    .expect(201)
    
}, 10000)*/

afterAll(() => {
  mongoose.connection.close()
})
