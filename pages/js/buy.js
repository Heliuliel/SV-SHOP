document.getElementById('totalpro').innerHTML += localStorage.getItem('totalPro')
document.getElementById('totalprice').innerHTML += localStorage.getItem('totalPrice') + '$'

const approveBtn = () => {
    fetch('/addorder', {
        headers: { "Content-Type": "application/json" },
        method: 'post',
        body: JSON.stringify({
            name: localStorage.getItem('user'),
            count: localStorage.getItem('totalPro'),
            price: localStorage.getItem('totalPrice')
        })
    }).then((res) => { return res.json() }).then((data) => {

    })
    localStorage.clear('user')
    localStorage.clear('totalPro')
    localStorage.clear('totalPrice')
}
