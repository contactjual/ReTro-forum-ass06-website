const allPostData = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts')
    const data = await res.json();
    console.log(data);

    createPost(data);
    // handleCreatePost(postData);

}

const createPost = (data) => {

    const postData = data.posts;

    postData.forEach((singleData) => {
        console.log(singleData);

        const postBasicArea = document.getElementById('post-basic-area');

        const postBasicCard = document.createElement('div');
        postBasicCard.classList.add('post-card');
        postBasicCard.classList.add('flex');
        postBasicCard.style.marginBottom = '20px';

        postBasicCard.innerHTML =
        `<div class="profile-area">
            <div class="active-status">
                <i id="active-color" class="fa-solid fa-circle"></i>
            </div>
            <img style="width: 50px; border-radius: 30%;" src="images/IMG_20241028_111517.jpg"
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
                <div class="right-icon">
                    <i class="fa-regular fa-envelope"></i>
                </div>
            </div>
        </div> `
        
        
        // appen card to the parent div 
        postBasicArea.appendChild(postBasicCard);
        
        // check active status 
        const activeColor = document.getElementById('active-color');
        if (singleData.isActive === true){
            activeColor.style.color = 'green';
        }
        else{
            activeColor.style.color = 'red';
        }


    });
}

const handleCreatePost = (data) => {


}


allPostData()
createPost()
// handleCreatePost(data)