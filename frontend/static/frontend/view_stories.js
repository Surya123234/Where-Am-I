viewStories();

function viewStories() {
  var url = "http://127.0.0.1:8000/api/v1/view_stories/";
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log("Data:", data);
      outputStories(data);
    });
}

function outputStories(stories) {
  var wrapper = document.getElementById("item-wrapper");
  var items = ``;
  if (stories === null) {
    items = `
        <h1>No stories have been created. What are you waiting for? Be the first to create one
            <a href="/create_story">Here!</a>
        </h1>
      `;
  } else {
    for (var story in stories) {
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
