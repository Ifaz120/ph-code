console.log("script is connected");


function getTimeString(time) {

  const hours = parseInt(time/3600);
  const remainingSeconds = time % 3600;
  const minutes = parseInt(remainingSeconds/ 60);
  const seconds = remainingSeconds % 60 ;

  return ` ${hours} hours ${minutes} minutes ${seconds} seconds ago`;
}

const removeActiveClass = () => {
  const buttons =document.getElementsByClassName("category-btn");
  for(let btn  of buttons){
    btn.classList.remove("active");
  }
}
//1- fetch , load and show catagories on html

//create loadcatagories

const loadCatagories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
  .then((res) => res.json())
  .then((data) => displayCatagories(data.categories))
  .catch((error) => console.log(error))
}

const loadVideos = (searchText = "") => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
  .then((res) => res.json())
  .then((data) => displayVideos(data.videos)) 
  .catch((error) => console.log(error)) 
} 

const loadCategoryVideos = id => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
  .then((res) => res.json())
  .then((data) => {
    removeActiveClass();
    const activeBtn = document.getElementById(`btn-${id}`);
    activeBtn.classList.add("active");
    displayVideos(data.category);

  })
  .catch((error) => console.log(error))
};

const loadDetails = async (videoId) => {
  console.log(videoId);
  const uri = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  const res = await fetch(uri);
  const data = await res.json();
  displayDetails(data.video);

}

const displayDetails = (video) =>{
  console.log(video);
  const detailContainer = document.getElementById("modal-content");
  document.getElementById("showModalData").click();
  detailContainer.innerHTML = `
  <img src="${video.thumbnail}" />
  <p>${video.description}</p>
  `;
}

// const cardDemo = {
//   "category_id": "1003",
//   "video_id": "aaak",
//   "thumbnail": "https://i.ibb.co/ZNggzdm/cake.jpg",
//   "title": "Beyond The Pale",
//   "authors": [
//       {
//           "profile_picture": "https://i.ibb.co/MZ2vbXR/jimm.jpg",
//           "profile_name": "Jim Gaffigan",
//           "verified": false
//       }
//   ],
//   "others": {
//       "views": "2.6K",
//       "posted_date": "15400"
//   },
//   "description": "'Beyond The Pale' by Jim Gaffigan, with 2.6K views, is a comedic gem that explores everyday observations and family life with a light-hearted and witty approach. Jim's humor is accessible and delightful, making this show perfect for anyone who enjoys clean, observational comedy."
// }

const displayVideos = (videos) => {
  const videoContainer = document.getElementById("videos");

  videoContainer.innerHTML ="";
  
  if(videos.length == 0 ) {
    videoContainer.classList.remove("grid");
    videoContainer.innerHTML = `
    <div class="min-h-[300px] flex flex-col gap-5 justify-center items-center">
     <img src="assets/Icon.png" />
     <h2 class="text-xl font-bold text-center">NO CONTENT HERE IN THIS CATEGORY</h2>
    </div>

    `;
    return;
  }
  else{
    videoContainer.classList.add("grid");
  }


  videos.forEach( (video) => {
    console.log(video);

    const card = document.createElement("div");
    card.classList ="card shadow-sm";
    card.innerHTML = 
    `
    <figure class="h-[200px] relative">
    <img class="w-full h-full object-cover"
      src=${video.thumbnail}
      alt="Shoes" />
      ${video.others.posted_date?.length == 0 ? "" : `
      <span class="absolute right-2 bottom-2 text-xs text-white bg-black p-1 rounded">${getTimeString(video.others.posted_date)}</span> `
    }
  </figure>
  <div class="px-0 py-2 flex gap-2">
   <div>
    <img class="h-10 w-10 rounded-full object-cover" src=${video.authors[0].profile_picture} alt="" />
   </div>
   <div>
    <h2 class="font-bold">${video.title}</h2>
    <div class="flex items-center gap-2">
     <p class="text-gray-400">${video.authors[0].profile_name} </p>
     ${video.authors[0].verified == true ? `<img class="w-5" src="https://img.icons8.com/?size=100&id=D9RtvkuOe31p&format=png&color=000000" alt="" />` : ""}
    </div>
    <p> <button onclick="loadDetails('${video.video_id}')" class="btn btn-sm btn-error">Details</button></p>
   </div>
  </div> `;
    videoContainer.append(card);
  })
}

//create displaycatagories

const displayCatagories = (categories) => {
  
  const categoryContainer = document.getElementById("categories");

  categories.forEach( (item) => {
    console.log(item);
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
    <button id="btn-${item.category_id}" onclick="loadCategoryVideos(${item.category_id})" class ="btn category-btn">
     ${item.category}
    </button>
    `;
    categoryContainer.append(buttonContainer);
  })
  
}

document.getElementById("search-input").addEventListener("keyup", (e)=> {
  loadVideos(e.target.value);


})

loadCatagories();
loadVideos();