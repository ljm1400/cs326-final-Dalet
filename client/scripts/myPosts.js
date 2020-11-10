































































































































































































































































































































let fileInput = document.getElementById('file');
let fileList = [];
let fileURLS = [];

document.getElementById('profileSubmitButton').addEventListener('click', async function(event){
    event.preventDefault();
    let form = document.getElementById('updateUserInfoForm');
    let name =  form.elements.name.value;
    let email = form.elements.email.value;
    let pfpLink = fileURLS.length !== 0 ? fileURLS[0]: null;
    console.log(name);
    let person = {

    }   
    name ? person.name = name : person.name = null;
    email ? person.email = email : person.email = null;
    pfpLink ? person.pfpLink = pfpLink : person.pfpLink = null;
    let user = null;
    
    let id = user ? user.ID : 1;
    let res = await fetch(`/user/${id}/update`, 
        {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(person) 
        });
        let data = await res.json();
        alert("user updated: " + JSON.stringify(data));
});


fileInput.addEventListener('change', function(){
    fileList = [];
    for(let file of fileInput.files){
        fileList.push(file);
        const reader = new FileReader();
  
        reader.addEventListener("load", function () {
        // convert image file to base64 string
        fileURLS.push(reader.result.toString());
        console.log(reader.result.toString());
        }, false);
    
        
        reader.readAsDataURL(file);
        
    }
})


