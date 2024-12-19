document.getElementById("closeTabBtn").addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.remove(tabs[0].id);
    });
  });
  