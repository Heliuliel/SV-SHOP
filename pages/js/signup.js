
const signupValid = () => {
    let email = document.getElementById('email').value
    let name = document.getElementById('name').value
    let password = document.getElementById('password').value

    if (name.length > 0 && email.length > 0 && password.length > 0) {
        fetch('/signup', {
            headers: { "Content-Type": "application/json" },
            method: 'post',
            body: JSON.stringify({
                name,
                email,
                password
            })
        }).then((res) => { return res.json() }).then((data) => {
            if (data != 'ok') {
                alert('Please try another email address')
            }
            else {
                window.location = '/'
            }
        })
    }
    else {
        alert('All fields are mandatory')
    }
}

