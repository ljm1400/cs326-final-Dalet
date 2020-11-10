'use strict'


let loginForm = document.getElementById("loginForm");


document.getElementById("loginButton").addEventListener("click", async function(event) {
<<<<<<< Updated upstream
    
    let email = loginForm.elements.loginEmail.value;
    let password = loginForm.elements.loginPassword.value;
    
=======
    event.preventDefault();
    let email = loginForm.elements.loginEmail.value;
    let password = loginForm.elements.loginPassword.value;
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
            window.location.href = '/myPosts.html'
        }
        else{
            alert("User Not Found");
            window.location.href = '/login.html'
        }
=======
            return true;
        }
        else{
            alert("User Not Found");
            return false;
        }

>>>>>>> Stashed changes
    }
    
});                                                       
