const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')
const { User, Product, Transaction } = require('../models/index')



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

before(done => {
    Transaction
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

after(done => {
    Transaction
        .deleteMany({}, () => {
            done()
        })
})


let adminToken = ''
let userToken = ''
let fakeToken = 'iniAd4lahf4keTok3n'
let idProduct = ''







describe('Transaction', function () {
    describe('POST /transactions', function () {

        describe('Success Test', function () {

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

            it('should return status code 201 with response body created product', function (done) {
                let input = {
                    phone: 897846284746,
                    address: 'jalan mana aja boleh',
                    totalPayment: 100,
                }
                chai
                    .request(app)
                    .post(`/transactions/checkout`)
                    .set({
                        access_token: userToken
                    })
                    .send(input)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(201)

                        expect(res.body).to.be.an('object')

                        expect(res.body).to.have.property('_id')
                        expect(res.body).to.have.property('totalPayment')
                        expect(res.body).to.have.property('status')
                        expect(res.body).to.have.property('createdAt')
                        expect(res.body).to.have.property('productList')
                        expect(res.body).to.have.property('userId')
                        expect(res.body).to.have.property('phone')
                        expect(res.body).to.have.property('address')


                        expect(res.body._id).to.be.a('string')
                        expect(res.body.totalPayment).to.be.a('number')
                        expect(res.body.status).to.be.a('boolean')
                        expect(res.body.createdAt).to.be.a('string')
                        expect(res.body.productList).to.be.an('array')
                        expect(res.body.userId).to.be.a('string')
                        expect(res.body.phone).to.be.a('string')
                        expect(res.body.address).to.be.a('string')


                        expect(res.body.totalPayment).to.be.equal(100)
                        expect(res.body.status).to.be.equal(false)
                        expect(res.body.createdAt.slice(0, 10)).to.be.equal(new Date().toISOString().slice(0, 10))
                        expect(res.body.userId).to.be.equal(customerId)
                        expect(res.body.phone).to.be.equal("897846284746")
                        expect(res.body.address).to.be.equal('jalan mana aja boleh')

                        transactionId = res.body._id
                        done()
                    })
            })
        })

        it('should return status code 400 with response body "invalid phone number" if phone number length is less than 10', function (done) {
            let input = {
                phone: 897884746,
                address: 'jalan mana aja boleh',
                totalPayment: 100,
            }
            chai
                .request(app)
                .post(`/transactions/checkout`)
                .set({
                    access_token: userToken
                })
                .send(input)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)

                    expect(res.body).to.be.an('object')

                    expect(res.body).to.have.property('msg')

                    expect(res.body.msg).to.be.a('string')
                    expect(res.body.msg).to.be.equal('invalid phone number')

                    done()
                })
        })

        it('should return status code 400 with response body "invalid phone number" if phone number length is more than 12', function (done) {
            let input = {
                phone: 897884746,
                address: 'jalan mana aja boleh',
                totalPayment: 100,
            }
            chai
                .request(app)
                .post(`/transactions/checkout`)
                .set({
                    access_token: userToken
                })
                .send(input)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)

                    expect(res.body).to.be.an('object')

                    expect(res.body).to.have.property('msg')

                    expect(res.body.msg).to.be.a('string')
                    expect(res.body.msg).to.be.equal('invalid phone number')

                    done()
                })
        })







    })

})
