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

function getClosestTribe(position) {
  // sending coordinates to backend
  let lat = position.coords.latitude.toFixed(2);
  let long = position.coords.longitude.toFixed(2);
  $.ajax({
    type: "GET",
    url: "/api/v1/find_closest_territory",
    data: {
      lat: lat,
      long: long,
    },
    dataType: "json",
    success: function (data) {
      getTribeInfo(data.name);
    },
    failure: function (data) {
      alert(`Failure, please try again! The error was: ${data.error}`);
    },
  });
}

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

function viewMyStories() {
  var url = "/api/v1/my_stories/";
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

function editStory(storyId, storyContent) {
  return new Promise((resolve, reject) => {
    try {
      let csrftoken = getCookie("csrftoken");
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
          resolve(data);
        });
    } catch (err) {
      reject(err);
    }
  });
}

function deleteStory(storyId) {
  return new Promise((resolve, reject) => {
    try {
      var url = `/api/v1/delete_story/${storyId}`;
      let csrftoken = getCookie("csrftoken");
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
          resolve(data);
        });
    } catch (err) {
      reject(err);
    }
  });
}

function createStory(title, content) {
  return new Promise((resolve, reject) => {
    try {
      let csrftoken = getCookie("csrftoken");
      var url = "/api/v1/create_story/";
      fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "X-CSRFToken": csrftoken,
        },
        body: JSON.stringify({ title: title, content: content }),
      }).then((data) => {
        resolve(data);
      });
    } catch (err) {
      reject(err);
    }
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

export {
  getTribeInfo,
  getClosestTribe,
  viewAllStories,
  viewMyStories,
  editStory,
  deleteStory,
  createStory,
};
