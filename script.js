const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");

// Memory (store user name here)
let userName = localStorage.getItem("chatUserName") || null;

// Dataset: categories with multiple responses
const responses = {
  greetings: [
    "Hello! 👋 How are you today?",
    "Hey there! 😊",
    "Hi! Nice to meet you!"
  ],
  farewell: [
    "Goodbye! Have a wonderful day 🌸",
    "See you later 👋",
    "Take care! 🚀"
  ],
  howareyou: [
    "I’m just a bot, but I’m feeling awesome 😎",
    "Doing great, thanks for asking!",
    "I’m fine, how about you?"
  ],
  name: [
    "I’m your friendly AI chatbot 🤖",
    "People call me SmartBot!",
    "I’m a simple chatbot built for this hackathon 🚀"
  ],
  thanks: [
    "You're welcome! 😊",
    "Anytime!",
    "Glad I could help!"
  ],
  default: [
    "Hmm, I’m not sure about that 🤔",
    "Can you rephrase?",
    "Interesting! Tell me more..."
  ]
};

// Function to get response
function getResponse(message) {
  message = message.toLowerCase();

  // Detect if user is telling their name
  if (message.startsWith("my name is")) {
    userName = message.replace("my name is", "").trim();
    localStorage.setItem("chatUserName", userName);
    return `Nice to meet you, ${userName}! 🎉 I’ll remember your name.`;
  }

  if (message.match(/\b(hi|hello|hey)\b/)) {
    return userName 
      ? `Hello ${userName}! 👋 How are you today?` 
      : random(responses.greetings);
  }

  if (message.match(/\b(bye|goodbye|see you)\b/)) return random(responses.farewell);
  if (message.match(/\b(how are you|how r u|how do you do)\b/)) return random(responses.howareyou);
  if (message.match(/\b(your name|who are you)\b/)) return random(responses.name);
  if (message.match(/\b(thank|thanks|thank you)\b/)) return random(responses.thanks);

  // If bot knows the name, personalize default reply
  if (userName) {
    return `I’m not sure about that, ${userName} 🤔. Can you explain more?`;
  }

  return random(responses.default);
}

// Pick random reply
function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Add message to UI
function addMessage(message, sender) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("chat-message", sender);
  msgDiv.innerText = message;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Handle send
function sendMessage() {
  const message = userInput.value.trim();
  if (message === "") return;

  addMessage(message, "user");
  userInput.value = "";

  const reply = getResponse(message);
  setTimeout(() => addMessage(reply, "bot"), 600);
}