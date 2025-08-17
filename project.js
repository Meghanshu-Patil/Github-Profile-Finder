// function users (username) {
//     return fetch(`https://api.github.com/users/${username}/repos`).then(res => res.json())
// }
let cardBody = document.querySelector(".Card");
let search= document.querySelector(".search");
let usernameinp= document.querySelector(".usernameinp");

function getProfileData(username){
    return fetch(`https://api.github.com/users/${username}`).then(res => 
        {
        if (!res.ok) 
            {
            throw new Error("User not found on GitHub");
            }

        else     return res.json();
        })
}

function getUserRepos(username) {
    return fetch(`https://api.github.com/users/${username}/repos?sort=updated`).then(res=>{
        if(!res.ok)  throw new Error ("Repositories not found for this user");
        return res.json();
    })
}

function cardTemplate(data) {
    console.log(data);
     
    let card =`<!-- Avatar -->
      <img src="${data.avatar_url}" alt="User Avatar"
        class="w-24 h-24 rounded-full border-2 border-blue-500 shadow-md">
      
      <!-- User Info -->
      <div class="flex-1">
        <h2 class="text-2xl font-bold text-white">${data.login}</h2>
        <p class="text-gray-400">@${data.login}</p>
        <p class="mt-2 text-gray-300">Just a friendly GitHub mascot 🐱</p>
        
        <!-- Stats -->
        <div class="mt-4 flex gap-6 text-gray-300">
          <div><span class="font-bold text-white">${data.public_repos}</span> Repos</div>
          <div><span class="font-bold text-white">${data.followers}</span> Followers</div>
          <div><span class="font-bold text-white">${data.following}</span> Following</div>
        </div>
      </div>`

    cardBody.innerHTML= card;
      
}

search.addEventListener("click", function () {
    let username = usernameinp.value.trim();

    getProfileData(username)
        .then((data) => {
            cardTemplate(data);
        })
        .catch((err) => {
            cardBody.innerHTML = `
                <div class="text-red-400 font-semibold">
                    ${err.message}
                </div>
            `;
            console.error(err);
        });
});

