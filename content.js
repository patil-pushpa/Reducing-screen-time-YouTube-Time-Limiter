let startTime;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "startTimer") {
    startTime = new Date().getTime();
  }
});

// Check if the modal should be displayed or not imediately
const modalDisplayed = sessionStorage.getItem("modalDisplayed");

if (modalDisplayed !== "true") {
  setInterval(() => {
    const currentTime = new Date().getTime();
    const elapsedTime = (currentTime - startTime) / 1000; // Convert to seconds

    const limitSeconds = 60; // (60 seconds = 1 minutes)
    if (elapsedTime > limitSeconds) {
      const overlay = document.createElement("div");
      overlay.style.position = "fixed";
      overlay.style.top = "0";
      overlay.style.left = "0";
      overlay.style.width = "100%";
      overlay.style.height = "100%";
      overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
      overlay.style.zIndex = "9999";

      const modal = document.createElement("div");
      modal.style.position = "fixed";
      modal.style.top = "50%";
      modal.style.left = "50%";
      modal.style.transform = "translate(-50%, -50%)";
      modal.style.backgroundColor = "black";
      modal.style.padding = "20px";
      modal.style.border = "2px solid black";
      modal.style.zIndex = "10000";
      modal.innerHTML = `
        <div style="text-align: center;">
          <img width="48" height="48" src="https://img.icons8.com/color/48/error--v1.png" alt="error--v1"/>
          <h2 style="margin-top: 20px; margin-bottom: 10px; font-size: 24px; color: white;">You've exceeded the time limit!</h2>
          <p style="margin-bottom: 20px; font-size: 18px; color: #666666;">Please close the tab.</p>
          <button id="closeTabBtn" style="background-color: #ff4444; color: #ffffff; border: none; padding: 10px 20px; font-size: 16px; cursor: pointer; border-radius: 5px;">Close Tab</button>
        </div>`;

      overlay.appendChild(modal);
      document.body.appendChild(overlay);

      sessionStorage.setItem("modalDisplayed", "true");

      modal.querySelector("#closeTabBtn").addEventListener("click", function () {
        chrome.runtime.sendMessage({ action: "closeTab" });
        overlay.remove();
      });
    }
  }, 1000);
} else {
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  overlay.style.zIndex = "9999";

  const modal = document.createElement("div");
  modal.style.position = "fixed";
  modal.style.top = "50%";
  modal.style.left = "50%";
  modal.style.transform = "translate(-50%, -50%)";
  modal.style.backgroundColor = "black";
  modal.style.padding = "20px";
  modal.style.border = "2px solid black";
  modal.style.zIndex = "10000";
  modal.innerHTML = `
    <div style="text-align: center;">
      <img width="48" height="48" src="https://img.icons8.com/color/48/error--v1.png" alt="error--v1"/>
      <h2 style="margin-top: 20px; margin-bottom: 10px; font-size: 24px; color: white;">You've exceeded the time limit!</h2>
      <p style="margin-bottom: 20px; font-size: 18px; color: #666666;">Please close the tab.</p>
      <button id="closeTabBtn" style="background-color: #ff4444; color: #ffffff; border: none; padding: 10px 20px; font-size: 16px; cursor: pointer; border-radius: 5px;">Close Tab</button>
    </div>`;

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  sessionStorage.setItem("modalDisplayed", "true");

  modal.querySelector("#closeTabBtn").addEventListener("click", function () {
    chrome.runtime.sendMessage({ action: "closeTab" });
    overlay.remove();
  });
}
