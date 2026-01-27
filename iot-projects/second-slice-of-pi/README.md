# second-slice-of-pi

### Add in middleware to handle data format conversion

**Table of Contents**

- [Setup](#setup)
- [Grading](#grading)
- [Lesson Steps](#lesson-steps)
  - [TODO 1: Update Server](#todo-1-update-server)
  - [TODO 2: The Converter](#todo-2-the-converter)
  - [TODO 3: Modify Sensor Routes](#todo-3-modify-sensor-routes)
  - [TODO 4: Modify Actuator Routes](#todo-4-modify-actuator-routes)
  - [TODO 5: Test Web Page](#todo-5-test-web-page)
  - [CHALLENGES](#challenges)

<br><br>

## Setup

- This project should be completed on your Pi. **DO NOT WORK ON THIS PROJECT UNTIL FIRST SLICE OF PI IS COMPLETED**
- Open a new terminal on your Pi (putty or otherwise).
- Enter the command `cd <your GitHub repository's name>` to enter your repository directory.
- Enter the command `cd iot-projects` to enter your `iot-projects` directory.
- Enter the command `cp -r first-slice-of-pi/* second-slice-of-pi/.` to copy your first-slice-of-pi's work into second-slice-of-pi's directory.
- Enter the command `cd second-slice-of-pi` to enter the new project's directory.
- Run the command:
  ```bash
  npm install
  ```
- Run:
  ```bash
  git add -A
  git commit -m "set up second slice"
  git push
  ```

<br><br>

## Grading

| Requirement                        | Description                                      | Points |
| ---------------------------------- | ------------------------------------------------ | ------ |
| **TODO 1: Update Server**          | Modify the server to include middleware          | 10%    |
| **TODO 2: The Converter**          | Build a middleware function to handle conversion | 30%    |
| **TODO 3: Modify Sensor Routes**   | Adjust sensor routes to use the converter        | 15%    |
| **TODO 4: Modify Actuator Routes** | Adjust actuator routes to use the converter      | 15%    |
| **TODO 5: Test Web Page**          | Use a web page to test your server               | 30%    |

<br><br>

## Lesson Steps

This project is the second part of the multi-project undertaking that is setting up a server to allow others to interface with your Pi. For this project, you will:

- Add middleware to convert data into multiple response formats.
- Update both sensor and actuator routes to integrate the middleware.
- Write a script to test this functionality.

By the end of this project, your server will be capable of handling dynamic responses, providing greater flexibility for anyone making requests to your server. Let’s get started! 🚀

<br><br>

### Step-by-Step Work Flow

1. 📂 **Open the `second-slice-of-pi` directory** to begin updating your server.

   - 🔍 In your file tree, navigate to the `iot-projects` folder.
   - Open the `second-slice-of-pi` folder 📂 within the projects directory.

2. **Follow each TODO carefully** as you implement middleware and route modifications:

   - For each TODO, pay attention to the instructions provided in the code.
   - Only code in the specified areas to avoid breaking your program.

3. 🖥️ **Test your server frequently** to ensure middleware and routes work as expected.

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
      - 🖥️ Test frequently to ensure your server functions as expected at each step.  
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
      ⚠️Warning about Testing
    </th>
  </tr>
  <tr>
    <td style="padding: 10px; color: #e2e2e2;">
      If a curl command or Postman request crashes your server, restart your server before sending another request. Otherwise, your server will not respond to requests.
    </td>
  </tr>
</table>

---

<br>

### TODO 1: Update Server

🎯 **Goal:** Prepare your server to handle data parsing and format conversion by adding the required middleware.

---

### Step-by-Step Instructions

1. **Import middleware and libraries:**

   - At the top of your **`servers/http.js`** file, add the following imports:
     ```javascript
     require("./../middleware/converter");
     require("body-parser");
     ```

2. **Enable body-parser:**

   - If you stored the body-parser library in a variable called `bodyParser`, add the following line:
     ```javascript
     app.use(bodyParser.json());
     ```
     - Place this line just before where you tell Express to use CORS, but **AFTER** you create the `app` variable.

3. **Add the converter middleware:**

   - At the end of the file, but before `module.exports`, add:
     ```javascript
     app.use(converter());
     ```

> **READ:** The order of these lines is crucial:
>
> - Placing body-parser first ensures incoming request data is easily readable (e.g., accessing `req.accepts` in the converter).
> - Placing the converter at the end ensures it processes data after routing.

> **IMPORTANT NOTE:** There’s no way to test this step directly yet, so double-check your code carefully for errors.

<br><br><br><br>

### TODO 2: The Converter

🎯 **Goal:** Create a middleware converter to handle requests for different data formats.

---

### Step-by-Step Instructions

1. Open the **`middleware/converter.js`** file. This is where you will write the middleware to process and convert response data.

2. **Check for results:**

   - Use the condition below to verify whether there is a result to process:
     ```javascript
     if (req.result) {
     }
     ```
   - If no result exists, call `next()` to pass control to the next middleware. Make sure this check is in place before attempting to process the result.

3. **Check if HTML is requested:**

   - Inside the condition where `req.result` exists, add another condition to check if HTML is requested:
     ```javascript
     if (req.accepts("html")) {
     }
     ```
   - If HTML is requested, follow these steps:

     - **Create a render object:**  
        Define a `render` object for **`json2html`** to use. This object should map the JSON object into an HTML structure. The three properties you need to include in your `render` object are `name`, `description`, and `value`, which are available in each device's information in your `resources.json` file. An example of a render object using two generic properties is shown below:

       ```javascript
       let render = {
         "<>": "div",
         html: [
           {
             "<>": "p",
             html: [
               { "<>": "b", html: "Property1: " },
               { "<>": "p", html: "${property1}" },
             ],
           },
           {
             "<>": "p",
             html: [
               { "<>": "b", html: "Property2: " },
               { "<>": "p", html: "${property2}" },
             ],
           },
         ],
       };
       ```

     - **Generate HTML:**  
       Use `json2html.render()` to convert the `result` object into HTML, passing the `render` object as the second argument. Send the generated HTML back using `res.send()`.

4. **Send back JSON by default:**

   - If HTML is not requested, send back the JSON data instead:
     ```javascript
     res.send(req.result);
     ```
   - This should go in the `else` block corresponding to your check for HTML.

> **IMPORTANT:** This TODO cannot be tested until the next TODO is completed, so check your work carefully.

<br><br><br><br>

### TODO 3: Modify Sensor Routes

🎯 **Goal:** Update your sensor routes to use the converter middleware, enabling flexible data format responses.

---

### Step-by-Step Instructions

1. Open the **`routes/sensors.js`** file.

2. For each route in this file, replace the `res.send()` call with an assignment to `req.result` and a call to `next()`.

   - Example:
     ```javascript
     res.send(resources.pi.sensors);
     ```
     becomes:
     ```javascript
     req.result = resources.pi.sensors;
     next();
     ```

   > **READ:** The purpose of this step is to store the JSON-formatted data in `req.result` and pass control to the converter middleware using `next()`. The converter middleware (added to `http.js`) will handle rendering and sending the response based on the requested format.

3. Ensure this change is applied to **all routes** in the `sensors.js` file.

---

### ✅ **Check Your Work!**

After completing the steps above, test your sensor routes to verify they work as intended:

1. Start your server with the following command:
   ```bash
   node wot-server.js
   ```
2. Open a second terminal and enter the following `curl` commands (or use Postman) to test your sensor routes:

   HTML responses:

   ```bash
   curl -X GET -H "Accept:text/HTML" localhost:8484/pi/sensors
   curl -X GET -H "Accept:text/HTML" localhost:8484/pi/sensors/pir
   curl -X GET -H "Accept:text/HTML" localhost:8484/pi/sensors/dht
   curl -X GET -H "Accept:text/HTML" localhost:8484/pi/sensors/dht/temperature
   curl -X GET -H "Accept:text/HTML" localhost:8484/pi/sensors/dht/humidity
   ```

   Each of these commands should return an HTML response. If any route does not, double-check your changes for that route and verify your converter middleware.

   JSON responses:

   ```bash
   curl -X GET -H "Accept:application/json" localhost:8484/pi/sensors/
   ```

   This command should return JSON data (an object). If it does not, ensure your converter is properly configured to handle JSON as the default response format.

3. Confirm the following:

   - All routes produce the correct responses in the requested format (HTML or JSON).
   - No errors occur during the tests.

If all tests pass and the responses are correct, you’re ready to move on to the next TODO! 🚀

<br><br><br><br>

### TODO 4: Modify Actuator Routes

🎯 **Goal:** Update your actuator routes to use the converter middleware, just as you did for the sensor routes.

---

### Step-by-Step Instructions

1. Open the **`routes/actuators.js`** file.

2. For each route in this file, replace the `res.send()` call with an assignment to `req.result` and a call to `next()`. You do this the same way you did in the sensor routes.

---

### ✅ **Check Your Work!**

After completing the steps above, test your actuator routes to verify they work as intended:

1. Start your server with the following command:

   ```bash
   node wot-server.js
   ```

2. Open a second terminal and enter the following `curl` commands (or use Postman) to test your sensor routes:

   HTML responses:

   ```bash
   curl -X GET -H "Accept:text/HTML" localhost:8484/pi/actuators
   curl -X GET -H "Accept:text/HTML" localhost:8484/pi/actuators/leds
   curl -X GET -H "Accept:text/HTML" localhost:8484/pi/actuators/leds/1
   curl -X GET -H "Accept:text/HTML" localhost:8484/pi/actuators/leds/2
   ```

   Each of these commands should return an HTML response. If any route does not, double-check your changes for that route and verify your converter middleware.

3. Confirm the following:

   - All routes produce the correct responses in the requested format (HTML or JSON).
   - No errors occur during the tests.

If all tests pass and the responses are correct, you’re ready to move on to the final TODO! 🚀

<br><br><br><br>

### TODO 5: Test Web Page

🎯 **Goal:** Use the **`data-requester.html`** file to create a test page that interacts with your server and verifies its functionality.

---

### Step-by-Step Instructions

1. **Prepare the request:**

   - Locate the `processForm()` function in **`data-requester.html`**.
   - Inside the function:
     - Create a new XMLHttpRequest client:
       ```javascript
       const xhttp = new XMLHttpRequest();
       ```
     - Use jQuery to get the URL from the form input:
       ```javascript
       const url = $("#host").val();
       ```
     - Open the request with `xhttp.open()`:
       - Use `"GET"` as the verb (first argument).
       - Pass the URL as the second argument.
       - Set the third argument to `true` for an asynchronous request.
     - Set the request header to specify the desired data format:
       ```javascript
       xhttp.setRequestHeader("Accept", "text/html");
       ```
     - Send the request:
       ```javascript
       xhttp.send();
       ```

2. **Handle `readyState` changes:**

   - Assign a function to `xhttp.onreadystatechange` to handle updates:
     ```javascript
     xhttp.onreadystatechange = function () {
       // Body of the function goes here
     };
     ```
   - Inside this function:
     - Check if `this.readyState` is `4`. If it is, proceed to check `this.status`.
     - If `this.status` is `200`, use jQuery to load the response HTML into the page’s data element:
       ```javascript
       $("#data").html(this.responseText);
       ```
     - If `this.status` is anything other than `200`, display `"ERROR"` in the data element instead of the response text:
       ```javascript
       $("#data").html("ERROR");
       ```

3. **Test your page and server:**

   - Start your server using:
     ```bash
     node wot-server.js
     ```
   - Open **`data-requester.html`** in your browser.
   - Enter various URLs that your server supports (e.g., `localhost:8484/pi/sensors`, `localhost:8484/pi/actuators`).
     - If you’re working on a different machine, replace `localhost` with your Pi’s IP address.
   - Verify the following:
     - The page displays the requested HTML if the request is successful.
     - The page shows `"ERROR"` if there’s an issue with the request.

---

### ✅ **Check Your Work!**

After completing the steps above, verify that both your web page and server are working as intended:

1. Test with supported server URLs:

   - Enter URLs like `localhost:8484/pi/sensors` or `localhost:8484/pi/actuators`.
   - Confirm that the page updates with the corresponding HTML response.

2. Test with unsupported or invalid URLs:

   - Enter URLs that your server does not handle.
   - Confirm that the page displays `"ERROR"`.

3. Confirm the following:
   - The page reliably displays the correct data or error message based on the request.
   - No errors occur in the browser console or the server terminal.

If all tests pass and the page behaves as expected, congratulations! You’ve completed this project. Don’t forget to push your work to GitHub! 🚀

<br><br><br><br>

### CHALLENGES

🎯 Customize your render object and HTML output for enhanced formatting or additional information.

#### Challenge 1: Add More Properties

- **Modify the `render` object:** Include additional properties from your `resources.json` file in the `render` object. You have quite a few to choose from, so make your response as detailed and unique as you like!

#### Challenge 2: Change the HTML Structure

- **Update the HTML structure:** Modify the tags used in the `render` object (e.g., replace `'b'` with `'h1'`, or wrap everything in a `<ul>` to display as a list). This can give your response a fresh look and professional vibe!

#### Challenge 3: Add Styling

- **Experiment with styling:** Explore creative ways to present the device information visually. You can add CSS styles directly to the HTML output or link to an external stylesheet for more advanced styling options. We suggest using inline styles for your first attempt. Below is an example:

  ```javascript
  const render = {
    tag: "div",
    children: [
      { tag: "h1", html: "${name}" },
      { tag: "p", html: "${description}" },
      { tag: "p", html: "${value}", style: "color: blue; font-size: 20px;" },
    ],
  };
  ```

These challenges a great opportunity to personalize your project while deepening your understanding of the `json2html` library! 🚀
