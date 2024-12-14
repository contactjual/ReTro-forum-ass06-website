const allPostData = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts`)
    const data = await res.json();
    // console.log(data);

    const postData = data.posts;

    postData.forEach((singleData) => {
        // console.log(singleData);
        creatPostCard(singleData);
        checkActiveStatus(singleData);
    });
};





// creat post card by difult or searching data
function creatPostCard(singleData) {
    const postBasicArea = document.getElementById('post-basic-area');

    const postBasicCard = document.createElement('div');
    postBasicCard.classList.add('post-card');
    postBasicCard.classList.add('flex');
    postBasicCard.style.marginBottom = '20px';

    postBasicCard.innerHTML =
        `<div class="profile-area">
    <div class="active-status">
    <i class="fa-solid fa-circle prof-status"></i>
    </div>
    <img style="width: 50px; border-radius: 30%;" src="${singleData.image}"
    alt="">
    </div>
    <div class="content-area">
    <div class="catagory-author">
    <span># ${singleData.category}</span>
                <span>Author : ${singleData.author.name}</span>
                </div>
                <div class="post-title">
                <h4>${singleData.title}</h4>
                </div>
                <div class="post-discription">
                <p>${singleData.description}</p>
                </div>
                <!-- dashed border-bottom  -->
                <div class="icon-counting-area flex">
                <div class="left-icons flex">
                <div class="icon">
                <i class="fa-regular fa-comment-dots"></i>
                <span>${singleData.comment_count}</span>
                </div>
                <div class="icon">
                <i class="fa-regular fa-eye"></i>
                <span>${singleData.view_count}</span>
                </div>
                <div class="icon">
                <i class="fa-regular fa-clock"></i>
                        <span>${singleData.posted_time} min</span>
                    </div>
                    </div>
                    <div style= "cursor: pointer;" onclick="readPostHandle('${singleData.id}')" class="right-icon">
                    <i class="fa-regular fa-envelope"></i>
                    </div>
                    </div>
                    </div> `

    // appen card to the parent div 
    postBasicArea.appendChild(postBasicCard);
};


// --------------------------PROBLEM SOLVED-------------------------------------------

// check active status 
const checkActiveStatus = (singleData) => {

    const color = document.getElementsByClassName('prof-status');
    const lastClass = color[color.length - 1];
    // console.log(lastClass);

    if (singleData.isActive === true) {
        lastClass.style.color = 'green';
    }
    else if (singleData.isActive === false) {
        lastClass.style.color = 'red';
    }
};

// -----------------------------------------------------------------------------



// ----------------------PROBLEM SOLVED--------------------------------------------------


// read post handle 
const readPostHandle = async (id) => {
    console.log(id);
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts')
    const dataById = await res.json();
    const posts = dataById.posts;

    const post = posts.find(singleData => singleData.id === parseInt(id));
    // console.log(post)

    readPostShow(post)
    setApiSingleDataLocalStorage(post);
}


// read-post-record
let a = 0;
const readPostShow = (post) => {
    const readPostRecored = document.getElementById('read-post-data');

    const readPostRecoredCard = document.createElement('div');
    readPostRecoredCard.classList.add('read-card');
    readPostRecoredCard.innerHTML = `
                    <div class="reading-details flex" style= "gap=10px">
                        <div class="reading-tite">
                            <p>${post.title || 'No post add to read yet'}</p>
                        </div>
                        <div class="vew-counting flex">
                            <i class="fa-regular fa-eye"></i>
                            <span>${post.view_count || 0}</span>
                        </div>
                    </div> `;

    readPostRecored.appendChild(readPostRecoredCard);


    // add read post number 
    a++
    const readPostCountElement = document.getElementById('read-post-count');
    readPostCountElement.innerText = a;
};

// -------------------------------------------------------------------------------------------




// Latest Posts 

const letestData = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const lastData = await res.json();

    createLatestPost(lastData)
};

const createLatestPost = (lastData) => {

    lastData.forEach((singleLastestData) => {

        // console.log(singleLastestData);

        const letestPostCardArea = document.getElementById('latest-post-card-area');
        const createCard = document.createElement('div');
        createCard.classList.add('card')
        createCard.innerHTML =
            `<img style="width: 100%;" src="${singleLastestData.cover_image}" alt="">
        <div class="date">
        <i class="fa-regular fa-calendar"></i>
        <span>${singleLastestData.author.posted_date || 'Not Published'}</span>
        </div>
        <div class="title">
        <h4>${singleLastestData.title}</h4>
        <p>${singleLastestData.description}</p>
        </div>
        <div class="profile flex">
        <img style="width: 45px; border-radius: 50%;" src="${singleLastestData.profile_image}" alt="">
        <div class="name-details">
        <h5>${singleLastestData.author.name}</h5>
        <span>${singleLastestData.author.designation || 'Unknown'}</span>
        </div>
        </div> `;

        letestPostCardArea.appendChild(createCard);
    });
};



// search here input 

const searchInput = () => {
    const inputField = document.getElementById('input-field');
    const inputValue = inputField.value;
    // console.log(inputValue);

    // leading spinner  start
    loadingSpinnerCreate();
    getSearchingData(inputValue);
};


const getSearchingData = async (inputValue) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${inputValue}`);
    const newData = await res.json();
    const makePostData = newData.posts;

    if (makePostData.length !== 0) {
        // eikhane ami 'creatPostCard' function data golo delete korbo 
        const postBasicArea = document.getElementById('post-basic-area');
        postBasicArea.innerHTML = '';

        console.log(makePostData)
        makePostData.forEach((makeSingleData) => {

            // leading spinner  close
            const getSpinnerContainerEliment = document.getElementById('leading-spinner');
            getSpinnerContainerEliment.innerHTML = '';


            // creatSearchedPost(makeSingleData);
            creatPostCard(makeSingleData);
            checkActiveStatus(makeSingleData);
        });
    }
    else {
        // eikhane ami 'creatPostCard' function data golo delete korbo 
        const postBasicArea = document.getElementById('post-basic-area');
        postBasicArea.innerHTML = '';

        // leading spinner  close
        const getSpinnerContainerEliment = document.getElementById('leading-spinner');
        getSpinnerContainerEliment.innerHTML = '';

        // show to UI 'No post found for this search'
        const postBasicAreaFound = document.getElementById('post-basic-area');

        const postBasicCard = document.createElement('div');
        postBasicCard.classList.add('post-card');
        postBasicCard.classList.add('flex');
        postBasicCard.style.marginBottom = '20px';

        postBasicCard.innerHTML = `<h2>No post found for this search</h2>`

        // appen card to the parent div 
        postBasicAreaFound.appendChild(postBasicCard);
    };
};


function loadingSpinnerCreate() {
    const getSpinnerContainerEliment = document.getElementById('leading-spinner');
    const createDiv = document.createElement('div');
    createDiv.style.textAlign = 'center'

    // createDiv.innerHTML = `
    //     <span class="loading loading-dots loading-xs"></span>
    //     <span class="loading loading-dots loading-sm"></span>
    //     <span class="loading loading-dots loading-md"></span>
    // `;

    createDiv.innerHTML = `<h1> Loding Post... </h1>`;

    getSpinnerContainerEliment.appendChild(createDiv);
};






// set to localStorage

function setApiSingleDataLocalStorage(post) {

    let myPostDataContainer = JSON.parse(localStorage.getItem('posts')) || [];

    // converted to array 
    if (!Array.isArray(myPostDataContainer)) {
        myPostDataContainer = [];
    }   

    myPostDataContainer.push(post);



    const convertStringifyPost = JSON.stringify(myPostDataContainer);
    localStorage.setItem('posts', convertStringifyPost);

    console.log(myPostDataContainer);
}


// get from localStorage

function getApiSingleDataFromLocalStorage() {
    const getPost = localStorage.getItem('posts');
    if (getPost) {
        const savedPostParse = JSON.parse(getPost);
        savedPostParse.forEach((mySiglePost) => {
            readPostShow(mySiglePost);
        });
    }
    else {
        console.log('No data found');
    }
}








allPostData();
getApiSingleDataFromLocalStorage();
letestData();