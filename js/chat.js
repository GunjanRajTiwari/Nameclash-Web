// Make socket connection
const socket = io.connect("https://namesclash.herokuapp.com/");
// const socket = io.connect("http://localhost:8000/");

// DOM Query
const message = document.getElementById("message");
const btn = document.getElementById("send");
const output = document.getElementById("chat-area");

// Emit events
function fireMessage() {
    if (!message.value) {
        return;
    }

    socket.emit("chat", {
        name: "Anonymous",
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
});