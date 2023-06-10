const express = require('express');
const app = express()
const bp = require('body-parser')
const db = require('mongoose')

app.use(express.static('pages'));
app.use(bp.json());
app.use(bp.urlencoded({ extended: false }))

db.connect('mongodb+srv://heli:Hh123456@cluster0.2190pkc.mongodb.net/svshop');

const userSchema = db.Schema({
    name: String,
    email: String,
    password: String

})
const userModel = db.model('users', userSchema);

const productSchema = db.Schema({
    name: String,
    price: Number
})
const productModel = db.model('products', productSchema);

const orderSchema = db.Schema({
    name: String,
    count: Number,
    price: Number
})
const orderModel = db.model('orders', orderSchema);


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/pages/html/index.html')
})
app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/pages/html/signup.html')
})
app.get('/products', (req, res) => {
    res.sendFile(__dirname + '/pages/html/products.html')
})
app.get('/buy', (req, res) => {
    res.sendFile(__dirname + '/pages/html/buy.html')
})

app.get('/addproducts', (req, res) => {
    let products = [
        { name: 'Shirt', price: 59 },
        { name: 'Jeans', price: 100 },
        { name: 'Dress', price: 179 },
        { name: 'Skirt', price: 99 },
        { name: 'Coat', price: 399 },
        { name: 'Shoes', price: 129 }]
    const add = async () => {
        await productModel.insertMany(products)
        res.json('added')
    }
    add()
})
app.post('/', (req, res) => {
    const check = async () => {
        let result = await userModel.findOne({ email: req.body.email, password: req.body.password })
        res.json(result)
    }
    check()
})

app.post('/signup', (req, res) => {
    const check = async () => {
        let result = await userModel.find({ email: req.body.email })
        if (result.length != 0) {
            res.json('wrong')
        }
        else {
            await userModel.insertMany(req.body)
            res.json('ok')
        }
    }
    check()
})

app.get('/getproducts', async (req, res) => {
    let allproducts = await productModel.find();
    res.json(allproducts)
})

app.post('/addorder', (req, res) => {
    const addorder = async () => {
        let order = req.body
        await orderModel.insertMany(order)
        res.json('ok')
    }
    addorder()

})
function checkadmin(req, res, next) {
    if (req.query.admin == 'true') {
        next()
    }
    else {
        res.status(400).send('error')
    }
}
app.use(checkadmin)
app.get('/all', (req, res) => {
    const getall = async () => {
        let all = await orderModel.find()
        res.json(all)
    }
    getall()
}
)

app.listen('4000', () => { console.log('server is on') })