const observer = new MutationObserver(function (mutationsList) {
  for (let mutation of mutationsList) {
    if (mutation.type === "childList") {
      const parentDiv = document.body.querySelector(".trigger-conditions--all");
      if (parentDiv) {
        const spans = parentDiv.querySelectorAll("span.list__content");
        const conditions = new Set();
        let duplicateFound = false;

        for (let span of spans) {
          const condition = span.innerHTML; // or span.innerText, depending on your requirement

          if (conditions.has(condition)) {
            console.log("Duplicate condition found:", condition);
            duplicateFound = true;
            break;
          }

          conditions.add(condition);
        }

        if (duplicateFound) {
          observer.disconnect(); // Stop observing once a duplicate is found
          showAlert(); // Show alert notification
        }
      }
    }
  }
});

observer.observe(document.body, { childList: true, subtree: true });

function showAlert() {
  alert("Duplicate condition found!");
  // const notificationOptions = {
  //   type: "basic",
  //   iconUrl: "path/to/icon.png",
  //   title: "Duplicate Condition Found",
  //   message: "A duplicate condition has been detected.",
  // };

  chrome.notifications.create("", notificationOptions);
}
