console.log("script is connected");


function getTimeString(time) {

  const hours = parseInt(time/3600);
  const remainingSeconds = time % 3600;
  const minutes = parseInt(remainingSeconds/ 60);
  const seconds = remainingSeconds % 60 ;

  return ` ${hours} hours ${minutes} minutes ${seconds} seconds ago`;
}



//1- fetch , load and show catagories on html

//create loadcatagories

const loadCatagories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
  .then((res) => res.json())
  .then((data) => displayCatagories(data.categories))
  .catch((error) => console.log(error))
}

const loadVideos = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
  .then((res) => res.json())
  .then((data) => displayVideos(data.videos)) 
  .catch((error) => console.log(error))
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
      <span class="absolute right-2 bottom-2 text-white bg-black p-1 rounded">${getTimeString(video.others.posted_date)}</span> `
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
    <p></p>
   </div>
  </div> `;
    videoContainer.append(card);
  })
}

//create displaycatagories

const displayCatagories = (categories) => {
  
  const categoryContainer = document.getElementById("categories");

  categories.forEach( item => {
    console.log(item);
    const button = document.createElement("button");
    button.classList = "btn ";
    button.innerText = item.category;
    categoryContainer.append(button);
  })
  
}

loadCatagories();
loadVideos();