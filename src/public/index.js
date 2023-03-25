const form = document.getElementById('form');
const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");
const button = document.getElementById("button");

form.onsubmit = e  => {
    e.preventDefault();
    fetch("http://localhost:8080/jwt/login", {
        method: 'POST',
        body: JSON.stringify({
            email: inputEmail.value,
            password: inputPassword.value
        }),
        headers: { 
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(response => {
        console.log(document.cookie);
        console.log("todo correcto");
    });
}

button.onclick = () => {
    fetch("http://localhost:8080/jwt/login", {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
        }
    })
}