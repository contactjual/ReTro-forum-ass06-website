const allPostData = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts')
    const data = await res.json();
    // console.log(data);

    createPost(data);
    readPostShow(data);
}

const createPost = (data) => {

    const postData = data.posts;

    postData.forEach((singleData) => {
        // console.log(singleData);

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
                <div style= "cursor: pointer;" onclick="readPostShow()" class="right-icon">
                    <i class="fa-regular fa-envelope"></i>
                </div>
            </div>
        </div> `


        // appen card to the parent div 
        postBasicArea.appendChild(postBasicCard);

        checkActiveStatus(singleData)

    });
};



// --------------------------PROBLEM-------------------------------------------

// check active status 
const checkActiveStatus = (singleData) => {
    const activeColor = document.querySelectorAll('.prof-status');

    // console.log(singleData.isActive);
    // console.log(activeColor);

    activeColor.forEach((color) => {
        if (singleData.isActive === true) {
            color.style.color = 'green'
        }
        else {
            color.style.color = 'red'
        }
    });
};

// -----------------------------------------------------------------------------



// ----------------------PROBLEM--------------------------------------------------

const findId = (id) => {

}

// read-post-record
const readPostShow = (data) => {

    // findId(id);

    const readPostRecored = document.getElementById('read-post-data');

    const readPostRecoredCard = document.createElement('div');
    readPostRecoredCard.classList.add('read-card');
    readPostRecoredCard.innerHTML = `
                            <div class="reading-details flex">
                                <div class="reading-tite">
                                    <p>10 Kids Unaware of Their Halloween Costume</p>
                                </div>
                                <div class="vew-counting flex">
                                    <i class="fa-regular fa-eye"></i>
                                    <span>1,568</span>
                                </div>
                            </div> `

    readPostRecored.appendChild(readPostRecoredCard);
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

}


// search here input 

const searchInput = () => {
    const inputField = document.getElementById('input-field');
    const inputValue = inputField.value;
    console.log(inputValue);

    getSearchingData(inputValue);
};


const getSearchingData = async (inputValue) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${inputValue}`);
    const newData = await res.json();
    console.log(newData);

}






allPostData();
letestData();