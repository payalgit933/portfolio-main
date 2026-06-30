// Generate or reuse session ID
let sessionId = localStorage.getItem("session_id");

if (!sessionId) {
  sessionId = crypto.randomUUID();
  localStorage.setItem("session_id", sessionId);
}

// Backend URL
const API_URL = "https://user-analytics-app-lhpn.onrender.com/events";

// Function to send events
function sendEvent(eventData) {
  fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  })
    .then((res) => res.json())
    .then((data) => console.log("Tracked:", data))
    .catch((err) => console.error("Tracking Error:", err));
}

// Track page view
window.addEventListener("load", () => {
  sendEvent({
    sessionId: sessionId,
    eventType: "page_view",
    pageUrl: window.location.href,
    timestamp: new Date().toISOString(),
  });
});

// Track clicks
document.addEventListener("click", (e) => {
  sendEvent({
    sessionId: sessionId,
    eventType: "click",
    pageUrl: window.location.href,
    x: e.clientX,
    y: e.clientY,
    timestamp: new Date().toISOString(),
  });
});