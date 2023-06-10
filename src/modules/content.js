// console.log(document.querySelector("html"));

// const body = document.body;
// console.log(document.body.firstElementChild);
// console.log(body.querySelector("span.list__content"));
// console.log(document.body);
// console.log(body.querySelector(".container"));
// const container = body.querySelector(".container");
// console.log(container);
// const section = document.body.querySelector("section.section");
// console.log(section);
// console.log(container.querySelector("span.list__content"));

// const frame = document.querySelector(".packages-mount-point-style-iframe");
// const content = frame.contentDocument;
// const targetElement = document.querySelector(
//   '[data-testid="admin-triggers-iframe"]'
// );
//
// const nextFrame = targetElement.contentDocument;

// const conditionToCheck = document.querySelector(".list__content");
// console.log(conditionToCheck);
// const page = document.querySelector(".page");
// console.log(page);
// const conditionToCheck = page.querySelector(".list__content");
// console.log(conditionToCheck);
//

// function runCodeWhenIframeLoaded() {
//   const iframe = document.querySelector(
//     'iframe[data-testid="admin-triggers-iframe"]'
//   );
//
//   function handleIframeLoad() {
//     const observer = new MutationObserver(function (mutationsList) {
//       for (let mutation of mutationsList) {
//         if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
//           // Check if the added node matches the desired element
//           const conditionToCheck =
//             iframe.contentDocument.querySelector(".list__content");
//           if (conditionToCheck) {
//             observer.disconnect(); // Stop observing once the element is found
//             console.log("Iframe is loaded, and condition is met!");
//             // Your code here that should run when the iframe is fully loaded and the element is available
//           }
//         }
//       }
//     });
//
//     // Start observing the iframe's contentDocument for changes
//     observer.observe(iframe.contentDocument, {
//       childList: true,
//       subtree: true,
//     });
//   }
//
//   // Add the load event listener to the iframe
//   iframe.addEventListener("load", handleIframeLoad);
// }
//
// // Call the function to start monitoring the iframe's load event and wait for the element
// runCodeWhenIframeLoaded();

// this does not do anything
// document.addEventListener("DOMContentLoaded", function () {
//   const element = document.body.querySelector("span.list__content");
//   console.log(element);
// });
//
// this prints null
// const element = document.querySelector("span.list__content");
// console.log(element);
//
// this works! But prints too many statements
// const observer = new MutationObserver(function (mutationsList) {
//   for (let mutation of mutationsList) {
//     if (mutation.type === "childList") {
//       const element = document.body.querySelector("span.list__content");
//       if (element) {
//         observer.disconnect(); // Stop observing once the element is found
//         console.log(element);
//       }
//     }
//   }
// });

// observer.observe(document.body, { childList: true, subtree: true });

// NOTE: a second version to prevent useless iterations

// const observer = new MutationObserver(function (mutationsList) {
//   for (let mutation of mutationsList) {
//     if (mutation.type === "childList") {
//       const element = document.body.querySelector("span.list__content");
//       if (element) {
//         console.log(element);
//         observer.disconnect(); // Stop observing once the element is found
//         break; // Exit the loop after finding the element
//       }
//     }
//   }
// });

// observer.observe(document.body, { childList: true, subtree: true });
//
//
//
// NOTE: this works perfectly

// const observer = new MutationObserver(function (mutationsList) {
//   for (let mutation of mutationsList) {
//     if (mutation.type === "childList") {
//       const parentDiv = document.body.querySelector(".trigger-conditions--all");
//       if (parentDiv) {
//         const spans = parentDiv.querySelectorAll("span.list__content");
//         const conditions = new Set();
//         let duplicateFound = false;
//
//         for (let span of spans) {
//           const condition = span.innerHTML; // or span.innerText, depending on your requirement
//
//           if (conditions.has(condition)) {
//             console.log("Duplicate condition found:", condition);
//             duplicateFound = true;
//             break;
//           }
//
//           conditions.add(condition);
//         }
//
//         if (duplicateFound) {
//           observer.disconnect(); // Stop observing once a duplicate is found
//         }
//       }
//     }
//   }
// });
//
// observer.observe(document.body, { childList: true, subtree: true });

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
