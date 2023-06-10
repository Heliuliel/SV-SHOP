let chosenproducts = []
document.getElementById('welcome').innerHTML += 'Welcome ' + localStorage.getItem('user')
const style = (element) => {
    element.style.border = '1px yellow solid'
    element.style.width = '250px'
    element.style.height = '50px'
    element.style.display = 'flex'
    element.style.margin = '2%'
    element.style.backgroundColor = 'gainsboro'
    element.style.justifyContent = 'space-around'
}
const showProdocts = () => {
    let select = document.getElementById('selectBtn').value
    fetch('/getproducts').then((res) => { return res.json() }).then((data) => {
        let products = data
        if (select == 'lowtohigh') {
            products = products.sort((a, b) => { return a.price - b.price })
        }
        else {
            products = products.sort((a, b) => { return b.price - a.price })
        }
        document.getElementById('main').innerHTML = ''
        products.forEach((val, i) => {
            let div = document.createElement('div');
            div.style.display = 'flex'
            let h = document.createElement('h4');
            let p = document.createElement('p');
            h.innerHTML = val.name
            p.innerHTML = val.price + '$'
            div.appendChild(h)
            div.appendChild(p)
            document.getElementById('main').appendChild(div)
            const choose = () => {
                chosenproducts.push({ name: val.name, price: val.price })
                return chosenproducts
            }
            style(div)
            div.onclick = choose
            choose
        })
    })
}

showProdocts()

const buybtn = () => {
    let totalPro = chosenproducts.length
    let totalPrice = 0
    for (let i = 0; i < chosenproducts.length; i++) {
        totalPrice += chosenproducts[i].price
    }
    localStorage.setItem('totalPro', totalPro)
    localStorage.setItem('totalPrice', totalPrice)
    return totalPrice
}
