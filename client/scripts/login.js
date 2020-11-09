'use strict'

let loginForm = document.getElementById("loginForm");


document.getElementById("loginButton").addEventListener("click", async function(event) {
    let email = loginForm.elements.loginEmail.value;
    let password = loginForm.elements.loginPassword.value;
    
    let res = await fetch('/user/read?email=${email}&password=${password}');
    if (!res.ok) {
        console.log(res.error)
        return;
    } else {
        let data = await res.json();
        console.log(data.email);
        if (data) {
            alert("Successfully logged in");
        } else {
            console.log(data);
        }
        
    }
  
    event.preventDefault();
}
                                                        
loginForm.addEventListener("submit", function(event) {
    
  
} 
