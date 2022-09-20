import { createStory } from "./api_calls.js";

window.onload = () => {
  var submitBtn = document.getElementById("story-create-submit");
  if (submitBtn) {
    submitBtn.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("Submitting form...");
      var title = document.getElementById("id_title").value;
      var content = document.getElementById("id_content").value;
      if (isFormValid(title, content)) {
        createStory(title, content);
        console.log("Submission successful!");
        window.location.href = "/my_stories/";
      } else {
        alert("Please ensure both fields are not blank!");
        console.log("Submission unsuccessful!");
        return;
      }
    });
  }
};

function isFormValid(title, content) {
  return title && content;
}
