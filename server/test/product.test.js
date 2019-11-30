const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')
const { User, Product } = require('../models/index')



chai.use(chaiHttp)



before(done => {
    Product
        .deleteMany({}, () => {
            done()
        })
})

before(done => {
    User
        .deleteMany({}, () => {
            done()
        })
})


after(done => {
    Product
        .deleteMany({}, () => {
            done()
        })
})

after(done => {
    User
        .deleteMany({}, () => {
            done()
        })
})
let adminToken = ''
let userToken = ''
let fakeToken = 'iniAd4lahf4keTok3n'
let idProduct = ''






describe('Product tests', function () {
    describe('GET /product', function (err, res) {
        it('should send an array with 200 status code', function (done) {
            chai
                .request(app)
                .get('/product')
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('array')
                    done()
                })
        })
    })

    describe('POST /product', function (err, res) {
        describe('Success POST /product', function (err, res) {

            it('should send an object of inserted User with 201 status code', function (done) {
                const newUser = {
                    name: 'muhammad rifky ilyas',
                    email: 'rifky@gmail.com',
                    password: '1234567',
                    address: 'jl, h. agus salim bekasi',
                    role: 'admin'
                };//register admin
                chai
                    .request(app)
                    .post('/user/rahasia/hidden/abcdefhijkl/adminregister')
                    .send(newUser)
                    .end(function (err, res) {
                        expect(err).to.be.null;
                        expect(res).to.have.status(201)
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.property('_id')
                        expect(res.body).to.have.property('name')
                        expect(res.body).to.have.property('email')
                        expect(res.body).to.have.property('password')
                        expect(res.body).to.have.property('address')
                        expect(res.body).to.have.property('role')
                        expect(res.body.name).to.equal(newUser.name);
                        expect(res.body.email).to.equal(newUser.email);
                        expect(res.body.address).to.equal(newUser.address);
                        done()
                    })
            })

            //login as admin


            it('should send an object of inserted User with 200 status code', function (done) {
                const loginUser = {
                    email: 'rifky@gmail.com',
                    password: '1234567',
                };
                chai
                    .request(app)
                    .post('/user/login')
                    .send(loginUser)
                    .end(function (err, res) {
                        expect(err).to.be.null;
                        expect(res).to.have.status(200)
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.property('access_token')
                        expect(res.body).to.have.property('name')
                        adminToken = res.body.access_token
                        //set token
                        done()
                    })
            })

            //login as customer
            it('should send an object of inserted User with 201 status code', function (done) {
                const newUser = {
                    name: 'muhammad rifky ilyas',
                    email: 'rifkycustomer@gmail.com',
                    password: '1234567',
                    address: 'jl, h. agus salim bekasi',
                };
                chai
                    .request(app)
                    .post('/user/register')
                    .send(newUser)
                    .end(function (err, res) {
                        expect(err).to.be.null;
                        expect(res).to.have.status(201)
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.property('_id')
                        expect(res.body).to.have.property('name')
                        expect(res.body).to.have.property('email')
                        expect(res.body).to.have.property('password')
                        expect(res.body).to.have.property('address')
                        expect(res.body).to.have.property('role')
                        expect(res.body.name).to.equal(newUser.name);
                        expect(res.body.email).to.equal(newUser.email);
                        expect(res.body.address).to.equal(newUser.address);
                        done()
                    })
            })

            it('should send an object of inserted User with 200 status code', function (done) {
                const loginUser = {
                    email: 'rifkycustomer@gmail.com',
                    password: '1234567',
                };
                chai
                    .request(app)
                    .post('/user/login')
                    .send(loginUser)
                    .end(function (err, res) {
                        expect(err).to.be.null;
                        expect(res).to.have.status(200)
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.property('access_token')
                        expect(res.body).to.have.property('name')
                        userToken = res.body.access_token
                        done()

                    })
            })

            it('should send an object of inserted product with 201 status code', function (done) {
                const newProduct = {
                    name: 'kue',
                    quantity: 20,
                    image: 'blabal.jpeg',
                    price: 20000,
                };
                chai
                    .request(app)
                    .post('/product')
                    .send(newProduct)
                    .set({
                        access_token: adminToken
                    })
                    .end(function (err, res) {
                        expect(err).to.be.null;
                        expect(res).to.have.status(201)
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.property('_id')
                        expect(res.body).to.have.property('name')
                        expect(res.body).to.have.property('quantity')
                        expect(res.body).to.have.property('image')
                        expect(res.body).to.have.property('price')
                        expect(res.body.name).to.equal(newProduct.name);
                        expect(res.body.quantity).to.equal(newProduct.quantity);
                        expect(res.body.image).to.equal(newProduct.image);
                        expect(res.body.price).to.equal(newProduct.price);
                        productId = res.body._id
                        done()
                    })
            })
        })

        describe('Error Post /product', function (err, res) {
            it('should send error message "nama tidak boleh kosong', function (done) {
                const newProduct = {
                    quantity: 20,
                    image: 'blabal.jpeg',
                    price: 20000,
                };
                chai
                    .request(app)
                    .post('/product')
                    .set({
                        access_token: adminToken
                    })
                    .send(newProduct)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.property('msg')
                        expect(res.body.msg).to.equal('nama tidak boleh kosong')
                        done()
                    })
            })

            it('should send error message "quantity harap diisi"', function (done) {
                const newProduct = {
                    name: 'buah',
                    image: 'blabal.jpeg',
                    price: 20000,
                };
                chai
                    .request(app)
                    .post('/product')
                    .set({
                        access_token: adminToken
                    })
                    .send(newProduct)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.property('msg')
                        expect(res.body.msg).to.equal('quantity harap diisi')

                        done()
                    })
            })
            it('should send error message "image harus ada"', function (done) {
                const newProduct = {
                    name: 'buah',
                    quantity: 20,
                    price: 20000,
                };
                chai
                    .request(app)
                    .post('/product')
                    .set({
                        access_token: adminToken
                    })
                    .send(newProduct)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.property('msg')
                        expect(res.body.msg).to.equal('image harus ada')
                        done()
                    })
            })
            it('should send error message "harga harap diisi"', function (done) {
                const newProduct = {
                    name: 'buah',
                    quantity: 20,
                    image: 'blabal.jpeg',
                };
                chai
                    .request(app)
                    .post('/product')
                    .set({
                        access_token: adminToken
                    })
                    .send(newProduct)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.property('msg')
                        expect(res.body.msg).to.equal('harga harap diisi')
                        done()
                    })
            })


            it('should send error message "bad request"', function (done) {
                const newProduct = {
                    name: 'buah',
                    quantity: 20,
                    image: 'blabal.jpeg',
                    price: 20000
                };
                chai
                    .request(app)
                    .post('/product')
                    .set({
                        access_token: fakeToken
                    })
                    .send(newProduct)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.property('message')
                        expect(res.body.message).to.equal('Bad request')
                        done()
                    })
            })


            it('should send error message "not allowed! you are not admin!!"', function (done) {
                const newProduct = {
                    name: 'buah',
                    quantity: 20,
                    image: 'blabal.jpeg',
                    price: 20000
                };
                chai
                    .request(app)
                    .post('/product')
                    .set({
                        access_token: userToken
                    })
                    .send(newProduct)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(401)
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.property('msg')
                        expect(res.body.msg).to.equal('not allowed! you are not admin!!')

                        done()
                    })
            })

            it('should send error message "Unauthenticate"', function (done) {
                const newProduct = {
                    name: 'buah',
                    quantity: 20,
                    image: 'blabal.jpeg',
                    price: 20000
                };
                chai
                    .request(app)
                    .post('/product')
                    .send(newProduct)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(401)
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.property('message')
                        expect(res.body.message).to.equal('Unauthenticate')
                        done()
                    })
            })
        })
    })


    describe('PATCH /product/:id', function () {
        describe('Success Test', function () {
            it('should return status code 200 with response body with updated product', function (done) {
                let updateData = {
                    name: "sang pemimpi",
                    quantity: 10,
                    price: 20000,
                    image: 'kakakak.jpg'
                }
                chai
                    .request(app)
                    .patch(`/product/${productId}`)
                    .set({
                        access_token: adminToken
                    })
                    .send(updateData)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(200)
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.property('_id')
                        expect(res.body).to.have.property('name')
                        expect(res.body).to.have.property('quantity')
                        expect(res.body).to.have.property('price')
                        expect(res.body).to.have.property('image')
                        expect(res.body._id).to.be.a('string')
                        expect(res.body.name).to.be.a('string')
                        expect(res.body.quantity).to.be.a('number')
                        expect(res.body.price).to.be.a('number')
                        expect(res.body.image).to.be.a('string')
                        expect(res.body._id).to.be.equal(productId)
                        expect(res.body.name).to.be.equal('sang pemimpi')
                        expect(res.body.quantity).to.be.equal(10)
                        expect(res.body.price).to.be.equal(20000)

                        done()
                    })
            })


            it('should return status code 400: "Bad request" ', function (done) {
                let updateData = {
                    name: "sang pemimpi",
                    quantity: 10,
                    price: 20000,
                    image: 'kakakak.jpg'
                }
                chai
                    .request(app)
                    .patch(`/product/${productId}`)
                    .set({
                        access_token: fakeToken
                    })
                    .send(updateData)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.property('message')
                        expect(res.body.message).to.equal('Bad request')
                        done()
                    })
            })

            it('should return status code 401: "not allowed! you are not admin!!"', function (done) {
                let updateData = {
                    name: "sang pemimpi",
                    quantity: 10,
                    price: 20000,
                    image: 'kakakak.jpg'
                }
                chai
                    .request(app)
                    .patch(`/product/${productId}`)
                    .set({
                        access_token: userToken
                    })
                    .send(updateData)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(401)
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.property('msg')
                        expect(res.body.msg).to.equal('not allowed! you are not admin!!')
                        done()
                    })
            })




            it('should return status code 401: "Unauthenticate"', function (done) {
                let updateData = {
                    name: "sang pemimpi",
                    quantity: 10,
                    price: 20000,
                    image: 'kakakak.jpg'
                }
                chai
                    .request(app)
                    .patch(`/product/${productId}`)
                    .send(updateData)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(401)
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.property('message')
                        expect(res.body.message).to.equal('Unauthenticate')
                        done()
                    })
            })


        })


    })


    describe('Delete /product/:id', function () {
        describe('Success Test', function () {
           


            it('should return status code 400: "Bad request" ', function (done) {
                chai
                    .request(app)
                    .delete(`/product/${productId}`)
                    .set({
                        access_token: fakeToken
                    })

                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.property('message')
                        expect(res.body.message).to.equal('Bad request')
                        done()
                    })
            })


            

            it('should return status code 401: "not allowed! you are not admin!!"', function (done) {
                chai
                    .request(app)
                    .delete(`/product/${productId}`)
                    .set({
                        access_token: userToken
                    })
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(401)
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.property('msg')
                        expect(res.body.msg).to.equal('not allowed! you are not admin!!')
                        done()
                    })
            })




            it('should return status code 401: "Unauthenticate"', function (done) {
                chai
                    .request(app)
                    .delete(`/product/${productId}`)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(401)
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.property('message')
                        expect(res.body.message).to.equal('Unauthenticate')
                        done()
                    })
            })


            it('should return status code 200 with response body with updated product', function (done) {
                chai
                .request(app)
                .delete(`/product/${productId}`)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.equal('Unauthenticate')
                    done()
                    })
            })

        })


    })

})

