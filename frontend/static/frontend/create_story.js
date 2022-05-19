window.onload = () => {
  const csrftoken = getCookie("csrftoken");
  var submitBtn = document.getElementById("story-create-submit");
  if (submitBtn) {
    submitBtn.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("Submitting form...");
      var title = document.getElementById("id_title").value;
      var content = document.getElementById("id_content").value;
      if (isFormValid(title, content)) {
        createStory(csrftoken, title, content);
        console.log("Submission successful!");
      } else {
        alert("Please ensure both fields are not blank!");
        console.log("Submission unsuccessful!");
        return;
      }
    });
  }
};

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

function isFormValid(title, content) {
  return title && content;
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
