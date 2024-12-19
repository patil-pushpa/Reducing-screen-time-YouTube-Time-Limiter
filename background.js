chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "closeTab") {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.remove(tabs[0].id, function () {
          console.log("Tab closed");
        });
      });
    }
  });
  
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url && typeof changeInfo.url === "string") {
      if (changeInfo.url && changeInfo.url.includes("youtube.com")) {
        chrome.tabs.sendMessage(tabId, { action: "startTimer", site: "youtube" });
      } else if (changeInfo.url.includes("chat.openai.com")) {
        chrome.tabs.sendMessage(tabId, { action: "startTimer", site: "openai" });
      }
    }
  });
  