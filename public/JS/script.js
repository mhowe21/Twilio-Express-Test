const sendButton = document.querySelector(".btn-send");
const mmsMedia = document.querySelector(".MMS-media");
const MMSOption = document.querySelector("#MMS-Radio");
const SMSOption = document.querySelector("#SMS-Radio");
const whatsAppOption = document.querySelector("#WhatsApp-Radio");
const responseBox = document.querySelector("#response-box");

//actions
sendButton.addEventListener("click", (e) => {
  //e.preventDefault();
  let toNumber = document.getElementById("input-number").value.trim();
  let message = document.getElementById("input-text").value;
  let radio = document.querySelector("input[type='radio']:checked").value;

  if (radio == "SMS") {
    sendSMS(toNumber, message);
  } else if (radio == "MMS") {
    let mediaURL = document.querySelector("#input-media-URL").value;
    if (mediaURL && toNumber && message) {
      sendMMS(toNumber, message, mediaURL);
    } else if (toNumber && message) {
      sendSMS(toNumber, message);
    }
  } else if (radio == "whatsapp") {
    let mediaURL = document.querySelector("#input-media-URL").value;
    sendWhatsApp(toNumber, message, mediaURL);
  }
  alert("sent");
});

MMSOption.addEventListener("click", (e) => {
  console.log("mms selected");
  mmsMedia.classList.remove("hidden");
});

SMSOption.addEventListener("click", (e) => {
  mmsMedia.classList.add("hidden");
});

whatsAppOption.addEventListener("click", (e) => {
  mmsMedia.classList.remove("hidden");
});

// API functions
function sendSMS(number, message) {
  let requestHeaders = new Headers();
  requestHeaders.append("Content-Type", "application/json");

  let rawBody = JSON.stringify({
    body: message,
    to: number,
  });

  let requestOptions = {
    method: "POST",
    headers: requestHeaders,
    body: rawBody,
    to: number,
  };

  fetch("/api/v1/messages/sms", requestOptions)
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}

function sendMMS(number, message, mediaURL) {
  let headers = new Headers();
  headers.append("Content-Type", "application/json");

  let raw = JSON.stringify({
    body: message,
    to: number,
    url: mediaURL,
  });

  let requestOptions = {
    method: "POST",
    headers: headers,
    body: raw,
  };

  fetch("/api/v1/messages/mms", requestOptions)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function sendWhatsApp(number, message, mediaURL) {
  let headers = new Headers();
  headers.append("Content-Type", "application/json");

  let rawBody = JSON.stringify({
    body: message,
    to: number,
    url: mediaURL,
  });

  let requestOptions = {
    method: "POST",
    headers: headers,
    body: rawBody,
  };

  fetch("/api/v1/whatsapp/message", requestOptions)
    .then((response) => {
      response.json();
    })
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
}

setInterval(() => {
  var requestOptions = {
    method: "GET",
  };

  fetch("http://mhowetesting.com:4570/api/v1/messages/replies", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      responseBox.value = JSON.stringify(result);
    })
    .catch((error) => console.log("error", error));
}, 1000);
