import { viewMyStories, editStory, deleteStory } from "./api_calls.js";

document.addEventListener("DOMContentLoaded", async () => {
  let stories = await viewMyStories();
  outputMyStories(stories);

  var deleteIntervalId = window.setInterval(deletee, 50);
  var editIntervalId = window.setInterval(edit, 50);

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

  function edit() {
    var edit = document.getElementsByClassName("edit-button");
    var prevStoryContent;

    for (var i = 0; i < edit.length; i++) {
      // console.log("Button index:", edit[i]);

      edit[i].addEventListener("click", function (e) {
        var storyId = this.dataset.id;
        // console.log("STORY ID -> " + this.dataset.id);

        var contentField = document.getElementById(storyId);
        var storyContent =
          contentField.nodeName == "P"
            ? contentField.innerHTML
            : contentField.value;

        if (this.innerHTML === "Save") {
          if (prevStoryContent !== storyContent) {
            // If the content has not changed, no need to call API to save
            prevStoryContent = storyContent;
            editStory(storyId, storyContent);
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
      });
    }
    clearInterval(editIntervalId);
  }
  function deletee() {
    var del = document.getElementsByClassName("delete-button");
    for (var i = 0; i < del.length; i++) {
      let currentStoryId = del[i].dataset.id;
      del[i].addEventListener("click", async (e) => {
        let data = await deleteStory(currentStoryId);
        if (data["success"]) {
          location.reload();
        } else {
          // alert(data["details"]);
          alert("beufsdfdsf");
        }
      });
    }
    clearInterval(deleteIntervalId);
  }
});
