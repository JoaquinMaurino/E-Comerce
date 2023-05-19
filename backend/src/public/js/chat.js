const socket = io.connect();

const messageForm = document.getElementById("messageForm");
const authorMsg = document.getElementById("name");
const email = document.getElementById("email");
const textMsg = document.getElementById("text");
const btnClear = document.getElementById("btnClear");

let userData;
fetch("/session/current")
  .then((data) => {
    userData = data;
  })
  .catch((error) => {
    console.log(error);
    userData = false;
  });

async function renderData(data) {
  document.getElementById("messages").innerHTML = "";
  await data.map((message) => {
    document.getElementById("messages").innerHTML += `<div>
            <strong>${userData.first_name}</strong> [${userData.email}]: ${message.message}
        </div>`;
  });
}

socket.on("allMessages", (data) => {
  renderData(data);
});

btnClear.onclick = () => {
  socket.emit("emptyArr", []);
};

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (textMsg.value && userData) {
    const newMessage = {
      name: userData.first_name,
      email: userData.email,
      message: textMsg.value,
    };
    textMsg.value = "";
    socket.emit("message", newMessage);
  }
  if (!userData) {
    const error = document.getElementById("error");
    error.innerHTML = `<strong>*Must be loged for sending messages</strong>`;
  } else {
    const error = document.getElementById("error");
    error.innerHTML = `<strong>*An empty message can not be sent</strong>`;
  }
});
 