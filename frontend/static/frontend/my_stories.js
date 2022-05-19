document.addEventListener("DOMContentLoaded", () => {
  viewMyStories();
  var deleteIntervalId = window.setInterval(deleteStory, 50);
  var editIntervalId = window.setInterval(editStory, 50); // TODO: Finish Edit story... Make it like jira, where as soon as you press edit btn, it allows you to do it in real time (like jira)
  function deleteStory() {
    var del = document.getElementsByClassName("delete-button");
    for (var i = 0; i < del.length; i++) {
      console.log(del[i]);
      del[i].addEventListener("click", function (e) {
        var storyId = this.dataset.id;
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
    clearInterval(deleteIntervalId);
  }
  function editStory() {
    var edit = document.getElementsByClassName("edit-button");
    var prevStoryContent;

    for (var i = 0; i < edit.length; i++) {
      console.log("Button index:", edit[i]);

      // AFTER THIS

      edit[i].addEventListener("click", function (e) {
        var storyId = this.dataset.id;
        var contentField = document.getElementById(storyId);
        var storyContent =
          contentField.nodeName == "P"
            ? contentField.innerHTML
            : contentField.value;

        if (this.innerHTML === "Save") {
          console.log("content Field before object assign:", contentField);
          // var storyContent = contentField.innerHTML;

          // here, check if new innerHtml.trim() is the same as prev storyContent... if it is, no need to call API to save, just return; Else, call api to update
          if (prevStoryContent !== storyContent) {
            // DOESN'T WORK???
            // console.log("CHANGED:", storyContent);
            prevStoryContent = storyContent;
            csrftoken = getCookie("csrftoken");
            var url = "http://127.0.0.1:8000/api/v1/update_story/";
            fetch(url, {
              method: "PATCH",
              headers: {
                "Content-type": "application/json",
                "X-CSRFToken": csrftoken,
              },
              body: JSON.stringify({
                id: storyId,
                content: storyContent,
              }),
            })
              .then((response) => response.json())
              .then((data) => {
                console.log("PATCH data:", data);
                // window.location.reload();
              });
          } else {
            alert("they are the same bruh?");
          }

          this.innerHTML = "Edit Story";
          const paragraphContentField = Object.assign(
            document.createElement("p"),
            {
              id: storyId,
              innerHTML: storyContent,
            }
          );
          contentField.replaceWith(paragraphContentField);
        } else {
          // innerHTML === "Edit Story"
          console.log("content Field before object assign:", contentField);
          prevStoryContent = storyContent;
          this.innerHTML = "Save";
          //storyContent = contentField.innerHTML;
          const textareaContentField = Object.assign(
            document.createElement("textarea"),
            {
              id: storyId,
              value: storyContent,
              innerHTML: storyContent,
              readOnly: false,
            }
          );
          contentField.replaceWith(textareaContentField);
        }
        console.log("ORIGINAL:", prevStoryContent);
        console.log("CHANGED:", storyContent);
        //   <div class="story--content">
        //   <textarea id=${stories[story].id} readonly> ${stories[story].content}</textarea>
        // </div>
      });
    }
    clearInterval(editIntervalId);
  }
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
  if (stories.length === 0) {
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
            <p id=${stories[story].id}> ${stories[story].content}</p>
          </div>
          <div class="story--links">
            <a class="btn btn-warning edit-button" data-id=${stories[story].id} >Edit Story</a>
            <a class="btn btn-danger delete-button" data-id=${stories[story].id} >Delete Story</a>
          </div>
          <hr>
        </div>
        `;
      items += item;
    }
  }
  wrapper.innerHTML = items;
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
