'use strict'


let loginForm = document.getElementById("loginForm");


document.getElementById("loginButton").addEventListener("click", async function(event) {
    event.preventDefault();
    let email = loginForm.elements.loginEmail.value;
    let password = loginForm.elements.loginPassword.value;
    
    let res = await fetch('/user/login', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        }) 
    });
    if (!res.ok) {
        console.log(res.error)
        return;
    } else {
        let data = await res.json();
        console.log(data);
        //If login info matches user in users, proceed
        let login = data.login;

        if(login){
            let person = data.person;
            localStorage.setItem("User",  JSON.stringify(person));
            alert("Successfully logged in");
            return true;
        }
        else{
            alert("User Not Found");
            return false;
        }

    }
    
});                                                       
