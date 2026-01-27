# pi-inyourface

### Add in interface support to your Pi server

**Table of Contents**

- [Setup](#setup)
- [Grading](#grading)
- [Lesson Steps](#lesson-steps)
  - [TODO 1: LEDs Plugin](#todo-1-leds-plugin)
  - [TODO 2: Update Routes](#todo-2-update-routes)
  - [TODO 3: Add WebSockets Server](#todo-3-add-websockets-server)
  - [TODO 4: Test Web Page](#todo-4-test-web-page)
  - [Challenges](#challenges)

<br><br>

## Setup

- This project should be completed on your Pi. **DO NOT WORK ON THIS PROJECT UNTIL SECOND SLICE OF PI IS COMPLETED**
- Open a new terminal on your Pi (putty or otherwise).
- Enter the command `cd <your GitHub repository's name>` to enter your repository directory.
- Enter the command `cd iot-projects` to enter your `iot-projects` directory.
- Enter the command `cp -r second-slice-of-pi/* pi-inyourface/.` to copy your completed second-slice-of-pi's work into pi-inyourface's directory.
- Enter the command `cd pi-inyourface` to enter the new project's directory.
- Run the command:
  ```bash
  npm install websocket ws lodash onoff node-dht-sensor express cors epoll body-parser xmlhttprequest node-json2html
  ```
- Run:
  ```bash
  git add -A
  git commit -m "set up pi in your face"
  git push
  ```

<br><br>

## Grading

| Requirement                       | Description                                  | Points |
| --------------------------------- | -------------------------------------------- | ------ |
| **TODO 1: LEDs Plugin**           | Add plugin support for controlling LEDs      | 25%    |
| **TODO 2: Update Routes**         | Update server routes to support new features | 25%    |
| **TODO 3: Add WebSockets Server** | Integrate WebSocket server for live updates  | 25%    |
| **TODO 4: Test Web Page**         | Build and test a WebSocket-compatible page   | 25%    |

<br><br>

## Lesson Steps

This project is the third part of the multi-project undertaking that is setting up a server to allow others to interface with your Pi. For this project, you will:

- Add a plugin to support communication with the LEDs.
- Integrate WebSocket support into your server for real-time updates.
- Update server routes to handle these new features.
- Create a test web page that connects multiple WebSocket clients to your server to listen for updates.

By the end of this project, your server will provide real-time interactivity and enhanced functionality, allowing connected devices to communicate dynamically. Let’s get started! 🚀

<br><br>

### Step-by-Step Work Flow

1. 📂 **Open the `pi-inyourface` directory** to begin updating your server.

   - 🔍 In your file tree, navigate to the `iot-projects` folder.
   - Open the `pi-inyourface` folder 📂 within the projects directory.

2. **Follow each TODO carefully** as you implement the required updates:

   - For each TODO, pay attention to the instructions provided in the code.
   - Only code in the specified areas to avoid breaking your program.

3. 🖥️ **Test your server frequently** to ensure new plugins and WebSocket support work as expected.

---

<table style="width: 80%; margin-left: auto; margin-right: auto; border-collapse: collapse; margin-top: 15px; background-color: #2c2c2c; border: 1px solid #444; border-radius: 8px; overflow: hidden;">  
  <tr>  
    <th style="text-align: left; padding: 10px; background-color: #444; color: #e2e2e2; border-bottom: 1px solid #666;">  
      💡 Key Reminders  
    </th>  
  </tr>  
  <tr>  
    <td style="padding: 10px; color: #e2e2e2;">  
      - 📖 Carefully read each TODO before you start coding.<br>  
      - 🖥️ Test frequently to ensure your server functions as expected at each step.<br>  
      - 🔄 Always push your changes to GitHub and pull them onto your Pi to keep your code synchronized if you’re working on multiple devices.  
    </td>  
  </tr>  
</table>

---

<br>

### ✅ **Check Your Work!**

- **After each TODO**, double-check your code against the instructions.
- To test your server setup:
  1. Ensure your terminal (on your Pi) is in the project directory using `cd`.
  2. Run the command:
     ```bash
     node wot-server.js
     ```
  3. Use `curl` commands or Postman to send requests to your running server.

<table style="width: 80%; margin-left: auto; margin-right: auto; border-collapse: collapse; margin-top: 15px; background-color: #2c2c2c; border: 1px solid #444; border-radius: 8px; overflow: hidden;">  
  <tr>  
    <th style="text-align: left; padding: 10px; background-color: #444; color: #e2e2e2; border-bottom: 1px solid #666;">  
      ⚠️ Important Note About Testing  
    </th>  
  </tr>  
  <tr>  
    <td style="padding: 10px; color: #e2e2e2;">  
      If a `curl` command or Postman request crashes your server, restart it in the first terminal before sending another request. Otherwise, your server will not respond to further requests.  
    </td>  
  </tr>  
</table>

---

<br>

### TODO 1: LEDs Plugin

🎯 **Goal:** Create and export the functions and objects needed to control your LEDs via the LEDs plugin.

---

### Step-by-Step Instructions

1. **Create the `connectHardware` function:**

   - **Name:** `connectHardware`
   - **Parameters:** None
   - **Returns:** Nothing
   - **Description:** This function should:

     1. Import the `'onoff'` library (either locally or globally, as you prefer).
     2. Create a new Gpio connection in `'out'` mode for each LED (two total), assigning each connection to the global variables `actuator1` and `actuator2`.
     3. Use bracket notation to access the `gpio` value for each LED in the `model` variable (e.g., `model[1].gpio`).

     > **Hint:** While setting up `'out'` mode, remember it does not require a third parameter, unlike the `'both'` mode used in the `pirPlugin.js` file.

2. **Create the `stop` function:**

   - **Name:** `stop`
   - **Parameters:** None
   - **Returns:** Nothing
   - **Description:** This function should:
     1. Turn off each LED using the `.write(0)` method on each Gpio connection.
     2. Disconnect from the LEDs using the `.unexport()` method, similar to the `pirPlugin`'s `stop()` function.

3. **Create the `switchOnOff` object:**

   - Structure the object as follows:
     ```javascript
     exports.switchOnOff = {
       1: function (value) {
         // turn LED 1 on or off based on value
       },
       2: function (value) {
         // turn LED 2 on or off based on value
       },
     };
     ```
   - Use the `.write()` function to turn the LEDs on or off:
     - A value of `1` means the LED should be turned on.
     - A value of `0` means the LED should be turned off.
   - Handle potential Boolean input for `value` by using explicit conditionals (`if`/`else`) or the ternary operator (`<condition> ? <true response> : <false response>`).

   > **WARNING:** Be cautious with this TODO, as testing will not be possible until you complete TODO 2.

<br><br><br><br>

### TODO 2: Update Routes

🎯 **Goal:** Add PUT support to the actuator routes and update the `wot-server.js` file to manage the LEDs plugin.

---

### Step-by-Step Instructions

1. **Update `actuators.js`:**

   - **Import the LEDs plugin:**  
     At the top of the file, add the following line:

     ```javascript
     ledsPlugin = require("./../plugins/internal/ledsPlugin");
     ```

   - **Add PUT support to the `'/leds/:id'` route:**
     - Append `.put(function(req, res, next){})` to the current route declaration:
       ```javascript
       router.route('/leds/:id').get(...).put(...);
       ```
     - Inside the `.put()` callback function:
       1. Update the LED's value using the `req.body.value`.
       2. Set `req.result` to the updated LED's representation.
       3. Call the appropriate `switchOnOff` method in the `ledsPlugin`, passing in the LED's value.
       4. Call `next()` to pass control to the next middleware.

2. **Update `wot-server.js`:**

   - **Import the LEDs plugin:**  
     Add the following line where other plugins are imported:

     ```javascript
     var ledsPlugin = require("./plugins/internal/ledsPlugin");
     ```

   - **Start the LEDs plugin:**  
     Add the `start()` method for the `ledsPlugin` where other plugins are started.

   - **Stop the LEDs plugin:**  
     Add the `stop()` method for the `ledsPlugin` inside the `process.on()` callback, just before `process.exit()`.

---

### ✅ **Check Your Work!**

After completing the steps above, test your server with the following commands:

1. Start your server with:

   ```bash
   node wot-server.js
   ```

2. Run the following `curl` commands in your terminal:

   - Turn on LED 1:
     ```bash
     curl -X PUT -H "Content-Type:application/json" -d '{"value": true}' http://localhost:8484/pi/actuators/leds/1
     ```
   - Turn on LED 2:
     ```bash
     curl -X PUT -H "Content-Type:application/json" -d '{"value": true}' http://localhost:8484/pi/actuators/leds/2
     ```
   - Turn off LED 1:
     ```bash
     curl -X PUT -H "Content-Type:application/json" -d '{"value": false}' http://localhost:8484/pi/actuators/leds/1
     ```
   - Turn off LED 2:
     ```bash
     curl -X PUT -H "Content-Type:application/json" -d '{"value": false}' http://localhost:8484/pi/actuators/leds/2
     ```

3. Confirm the following:

   - The LEDs respond correctly to each command.
   - No errors occur in the server or terminal output.

If all tests pass, congratulations! Your actuator routes and LEDs plugin are now fully functional. 🚀

<br><br><br><br>

### TODO 3: Add WebSockets Server

🎯 **Goal:** Implement a WebSocket server to enable real-time updates for clients monitoring device conditions.

---

### Step-by-Step Instructions

1. **Update `websockets.js`:**

   - Locate the `wss.on()` method. This is where you will implement the body of the callback function for managing WebSocket connections.

   - Complete the following steps inside the callback function:

     - **3a)** Get the specific URL the client wants to subscribe to by copying it from `req.url`.

     - **3b)** Use the provided `selectResource(url)` function to find the resource matching the URL.

       - Store the result of `selectResource(url)` in a variable for later use.

     - **3c)** Check if the URL is invalid (i.e., `selectResource(url)` returned `undefined`):

       - If invalid, print an error to the console.
       - Use `return` with no value to exit the function.

     - **3d)** Use the provided `utils.monitor()` function to monitor the specified resource.
       - Pass the following arguments to `utils.monitor()`:
         1. The resource returned by `selectResource(url)`.
         2. The `refreshRate` (already defined in the file).
         3. A callback function that sends updates to the client:
         ```javascript
         ws.send(JSON.stringify(changes));
         ```

2. **Update `wot-server.js`:**

   - Import the WebSocket server using:

     ```javascript
     var <websocketServer-variable-name> = require("./servers/websockets");
     ```

   - Inside the callback function for `httpServer.listen()`, start the WebSocket server by adding:
     ```javascript
     <websocketServer-variable-name>.listen(server);
     ```

---

> **IMPORTANT NOTE:** You will not be able to test this functionality immediately. Be mindful of your changes so you can revisit this section if issues arise during TODO 4's tests.

<br><br><br><br>

### TODO 4: Test Web Page

🎯 **Goal:** Implement the `connect` function in **`ws_client.html`** to create WebSocket clients and display real-time updates from your server.

---

### Step-by-Step Instructions

1. **Create the WebSocket client:**

   - Inside the `connect()` function, initialize a new WebSocket client:
     ```javascript
     var socket = new WebSocket(url);
     ```

2. **Set up WebSocket event handlers:**

   - **`onopen` event:**

     - Add a `socket.onopen` method to log a connection message and update the HTML to show a "Awaiting update" message:
       ```javascript
       socket.onopen = function (event) {
         console.log("OPENED CONNECTION");
         $(updateElement).html("<h4>Awaiting update<h4>");
       };
       ```

   - **`onmessage` event:**

     - Add a `socket.onmessage` method to handle incoming messages.
       - Use `let result = JSON.parse(event.data);` to parse the incoming data.
       - Update the HTML to display the value received in `result.value`.

   - **`onerror` event:**
     - Add a `socket.onerror` method to handle connection errors:
       - Log an error message and update the HTML to indicate an error.
       - The incoming parameter should be called `error`.

3. **Verify URLs in `ws_client.html`:**

   - Check lines 60–62 (by default) to ensure all URLs point to the correct locations on your server.

---

### ✅ **Check Your Work!**

After completing the steps above, test your WebSocket client and server setup:

1. Restart your server with:

   ```bash
   node wot-server.js
   ```

2. Open `ws_client.html` in your browser:

   - Use Live Server or open the file directly in your browser.
   - Confirm the following:
     - The page connects to your server and displays "Awaiting update" after opening a connection.
     - Real-time updates from your server appear on the page as values from your sensors.
     - Any connection errors are logged, and an appropriate error message is displayed on the page.

If all tests pass, congratulations! You've successfully implemented WebSocket support and a functional client for real-time updates. 🚀

<br><br><br><br>

### Challenges

Once you’ve completed the core functionality, consider taking on these optional challenges to extend your project and deepen your understanding:

---

#### **Challenge 1: Display Sensor History**

Modify the `ws_client.html` page to keep a record of the last 5–10 updates for each sensor and display them in a table or list. This will give users a clearer picture of how sensor values are changing over time. It will be up to you to manage replacing old values with new ones as updates come in.

**Goal:** Create a data structure in the client to store historical updates for each monitored sensor and dynamically update the HTML to reflect this history. We suggest using jQuery to manipulate the DOM.

> **WARNING:** Do not attempt to store an infinite number of updates, as this could lead to performance issues. Limit the number of stored updates to a reasonable amount (e.g., 5–10) to avoid memory leaks.

<br><br>

#### **Challenge 2: WebSocket Server Statistics**

Enhance the WebSocket server to track real-time statistics about active connections. For example, display the number of connected clients and the total number of messages sent or received.

**Goal:** Add logic to the WebSocket server to count active clients and maintain a message count. Use this data to dynamically update a log on the server side or display it on a separate "admin" page for monitoring.

> **TIP:** You can duplicate your test page and use it to have multiple clients connected to your server at once. You can focus on displaying the statistics only on the original page.

> **WARNING:** For this challenge, you will need to also create a new route on your server to display the statistics. You will then be able to view these statistics by navigating to the new route in your browser.

---

These challenges are optional, but they’re a great way to push your project further and explore advanced topics like data handling and server monitoring. 🚀
