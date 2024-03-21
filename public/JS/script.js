const sendButton = document.querySelector(".btn-send");
const mmsMedia = document.querySelector(".MMS-media");
const MMSOption = document.querySelector("#MMS-Radio");
const SMSOption = document.querySelector("#SMS-Radio");
const whatsAppOption = document.querySelector("#WhatsApp-Radio");
const responseBox = document.querySelector("#response-box");

//actions
sendButton.addEventListener("click", (e) => {
  let toNumber = document.getElementById("input-number").value.trim();
  let message = document.getElementById("input-text").value;
  let radio = document.querySelector("input[type='radio']:checked").value;

  if (radio == "SMS") {
    sendSMS(toNumber, message);
    e.preventDefault(); // prevents the form from resetting on submit
  } else if (radio == "MMS") {
    let mediaURL = document.querySelector("#input-media-URL").value;
    if (mediaURL && toNumber && message) {
      sendMMS(toNumber, message, mediaURL);
      e.preventDefault();
    } else if (toNumber && message) {
      sendSMS(toNumber, message);
      e.preventDefault();
      // sends as SMS if MMS is selected but no media is given.
    }
  } else if (radio == "whatsapp") {
    let mediaURL = document.querySelector("#input-media-URL").value;
    sendWhatsApp(toNumber, message, mediaURL);
    e.preventDefault();
  }
  alert("Request sent");
});

MMSOption.addEventListener("click", (e) => {
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
    .then((responseJSON) => {
      console.log(responseJSON);
      responseBox.value = JSON.stringify(responseJSON);
    })
    .catch((error) => {
      console.log("an error occured " + error);
    });
}

function sendMMS(number, message, mediaURL) {
  let headers = new Headers();
  headers.append("Content-Type", "application/json");

  let mmsMessage = message ? message : "";
  console.log(mmsMessage);

  let raw = JSON.stringify({
    body: mmsMessage,
    to: number,
    url: mediaURL,
  });

  let requestOptions = {
    method: "POST",
    headers: headers,
    body: raw,
  };

  fetch("/api/v1/messages/mms", requestOptions)
    .then((response) => response.json())
    .then((responseJSON) => {
      console.log(responseJSON);
      responseBox.value(JSON.stringify(responseJSON));
    })
    .catch((err) => {
      console.log(err);
    });
}

function sendWhatsApp(number, message, mediaURL = "") {
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
    .then((response) => response.json())
    .then((responseJSON) => {
      console.log(responseJSON);
      responseBox.value = JSON.stringify(responseJSON);
    })
    .catch((err) => {
      console.log(err);
    });
}

// setInterval(() => {
//   var requestOptions = {
//     method: "GET",
//   };

//   fetch("http://mhowetesting.com:4570/api/v1/messages/replies", requestOptions)
//     .then((response) => response.json())
//     .then((result) => {
//       responseBox.value = JSON.stringify(result);
//     })
//     .catch((error) => console.log("error", error));
// }, 1000);
