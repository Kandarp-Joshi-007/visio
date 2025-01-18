// Jai shree Ram 
// Code Net


function send() {
   var input_msg = document.getElementById('msg_text').value; // get user input value
   var tab = document.getElementById('tab'); // target 'tab' Div

   if (input_msg != '') {
      var new_msg = document.createElement('div'); // create a div for message
      new_msg.setAttribute('class', 'msg'); // set class of Div
      var newId = generateUniqueId(); // Unique ID generate karne ka function call
      new_msg.setAttribute('id', newId); // set unique id of div
      tab.appendChild(new_msg);

      var msg_box = document.getElementById(newId);
      var msg_text = document.createElement('span'); // create span for text
      msg_text.innerText = input_msg; // set user input value in span
      msg_box.appendChild(msg_text);

      const user_msg = "You are My Data Analysis Companion and " + input_msg;  // store user input in variable
      document.getElementById('msg_text').value = ''; // clear input box

      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
         if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            const responseData = JSON.parse(xhttp.responseText);
            const answerValue = responseData.answer;
            console.log(answerValue);

            var ai_msg = document.createElement('div');
            ai_msg.setAttribute('class', 'msg1');
            var newId = generateUniqueId(); // Unique ID generate karne ka function call
            ai_msg.setAttribute('id', newId);
            console.log(newId);
            tab.appendChild(ai_msg);

            var ai_msg_box = document.getElementById(newId);
            var ai_msg_text = document.createElement('span');
            ai_msg_text.innerText = answerValue;
            ai_msg_box.appendChild(ai_msg_text);
         }
         tab.scrollTop = tab.scrollHeight;
      };
      xhttp.open("POST", "https://chatgpt.apinepdev.workers.dev/?question=" + user_msg, true);
      xhttp.send();
   }

   // genrate random id for div 

   function generateUniqueId() {
      return 'id_' + Math.random().toString(36).substr(2, 9); // Random ID generation
   }
}
// function for redirect you on my instagram page
function insta() {
   location = '#';
}


function copyResponse() {
   // Get the response text from the chat area
   var responseText = document.getElementById("tab").innerText.trim();

   // Create a temporary textarea element to hold the response text
   var tempTextArea = document.createElement("textarea");
   tempTextArea.value = responseText;
   document.body.appendChild(tempTextArea);

   // Select and copy the text from the temporary textarea
   tempTextArea.select();
   document.execCommand("copy");

   // Remove the temporary textarea
   document.body.removeChild(tempTextArea);

   // Notify the user that the response has been copied
   alert("Response copied to clipboard: " + responseText);
}


