'use strict'

let loginForm = document.getElementById("loginForm");


document.getElementById("loginButton").addEventListener("click", async function(event) {
    let email = loginForm.elements.loginEmail.value;
    let password = loginForm.elements.loginPassword.value;
    
    let res = await fetch('/users');
    if (!res.ok) {
        console.log(res.error)
        return;
    } else {
        let data = await res.json();
        //If login info matches user in users, proceed
        for (let users in data) {
            if (users.email === email && users.password === password) {
                    loginObj = {'email': email, 'password': password}
                    localStorage.setItem('User' : JSON.stringify(loginObj));
                    alert("Successfully logged in");
            }
        }
    }
  
    event.preventDefault();
}
                                                        
loginForm.addEventListener("submit", function(event) {
    
  
} 
