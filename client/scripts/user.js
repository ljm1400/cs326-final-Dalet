'use strict';
let user;
window.addEventListener('load', async () =>{
    const data = await fetch ('/user');
    if(data.ok){
        user = await data.json();
        if (user._id === -1){
            user = null;
        }
        window.user = user;
    }
    else{
        user = null;
    }
    const page = document.getElementsByTagName('body')[0];
    renderButtons(page, user);

});

function renderButtons(page, user){
    const buttonSection = document.getElementById('buttonSection');
    if(user){
        document.getElementById('myPosts').style.visibility = 'visible';
        document.getElementById('postCreateButton').style.visibility = 'visible';

        if(page.id === 'myposts'){

            const userInfoButton = document.createElement('button');
            userInfoButton.id = "userInfoButton";
            userInfoButton.className="btn btn-dark btn-sm mx-2 ";
            userInfoButton.dataset.toggle = 'modal';
            userInfoButton.dataset.target = '#UserInfo';
            const userInfoLink = document.createElement('a');
            userInfoLink.className = "nav-link";
            const userInfoIcon = document.createElement('i');
            userInfoIcon.className = "fas fa-users buttonIcon mr-1";
            const userInfoText = document.createElement('span');
            userInfoText.textContent = 'Edit User Info';
            userInfoButton.appendChild(userInfoLink);
            userInfoLink.appendChild(userInfoIcon);
            userInfoLink.appendChild(userInfoText);
            buttonSection.appendChild(userInfoButton);
        }

        const logoutButton = document.createElement('li');
        logoutButton.id = "logoutButton";
        logoutButton.className="btn btn-dark btn-sm mx-2 ";
        const logoutLink = document.createElement('a');
        logoutLink.className = "nav-link";
        logoutLink.href = "/logout";
        const logoutIcon = document.createElement('i');
        logoutIcon.className = "fas fa-sign-out-alt buttonIcon mr-1";
        const logoutText = document.createElement('span');
        logoutText.textContent = 'Logout';
        logoutButton.appendChild(logoutLink);
        logoutLink.appendChild(logoutIcon);
        logoutLink.appendChild(logoutText);
        buttonSection.appendChild(logoutButton);
        
        
    } else{

        document.getElementById('myPosts').style.visibility = 'hidden';
        document.getElementById('postCreateButton').style.visibility = 'hidden';

        //draw register Button
        const registerButton = document.createElement('li');
        registerButton.id = "registerButton";
        registerButton.className="btn btn-dark btn-sm mx-2 ";
        const registerLink = document.createElement('a');
        registerLink.className = "nav-link";
        registerLink.href = "/signup";
        const registerIcon = document.createElement('i');
        registerIcon.className = "fas fa-user-plus buttonIcon mr-1";
        const registerText = document.createElement('span');
        registerText.textContent = 'Register';
        registerButton.appendChild(registerLink);
        registerLink.appendChild(registerIcon);
        registerLink.appendChild(registerText);
        buttonSection.appendChild(registerButton);
        //draw loginButton
        const loginButton = document.createElement('li');
        loginButton.id = "loginButton";
        loginButton.className="btn btn-dark btn-sm mx-2 ";
        const loginLink = document.createElement('a');
        loginLink.className = "nav-link";
        loginLink.href = "/login";
        const loginIcon = document.createElement('i');
        loginIcon.className = "fas fa-sign-in-alt buttonIcon mr-1";
        const loginText = document.createElement('span');
        loginText.textContent = 'Login';
        loginButton.appendChild(loginLink);
        loginLink.appendChild(loginIcon);
        loginLink.appendChild(loginText);
        buttonSection.appendChild(loginButton);
        
    }

}
if(document.getElementById('logoutButton')){
    document.getElementById('logoutButton').addEventListener('click', ()=>{
        window.localStorage.removeItem('User');
        window.location.href = 'login.html';
    });
}

if(document.getElementsByTagName('body')[0].id === 'myposts'){
    
    const pfpInput = document.getElementById('pfpFile');
    const pfpFiles = [];
    const pfpURLS = [];
    
    document.getElementById('profileSubmitButton').addEventListener('click', async function(){
        
        const form = document.getElementById('updateUserInfoForm');
        const name =  form.elements.name.value;
        const email = form.elements.email.value;
        const pfpLink = pfpURLS.length !== 0 ? pfpURLS[0]: null;
        const person = {

        };   
        name ? person.name = name : person.name = null;
        email ? person.email = email : person.email = null;
        pfpLink ? person.pfpLink = pfpLink : person.pfpLink = null;
    
        const res = await fetch(`/user/update`, 
            {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(person) 
            });
        const data = await res.json();
        alert(`User: ${data.name} has been updated!` );
        
        
        
    });


    pfpInput.addEventListener('change', function(){
        
        for(const file of pfpInput.files){
            pfpFiles.push(file);
            const reader = new FileReader();
    
            reader.addEventListener("load", function () {
            // convert image file to base64 string
            pfpURLS.push(reader.result.toString());
            }, false);
        
            
            reader.readAsDataURL(file);
            
        }
    });

}
