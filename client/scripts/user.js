'use strict';
let user;
window.addEventListener('load', async () =>{
    const data = await fetch ('/user');
    user = await data.json();
    
    if(user){
        document.getElementById('loginButton').style.visibility = 'hidden';
        document.getElementById('signupButton').style.visibility = 'hidden';
        document.getElementById('myPosts').style.visibility = 'visible';
        if(document.getElementById('logoutButton')){
            document.getElementById('logoutButton').style.visibility = 'visible';
        }
        if(document.getElementById('userInfoButton')){
            document.getElementById('userInfoButton').style.visibility = 'visible';
        }
        if(document.getElementById('postCreateButton')){
            document.getElementById('postCreateButton').style.visibility = 'visible';
        }
    }
    else{
        document.getElementById('loginButton').style.visibility = 'visible';
        document.getElementById('signupButton').style.visibility = 'visible';
        document.getElementById('myPosts').style.visibility = 'hidden';
        if(document.getElementById('logoutButton')){
            document.getElementById('logoutButton').style.visibility = 'hidden';
        }
        if(document.getElementById('userInfoButton')){
            document.getElementById('userInfoButton').style.visibility = 'hidden';
        }
        if(document.getElementById('postCreateButton')){
            document.getElementById('postCreateButton').style.visibility = 'hidden';
        }
    }
});
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
