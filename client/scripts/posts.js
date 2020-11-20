'use strict';

window.addEventListener('load', fetchAndRenderPosts);
const body = document.getElementsByTagName('body')[0];
async function fetchAndRenderPosts(){
    
    let url;
    if(body.id === 'home'){
        url = '/posts';
    }
    if(body.id === 'climbing'){
        url = '/posts/climbing';
    }
    if(body.id === 'hiking'){
        url = '/posts/hiking';
    }
    if(body.id === 'myposts'){
        url = `/posts/myPosts`;
    }
    const res = await fetch(url);
    const posts = await res.json();
    const fetchUsers = await fetch('/users');
    const users = await fetchUsers.json();
    
    for(const post of posts){
        renderPost(post.title, post.ID, post.description, post.images, post.comments, post.ratings, post.author, users);        
    }
    console.log(posts);
    console.log("Posts rendered Successfully");
}

function renderPost(title, postId, description, files, comments, ratings, author, users){
    //get page Body (center section)
    const pageBody = document.getElementById('postSection');

    //the main body of the post
    const postBody = document.createElement('div');
    postBody.className = 'border rounded p-4 mb-3 postBackGroundColor';
    postBody.id = `post${postId}`;
    //the main carousel where images, indicators, and controls are held
    const imageCarousel = document.createElement('div');
    imageCarousel.className = 'carousel slide carousel-fade';
    imageCarousel.id = `post${postId}Images`;

    //the list of indicators to show what picture is currently showing
    const indicators = document.createElement('ol');
    indicators.className = "carousel-indicators";
    
    //inner image holding for the carousel
    const innerCarousel = document.createElement('div');
    innerCarousel.className = 'carousel-inner';

    //creates a new indicator and image element for each image of the post
    for(let file = 0; file< files.length; ++file){

        //indicator section
        const indicator = document.createElement('li');
        indicator.dataset.target = `#post${postId}Indicators`;
        indicator.setAttribute('data-slide-to', file);
        //if its the first file, set it to active
        indicator.className = file === 0 ? 'active' : '';
        indicators.appendChild(indicator);
        
        //image holder section
        const item = document.createElement('div');
        item.className = file === 0 ? 'carousel-item active' : 'carousel-item';
        //img inside of the holder div
        const img = document.createElement('img');
        img.src = files[file].url;
        img.className = 'img-thumbnail imageSize';
        img.alt = files[file].name;
        item.appendChild(img);
        innerCarousel.appendChild(item);
    }
    imageCarousel.appendChild(indicators);
    imageCarousel.appendChild(innerCarousel);

    //create the carousel controls
    const leftControl = document.createElement('a');
    leftControl.className= 'carousel-control-prev imageSideButtons';
    leftControl.href = `#post${postId}Images`;
    leftControl.setAttribute('role', 'button');
    leftControl.setAttribute('data-slide', 'prev');
    const leftIcon = document.createElement('span');
    leftIcon.className = 'carousel-control-prev-icon';
    leftIcon.setAttribute('aria-hidden', true);
    const leftText = document.createElement('span');
    leftText.className = 'sr-only';
    leftText.innerHTML = 'Previous';
    leftControl.appendChild(leftIcon);
    leftControl.appendChild(leftText);
    imageCarousel.appendChild(leftControl);

    const rightControl = document.createElement('a');
    rightControl.className= 'carousel-control-next imageSideButtons';
    rightControl.href = `#post${postId}Images`;
    rightControl.setAttribute('role', 'button');
    rightControl.setAttribute('data-slide', 'next');
    const rightIcon = document.createElement('span');
    rightIcon.className = 'carousel-control-next-icon';
    rightIcon.setAttribute('aria-hidden', true);
    const rightText = document.createElement('span');
    rightText.className = 'sr-only';
    rightText.innerHTML = 'Previous';
    rightControl.appendChild(rightIcon);
    rightControl.appendChild(rightText);

    
    imageCarousel.appendChild(rightControl);
    //appends the entire image carousel to the post body
    postBody.appendChild(imageCarousel);
    
    
    //start creating post info area

    const postInfoArea = document.createElement('div');
    postInfoArea.className = 'border rounded p-2 mt-2 postBodyColor';

    //row1 of post info body area
    const row1 = document.createElement('div');
    row1.className = 'row mt-3';
    //area for user profile picture and userName
    const profileArea = document.createElement('div');
    profileArea.className = 'text-left col-4 ml-1 row ';
    
    const pfp = document.createElement('img');
    pfp.src = users[author].pfpLink;
    pfp.className = 'img-thumbnail mr-lg-2 profilePicSize';
    pfp.alt = 'Profile Picture';
    const user = document.createElement('h5');
    user.className = 'mt-auto mb-auto';
    user.innerHTML = users[author].name;
    
    profileArea.appendChild(pfp);
    profileArea.appendChild(user);
    row1.appendChild(profileArea);
    
    //title area
    const titleArea = document.createElement('h3');
    titleArea.className = 'col-4';
    titleArea.textContent = title;
    row1.appendChild(titleArea);
    //ratingArea
    const ratingArea = document.createElement('div');
    ratingArea.className = 'col-2 ml-lg-auto';
    const ratingVal = document.createElement('p');
    const averageRating =  getAverageRating(ratings);
    ratingVal.innerHTML = 'Rating: '+`${averageRating}` + '&#x2605';
    ratingArea.appendChild(ratingVal);
    row1.appendChild(ratingArea);
    
    //row1 is complete so append to post body
    postInfoArea.appendChild(row1);
    //post description
    const postDesc = document.createElement('p');
    postDesc.textContent = description;
    postInfoArea.appendChild(postDesc);

    //postButtons
    const buttonRow = document.createElement('div');
    buttonRow.className = 'row';
    const buttons = document.createElement('div');
    buttons.className = 'float-left ml-lg-4 mb-2';
    //comment Button
    const commentButton = document.createElement('button');
    commentButton.className = 'btn btn-sm btn-dark';
    commentButton.dataset.toggle = 'collapse';
    commentButton.dataset.target = `#comment${postId}`;
    commentButton.textContent = "Comment";
    const commentIcon = document.createElement('i');
    commentIcon.className = 'fas fa-comment ml-1';
    commentButton.appendChild(commentIcon);
    buttons.appendChild(commentButton);

    //viewCommentsButton
    const viewCommentsButton = document.createElement('button');
    viewCommentsButton.className = 'btn btn-sm btn-dark ml-2';
    viewCommentsButton.dataset.toggle = 'collapse';
    viewCommentsButton.dataset.target = `#viewComments${postId}`;
    viewCommentsButton.textContent = "Comments";
    const viewCommentsIcon = document.createElement('i');
    viewCommentsIcon.className = 'fas fa-comments ml-1';
    viewCommentsButton.appendChild(viewCommentsIcon);
    buttons.appendChild(viewCommentsButton);

    //rateButton
    const rateButton = document.createElement('button');
    rateButton.className = 'btn btn-sm btn-dark ml-2';
    rateButton.dataset.toggle = 'collapse';
    rateButton.dataset.target = `#rate${postId}`;
    const rateIcon = document.createElement('i');
    
    rateButton.textContent = "Rate";
    rateIcon.className = 'fas fa-star-half-alt ml-1';
    rateButton.appendChild(rateIcon);
    
    buttons.appendChild(rateButton);

    //add buttons
    buttonRow.appendChild(buttons);
    postInfoArea.appendChild(buttonRow);
    
    //expandable rating
    const rate = document.createElement('div');
    rate.id = `rate${postId}`;
    rate.className = 'collapse m-auto w-90 py-4';
    //rating title
    const ratingTitle = document.createElement('h3');
    ratingTitle.textContent = "Rate This Post";
    rate.appendChild(ratingTitle);
    //rating row for input options
    const rateRow = document.createElement('div');
    rateRow.className = 'row mt-2';
    const spacer = document.createElement('div');
    spacer.className = 'col-4';
    rateRow.appendChild(spacer);
    //rating selector
    const selector = document.createElement('select');
    selector.className = 'form-control ratingSelect col-4';
    selector.id = `ratingSelector${postId}`;
    for(let i = 10; i>=0; --i){
        const option = document.createElement('option');
        option.innerHTML = `${i/2}` + '&#x2605';
        selector.appendChild(option);
    }
    rateRow.appendChild(selector);
    //rating submit button
    const submitRate = document.createElement('button');
    submitRate.className = 'btn btn btn-dark float-right ml-2';
    submitRate.dataset.toggle = 'collapse';
    submitRate.dataset.target = `#rate${postId}`;
    submitRate.textContent = "Submit";

    //when submit is pressed, update post in dataStore
    submitRate.addEventListener("click", async function() {
        const updateRes = await fetch(`/posts/${postId}/rating`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                
                'rating': convertRating(selector.value)
            }) 
        });
        if (!updateRes.ok) {
            console.log(updateRes.error);
            return;
        }
        else{
            let page;
            if(body.id === 'home'){
                page = '';
            }
            if(body.id === 'climbing'){
                page = 'climbing';
            }
            if(body.id === 'hiking'){
                page = 'hiking';
            }
            if(body.id === 'myposts'){
                page = 'myposts';
            }
            const url = `/${page}#post${postId}`;
            console.log(updateRes);
            window.location.href = url;
            location.reload();
        }
    
});

    rateRow.appendChild(submitRate);
    rate.appendChild(rateRow);
    postInfoArea.appendChild(rate);


    //comment collapse section
    const comment = document.createElement('div');
    comment.id = `comment${postId}`;
    comment.className = 'collapse';
    const commentArea = document.createElement('div');
    commentArea.className = 'form-group py-4';

    const commentLabel = document.createElement('label');
    commentLabel.className = 'float-left';
    commentLabel.htmlFor = `commentBox${postId}`;
    commentLabel.textContent = "Comment:";
    commentArea.appendChild(commentLabel);
    const textArea = document.createElement('textarea');
    textArea.className = 'form-control';
    textArea.rows = 5;
    textArea.id = `commentBox${postId}`;
    commentArea.appendChild(textArea);
    const submitComment = document.createElement('button');
    submitComment.className = 'btn btn-sm btn-dark mt-2 float-right';
    submitComment.dataset.toggle = 'collapse';
    submitComment.dataset.target = `comment${postId}`;
    submitComment.textContent = 'Send';

    //When submit is pressed, get postID and make POST req to update dataStore
    submitComment.addEventListener("click", async function() {
        const updateRes = await fetch(`/posts/${postId}/comment`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'comment': textArea.value
            })
        });
        if (!updateRes.ok) {
            console.log(updateRes.error);
            return;
        }
        else{
            let page;
            if(body.id === 'home'){
                page = '';
            }
            if(body.id === 'climbing'){
                page = 'climbing';
            }
            if(body.id === 'hiking'){
                page = 'hiking';
            }
            if(body.id === 'myposts'){
                page = 'myposts';
            }
            const url = `/${page}#post${postId}`;
            console.log(updateRes);
            window.location.href = url;
            location.reload();
        }
});
    commentArea.appendChild(submitComment);
    
    comment.appendChild(commentArea);
    postInfoArea.appendChild(comment);

    //comments collapse section
    const commentsDiv = document.createElement('div');
    commentsDiv.id = `viewComments${postId}`;
    commentsDiv.className = 'collapse mt-5';
    const heading = document.createElement('h1');
    heading.textContent = "Comments";
    commentsDiv.appendChild(heading);
    const commentList = document.createElement('ul');
    commentList.className = 'list-unstyled';
    
    for(const c of comments){
        const commentItem = document.createElement('li');
        commentItem.className = 'media my-4 border p-2';
        const profilePic = document.createElement('img');
        profilePic.src = users[c.author].pfpLink; 
        profilePic.className = 'mr-3 profilePicSize';
        profilePic.alt = 'profile picture';
        const profileName = document.createElement('h5');
        profileName.textContent =  users[c.author].name;
        profileName.className = 'mt-3';
        commentItem.appendChild(profilePic);
        const commentText = document.createElement('p');
        commentText.className = 'ml-4';
        commentText.textContent = c.commentBody;
        commentItem.appendChild(profileName);
        commentItem.appendChild(commentText);
        commentList.appendChild(commentItem);
        
    }
    commentsDiv.appendChild(commentList);
    postInfoArea.appendChild(commentsDiv);
    postBody.appendChild(postInfoArea);
    pageBody.appendChild(postBody);

}

function getAverageRating(ratings){
    if(ratings.length>0){
        let sum = 0;
        for(const rating of ratings){
            sum += rating.rating;
        }
        return (sum/ratings.length);
    }
    else{
        return 0;
    }
    
}

function convertRating (stringVal){
    console.log(stringVal);
    switch(stringVal){
        case '5★':
            return 5;
            
        case '4.5★':
            return 4.5;
        case '4★':
            return 4;
                
        case '3.5★':
            return 3.5;
        case '3★':
            return 3;
                    
        case '2.5★':
            return 2.5;
        case '2★':
            return 2;
                    
        case '1.5★':
            return 1.5;
        case '1★':
            return 1;
                    
        case '0.5★':
            return 0.5;
        case '0★':
            return 0;
                   
    }
    return -1;
}



const form = document.getElementById("createPostForm");
const fileInput = document.getElementById('files');
let fileList = [];
const fileURLS = [];

fileInput.addEventListener('change', function(){
    fileList = [];
    for(const file of fileInput.files){
        fileList.push(file);
        const reader = new FileReader();
  
        reader.addEventListener("load", function () {
        // convert image file to base64 string
        fileURLS.push(reader.result.toString());
        console.log(reader.result);
        }, false);
    
        
        reader.readAsDataURL(file);
        
    }
});


document.getElementById("submitButton").addEventListener("click", async function(event){
    const title = form.elements.title.value;
    const files = fileList;
    const newFiles = [];
    
    let i = 0;
    for(const file of files){
      const tempFile = {
          'lastModified'    : file.lastModified,
          'lastModifiedDate': file.lastModifiedDate,
          'name'       : file.name,
          'size'       : file.size,
          'type'       : file.type,
          'url' : fileURLS[i]
      }; 
      newFiles.push(tempFile);
      ++i;
    }
    console.log(newFiles);
    const type = form.elements.typeOfPost.value;
    const description = form.elements.description.value;
    const tags = form.elements.tags.value;
    if(files.length === 0){
        alert("You must upload an image for your post!");
        event.preventDefault();
    }
    else{
        const res = await fetch('/posts/create', 
        {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                files: newFiles,
                type, 
                description,
                tags
                
            }) 
        });
        const data = await res.json();
        alert("post created: " + JSON.stringify(data));
    }
});