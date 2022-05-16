viewMyStories();

function viewMyStories() {
  var url = "http://127.0.0.1:8000/api/v1/my_stories/";
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log("Data:", data);
      outputMyStories(data);
    });
}

function outputMyStories(stories) {
  var wrapper = document.getElementById("my-stories-wrapper");
  var items = ``;
  if (stories === null) {
    items = `
        <div class="story--title">
            <h1>You have created no stories. What are you waiting for? Create one
                <a href="/create_story">Here!</a>
            </h1>
        </div>
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
          <div class="story--links">
            <a  class="btn btn-warning" href="/update_story/${stories[story].id}">Edit Story</a>
            <a class="btn btn-danger" href="/delete_story/${stories[story].id}">Delete Story</a>
          </div>
          <hr>
        </div>
        `;
      items += item;
    }
    wrapper.innerHTML = items;
  }
}
