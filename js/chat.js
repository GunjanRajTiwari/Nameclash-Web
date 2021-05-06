// Make socket connection
const socket =
    io.connect("http://localhost:8000/") || io.connect("https://namesclash.herokuapp.com/");

const user = prompt("Enter your name:", "Anonymous");

// DOM Query
const message = document.getElementById("message");
const btn = document.getElementById("send");
const output = document.getElementById("chat-area");
const feedback = document.getElementById("typing");

// Emit events
function fireMessage() {
    if (!message.value) {
        return;
    }

    socket.emit("chat", {
        name: user || "Anonymous",
        message: message.value,
    });

    message.value = "";
}

// Event handlers
btn.addEventListener("click", fireMessage);
message.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        fireMessage();
    }
});

message.addEventListener("keypress", function () {
    socket.emit("typing", "Someone is typing ...");
});

// Listen for events
socket.on("chat", (data) => {
    const div = document.createElement("div");
    div.classList.add("chat");
    div.innerHTML = `
        <small>${data.name}</small>
        <p>${data.message}</p>
    `;
    output.appendChild(div);
    output.scrollTop = output.scrollHeight;
    feedback.innerHTML = "";
});

socket.on("typing", function (data) {
    feedback.innerHTML = `<small>${data}</small>`;
});
