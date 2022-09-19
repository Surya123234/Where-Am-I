function getTribeInfo(fullName, slugName) {
  console.log("before GET tribe info api call");
  return new Promise((resolve, reject) => {
    try {
      $.ajax({
        type: "GET",
        url: "/api/v1/tribe_summary",
        data: {
          full_name: fullName,
          slug_name: slugName,
        },
        dataType: "json",
        success: function (data) {
          console.log("before SHOW tribe info api call");
          resolve(data);
        },
        failure: function (data) {
          alert(`Error: ${data.error}`);
        },
      });
    } catch (err) {
      reject(err);
    }
  });
}

// function showPosition(position) {
//   // sending coordinates to backend
//   let lat = position.coords.latitude.toFixed(2);
//   let long = position.coords.longitude.toFixed(2);
//   $.ajax({
//     type: "GET",
//     url: "/api/v1/find_closest_territory",
//     data: {
//       lat: lat,
//       long: long,
//     },
//     dataType: "json",
//     success: function (data) {
//       getTribeInfo(data.name);
//     },
//     failure: function (data) {
//       alert(`Failure, please try again! The error was: ${data.error}`);
//     },
//   });
// }

function viewAllStories() {
  var url = "/api/v1/view_stories/";
  return new Promise((resolve, reject) => {
    try {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log("Data:", data);
          resolve(data);
        });
    } catch (err) {
      reject(err);
    }
  });
}

function deleteStory() {
  var del = document.getElementsByClassName("delete-button");
  for (var i = 0; i < del.length; i++) {
    console.log(del[i]);
    del[i].addEventListener("click", function (e) {
      var storyId = this.dataset.id;
      var url = `/api/v1/delete_story/${storyId}`;
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

    edit[i].addEventListener("click", function (e) {
      var storyId = this.dataset.id;
      var contentField = document.getElementById(storyId);
      var storyContent =
        contentField.nodeName == "P"
          ? contentField.innerHTML
          : contentField.value;

      if (this.innerHTML === "Save") {
        if (prevStoryContent !== storyContent) {
          // If the content has not changed, no need to call API to save
          prevStoryContent = storyContent;
          csrftoken = getCookie("csrftoken");
          var url = "/api/v1/update_story/";
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
            });
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

function viewMyStories() {
  var url = "/api/v1/my_stories/";
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log("Data:", data);
      outputMyStories(data);
    });
}

function createStory(csrftoken, title, content) {
  var url = "/api/v1/create_story/";
  fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "X-CSRFToken": csrftoken,
    },
    body: JSON.stringify({ title: title, content: content }),
  }).then(() => {
    window.location.href = "/my_stories/";
  });
}

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

export { getTribeInfo, viewAllStories };
