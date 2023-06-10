const signinValid = () => {
    let email =document.getElementById('email').value
    let password = document.getElementById('password').value
    if(email.length>0 && password.length>0){
        fetch('/', {
            headers: { "Content-Type": "application/json" },
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            })
        }).then((res) => { return res.json() }).then((data) => {
            if (data == null) {
                alert('incorrect email or password')
            }
            else {
                window.location = '/products'
                localStorage.setItem('user', data.name)
            }
        })
    }
    else{
        alert('All fields are mandatory')
    }
}