const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')
const { Product, User } = require('../models/')


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


describe('user test', function () {
    describe('Register POST /user/register', function (err, res) {
        describe('Success Register POST /user/register', function (err, res) {
            it('should send an object of inserted User with 201 status code', function (done) {
                const newUser = {
                    name: 'muhammad rifky ilyas',
                    email: 'rifkyhh@gmail.com',
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
        })
    })

    describe('Error Register', function (err, res) {
        it('should send error message "email sudah digunakan', function (done) {
            const newUser = {
                name: 'muhammad rifky ilyas',
                email: 'rifky@gmail.com',
                password: '1234567',
                address: 'jl, h. agus salim bekasi',
            };
            chai
                .request(app)
                .post('/user/register')
                .send(newUser)
                .end(function (err, res) {

                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.equal('email sudah digunakan')
                    done()
                })
        })


        it('should send error message "nama harap diisi"', function (done) {
            const newUser = {
                // name: 'muhammad rifky ilyas',
                email: 'rifky@gmail.com',
                password: '1234567',
                address: 'jl, h. agus salim bekasi',
            };
            chai
                .request(app)
                .post('/user/register')
                .send(newUser)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.equal('nama harap diisi')
                    done()
                })
        })

        it('should send error message : "path passwordis required" ', function (done) {
            const newUser = {
                name: 'muhammad rifky ilyas',
                email: 'rifky13@gmail.com',
                // password: '1234567',
                address: 'jl, h. agus salim bekasi',
            };
            chai
                .request(app)
                .post('/user/register')
                .send(newUser)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.equal("password tidak boleh kosong")
                    done()
                })
        })

        it('should send error message "password harus lebih dari 5 character', function (done) {
            const newUser = {
                name: 'muhammad rifky ilyas',
                email: 'rifky13@gmail.com',
                password: '1234',
                address: 'jl, h. agus salim bekasi',
            };
            chai
                .request(app)
                .post('/user/register')
                .send(newUser)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.equal('password harus lebih dari 5 character')
                    done()
                })
        })

        it('should send error message "format email salah', function (done) {
            const newUser = {
                name: 'muhammad rifky ilyas',
                email: 'inibukanemailygtepat',
                password: '1234',
                address: 'jl, h. agus salim bekasi',
            };
            chai
                .request(app)
                .post('/user/register')
                .send(newUser)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.equal('format email salah')
                    done()
                })
        })

        it('should send error message "format email salah', function (done) {
            const newUser = {
                name: 'muhammad rifky ilyas',
                email: '1111111',
                password: '1234',
                address: 'jl, h. agus salim bekasi',
            };
            chai
                .request(app)
                .post('/user/register')
                .send(newUser)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.equal('format email salah')
                    done()
                })
        })

        it('should send error message "format email salah', function (done) {
            const newUser = {
                name: 'muhammad rifky ilyas',
                email: 'www.kaskus.com',
                password: '1234',
                address: 'jl, h. agus salim bekasi',
            };
            chai
                .request(app)
                .post('/user/register')
                .send(newUser)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.equal('format email salah')
                    done()
                })
        })

        it('should send error message "format email salah', function (done) {
            const newUser = {
                name: 'muhammad rifky ilyas',
                email: 'ilyas@gma',
                password: '1234',
                address: 'jl, h. agus salim bekasi',
            };
            chai
                .request(app)
                .post('/user/register')
                .send(newUser)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.equal('format email salah')
                    done()
                })
        })

        it('should send error message "format email salah', function (done) {
            const newUser = {
                name: 'muhammad rifky ilyas',
                email: '@gmail.com',
                password: '1234',
                address: 'jl, h. agus salim bekasi',
            };
            chai
                .request(app)
                .post('/user/register')
                .send(newUser)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.equal('format email salah')
                    done()
                })
        })
    })

})



describe('Testing Login', function (err, res) {
    describe('success login post /user/login', function (err, res) {
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
                    done()
                })
        })
    })

    describe('error login post /user/login', function (err, res) {
        it('should send an message:password yang anda masukan salah', function (done) {
            const loginUser = {
                email: 'rifky@gmail.com',
                password: '1234ss567',
            };
            chai
                .request(app)
                .post('/user/login')
                .send(loginUser)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.equal('password yang anda masukan salah')
                    done()
                })
        })

        it('should send an message:password yang anda masukan salah', function (done) {
            const loginUser = {
                email: 'udin@gmail.com',
            };
            chai
                .request(app)
                .post('/user/login')
                .send(loginUser)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.equal('password yang anda masukan salah')
                    done()
                })
        })
        it('should send an message:password yang anda masukan salah', function (done) {
            const loginUser = {
                password: '1234ss567',
            };
            chai
                .request(app)
                .post('/user/login')
                .send(loginUser)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.equal('password yang anda masukan salah')
                    done()
                })
        })
    })
})


