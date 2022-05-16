document.addEventListener("DOMContentLoaded", () => {
  viewMyStories();
  var intervalId = window.setInterval(deleteStory, 50);
  function deleteStory() {
    var del = document.getElementsByClassName("delete-button");
    for (var i = 0; i < del.length; i++) {
      console.log(del[i]);
      del[i].addEventListener("click", function (e) {
        storyId = this.dataset.id;
        var url = `http://127.0.0.1:8000/api/v1/delete_story/${storyId}`;
        var csrftoken = getCookie("csrftoken");
        fetch(url, {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            "X-CSRFToken": csrftoken,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Data:", data);
            if (data["success"]) {
              window.location.href = "/my_stories/";
              alert(data["details"]);
            } else {
              alert(data["details"]);
            }
          });
      });
    }
    clearInterval(intervalId);
  }
  console.log("everything outputted");
});

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
            <a class="btn btn-warning edit-button" >Edit Story</a>
            <a class="btn btn-danger delete-button" data-id=${stories[story].id}>Delete Story</a>
          </div>
          <hr>
        </div>
        `;
      items += item;
    }
    wrapper.innerHTML = items;
  }
}
// href="/update_story/${stories[story].id}"
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
