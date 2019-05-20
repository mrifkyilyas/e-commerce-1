# e-commerce

# e-commerce

#### List of Basic routes:

| Route                                                        | HTTP   | Request                                                      | On Success                                                   | On Error                                                     | Description                                    |
| ------------------------------------------------------------ | ------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ---------------------------------------------- |
| <span style="color:#0000ff">/user/rahasia/hidden/adminregister'</span>           | POST   | (BODY)<br />name:String(required)<br />email:String(required)<br />password:String(required)<br /> | Status: 201<br />Body: new admin                            | Status: 400<br />Message: Path name/email/password is required | Register new admin                             |
| <span style="color:#0000ff">/user/register</span>           | POST   | (BODY)<br />name:String(required)<br />email:String(required)<br />password:String(required)<br /> | Status: 201<br />Body: new user                             | Status: 400<br />Message: Path name/email/password is required | Register new user                              |
| <span style="color:#0000ff">/user/login</span>           | POST   | (BODY)<br />name:String(required)<br />email:String(required)<br />password:String(required)<br /> | Status: 201<br />Body: token                             | Status: 400<br />Message: password salah | login user                          |
| <span style="color:#0000ff">/user</span>                    | GET    |                                                              | Status: 200<br />Body: all user                             | Status: 500<br />Message: internal server error              | Get all the user info                         |
| <span style="color:#0000ff">/cart/addToCart/</span>      | PATCH  | (HEADERS)<br />token: String(required)<br />(BODY)<br />productId: String(required) | Status:200<br />Body: updated user with new product in cart  | Status: 500<br />Message: internal server error              | Add new product to user's cart                 |
| <span style="color:#0000ff">/cart/removeFromCart/</span> | PATCH  | (HEADERS)<br />token: String(required)<br />(BODY)<br />productId: String(required) | Status:200<br />Body: updated user with product removed from cart | Status: 500<br />Message: internal server error              | Remove a product from user's cart              |
| <span style="color:#0000ff">/products</span>                 | POST   | (HEADERS)<br />token: String(required)<br /><br />(BODY)<br />name:String(required)<br />stock:Number(required)<br />price:Number(required)<br />image:String(required)<br />brand:String(required) | Status:201<br />Body: created product                        | Status: 500<br />Message: internal server error              | Create new product                             |
| <span style="color:#0000ff">/products</span>                 | GET    |                                                              | Status: 200<br />Body: all products                          | Status: 500<br />Message: internal server error              | Get all the products                           |
| <span style="color:#0000ff">/products/:id</span>             | GET    |                                                              | Status: 200<br />Body: found product                         | Status: 404<br /><br />Message: not Found.                   | Find a product by id                           |
| <span style="color:#0000ff">/products:id</span>              | PATCH  | (HEADERS)<br />token:String<br />(BODY)<br />name:String<br />stock:Number<br />price:Number<br />image:String<br />brand:String | Status: 200<br />Body: updated product                       | Status: 404<br /><br />Message: not Found.                   | Update a product                               |
| <span style="color:#0000ff">/products/:id</span>             | DELETE | (HEADERS)<br />token:String<br />                            | Status: 200<br />Body: deleted product                       | Status: 404<br /><br />Message: not Found.                   | Delete a product                               |
| <span style="color:#0000ff">/transaction</span>             | GET    | (HEADERS)<br />token:String<br />                            | Status: 200<br />Body: all transaction                      | Status: 401<br /><br />Message: not allowed.                 | Find all transaction                          |
| <span style="color:#0000ff">/transaction/mytransaction</span>    | GET    | (HEADERS)<br />token:String<br />                            | Status: 200<br />Body: found transaction                    | Status: 401<br />Message: not allowed.                       | Get transaction find by user id                |
| <span style="color:#0000ff">/transaction/delivery</span>    | POST   | (BODY)<br />province: String(required)<br />city: String(required) | Status: 201<br />Body: delivery cost                         | Status: 404<br />Message: the address you provided was not found. | Get delivery cost based from province and city |
| <span style="color:#0000ff">/transaction/:id</span>         | GET    |                                                              | Status: 200<br />Body: found transaction                     | Status: 404<br />Message: not Found.                         | Get transaction by id                          |
| <span style="color:#0000ff">/transactions/checkout/</span> | POST   | (HEADERS)<br />token:String<br />(BODY)<br />phone: Number(required)<br />address: String(required)<br />totalPayment: Number(required) | Status: 201<br />Body: new transaction                       | Status: 400<br />Message: Path phone/address is required     | Create new Transaction based from user's cart  |
| <span style="color:#0000ff">/transactions/:id</span>         | PATCH  | (HEADERS)<br />token:String<br />(BODY)<br />status: Boolean(required) | Status: 200<br />Body: updated transaction                   | Status: 404<br />Message: not Found.                         | Update transaction status                      |
| <span style="color:#0000ff">/transaction/:id</span>         | DELETE | (HEADERS)<br />token:String<br />                            | Status: 200<br />Body: deleted transaction                   | Status: 404<br />Message: not Found.                         | Delete a transaction                           |



## Usage

Make sure you have Node.js and npm installed in your computer, and then run this commands in both client and server folders:

```
$npm install
```

Run this command in server folder:

```
$nodemon app
```

Run this command in client folder: 

```
$npm run serve
```

Access local Server side: 
http://localhost:3000

Access local Client side: 
http://localhost:8080


## Demo
Server side:

http://outdoors-server.mri.web.id

Client side:

http://outdoors.mri.web.id
