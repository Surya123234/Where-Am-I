import { viewAllStories } from "./API_Calls.js";

outputAllStories();

async function outputAllStories() {
  let stories = await viewAllStories();
  console.log("STORIES ARE " + stories);
  var wrapper = document.getElementById("all-stories-wrapper");
  var items = ``;
  if (stories === null) {
    items = `
        <div class="story--title">
            <h1>No stories have been created. What are you waiting for? Be the first to create one
                <a href="/create_story">Here!</a>
            </h1>
        </div>
      `;
  } else {
    for (var story in stories) {
      console.log("Story:", stories[story]);
      var item = `
        <div class="story--container">
          <div class="story--title">
            <h2>${stories[story].title}</h2>
          </div>
          <div class="story--content">
            <p> ${stories[story].content}</p>
          </div>
          <div class="story--created-by">
            <p><strong>Created by: ${stories[story].created_by}</strong></p>
          </div>
          <hr>
        </div>
        `;
      items += item;
    }
    wrapper.innerHTML = items;
  }
}
