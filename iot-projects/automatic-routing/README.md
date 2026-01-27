# iot-automatic-routing

### Automate route creation for your Pi server

**Table of Contents**

- [Setup](#setup)
- [Grading](#grading)
- [Lesson Steps](#lesson-steps)
  - [TODO 1: Use Automation](#todo-1-use-automation)
  - [TODO 2: createRouter Function](#todo-2-createrouter-function)
  - [TODO 3: generateRoute Function](#todo-3-generateroute-function)
  - [TODO 4: populateLinks Function](#todo-4-populatelinks-function)
  - [TODO 5: Update the Converter](#todo-5-update-the-converter)
  - [Challenge: Automate Parent Links](#challenge-automate-parent-links)

<br><br>

## Setup

- This project should be completed on your Pi. **DO NOT WORK ON THIS PROJECT UNTIL PI-INYOURFACE IS COMPLETED**
- Open a new terminal on your Pi (putty or otherwise).
- Enter the command `cd <your GitHub repository's name>` to enter your repository directory.
- Enter the command `cd iot-projects` to enter your `iot-projects` directory.
- Enter the command `cp -r pi-inyourface/* automatic-routing` to copy your completed pi-inyourface's work into the automatic-routing directory.
- Enter the command `cd automatic-routing` to enter the new project's directory.
- Run the command:
  ```bash
  npm install websocket ws lodash onoff node-dht-sensor express cors epoll body-parser xmlhttprequest node-json2html
  ```
- Run the command:
  ```bash
  git add .
  git commit -m "Setup automatic-routing project"
  git push
  ```

<br><br>

## Grading

| Requirement                        | Description                                   | Points |
| ---------------------------------- | --------------------------------------------- | ------ |
| **TODO 1: Use Automation**         | Set up the framework for route automation     | 10%    |
| **TODO 2: createRouter Function**  | Build a function to automate route creation   | 10%    |
| **TODO 3: generateRoute Function** | Build a function for resource-specific routes | 30%    |
| **TODO 4: populateLinks Function** | Automate link generation for navigation       | 25%    |
| **TODO 5: Update the Converter**   | Modify the converter to handle links          | 25%    |

<br><br>

## Lesson Steps

This project is the final part of the multi-project undertaking that is setting up a server to allow others to interface with your Pi. For this project, you will:

- Automate the creation of routes for handling sensor and actuator resources.
- Automatically generate navigation links in responses for easier exploration of your Pi’s resources.
- Refactor existing functionality to reduce redundancy and improve maintainability.

By the end of this project, your server will be highly efficient, with automated routing and enhanced response headers for seamless navigation. Let’s get started! 🚀

<br><br>

### Step-by-Step Work Flow

1. 📂 **Open the `automatic-routing` directory** to begin automating your server.

   - 🔍 In your file tree, navigate to the `iot-projects` folder.
   - Open the `automatic-routing` folder 📂 within the projects directory.

2. **Follow each TODO carefully** as you implement automation and navigation features:

   - For each TODO, pay attention to the instructions provided in the code.
   - Only code in the specified areas to avoid breaking your program.

3. 🖥️ **Test your server frequently** to ensure that automation and navigation features work as expected.

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

### TODO 1: Use Automation

🎯 **Goal:** Set up the foundation for automating route creation in your server.

---

### Step-by-Step Instructions

1. **Create the `automate.js` file:**

   - In your `routes` folder, create a new file called `automate.js`. You can do this with the command:

     ```bash
     touch routes/automate.js
     ```

   - Add the following lines to the file:

     ```javascript
     // first line
     const express = require("express");

     // last line
     module.exports = createRouter;
     ```

   - You’ll expand this file in the next TODOs, but for now, ensure it exists and contains these lines.

---

2. **Update your `actuators.js` file:**

   - Since you’ll automate `GET` routes, remove all existing `GET` route handlers from your `actuators.js` file, keeping only the `PUT` request handler.

   - After updating, your file should look similar to this:

     ```javascript
     const express = require("express"),
       router = express.Router(),
       resources = require("./../resources/model"),
       ledsPlugin = require("./../plugins/internal/ledsPlugin");

     router.route("/leds/:id").put(function (req, res, next) {
       var selectedLed = resources.pi.actuators.leds[req.params.id];
       selectedLed.value = req.body.value;
       req.result = selectedLed;
       ledsPlugin.switchOnOff[req.params.id](req.body.value);
       next();
     });

     module.exports = router;
     ```

   > **NOTE:** Your implementation may vary slightly from the example above, depending on how you initially wrote your `actuators.js` file. Just ensure the `PUT` handler is intact, and all `GET` handlers are removed.

---

3. **Update the `http.js` file:**

   - Disconnect the `http.js` file from manually created sensor routes and connect it to the new route automation system. Make the following changes:

     1. **Comment out or delete** the line that imports `sensors.js`.
     2. **Comment out or delete** the line:
        ```javascript
        app.use("/pi/sensors", sensorRoutes);
        ```
     3. **Comment out or delete** the `app.get` lines for `'/'` and `'/pi'`.
     4. Add the following line at the top of the file:
        ```javascript
        const createRouter = require("./../routes/automate");
        ```
     5. Add the following line (if it doesn’t already exist):
        ```javascript
        const resources = require("./../resources/model");
        ```
     6. Just above the line where you call `app.use(converter())`, add:
        ```javascript
        app.use("/", createRouter(resources));
        ```

   > **READ:** The first three steps remove the manual setup for sensor routes, while the final steps import and connect the server to the route automation system you’ll build in the next TODO.

   > **IMPORTANT:** Testing will not be possible until **TODO 2** is complete. Be meticulous to avoid errors!

<br><br><br><br>

### TODO 2: createRouter Function

🎯 **Goal:** Build the foundational function for automating route creation. This function initializes the router and prepares it to dynamically create routes.

---

### Step-by-Step Instructions

1. **Create the `createRouter` function:**

   - **Name:** `createRouter`
   - **Parameters:** A single object called `rootResource`
   - **Returns:** A router object

   - **Description:** This function should:
     1. Create a new router using `express.Router()` and assign it to a variable with an appropriate name (e.g., `router`).
     2. Call the route automation function. For now, add a placeholder comment:
        ```javascript
        // call generateRoute here
        ```
     3. Return the router you created.

---

### ✅ **Check Your Work!**

1. To verify that your router is being created correctly, add a `console.log` statement inside your `createRouter` function. For example:

```javascript
console.log("Router created successfully");
```

2. Start your server with:

```bash
node wot-server.js
```

3. You should see your message in the terminal output, confirming that the `createRouter` function is running without errors.

> NOTE: At this point, your server won't generate any routes yet, but seeing the log message ensures your router initialization is working as expected.

<br><br><br><br>

### TODO 3: generateRoute Function

🎯 **Goal:** Automate route creation for all resources on your Pi server, dynamically linking resources and subresources.

---

### Step-by-Step Instructions

1. **Create the `generateRoute` function:**

   - **Name:** `generateRoute`
   - **Parameters:**
     - `router` (the router being used).
     - `resource` (the current resource being routed).
   - **Returns:** Nothing

   - **Description:** This function will create routes dynamically for any resource with an associated link and will handle recursive routing for subresources.

   - **Steps:**
     1. Define the function but leave the body empty for now.
     2. Go back to your `createRouter` function and call `generateRoute`, passing in the new router and the `rootResource` as arguments. Remove any placeholder comments about calling this function.

2. **Check if a link exists for the resource:**

   - Inside the `generateRoute` function, verify if the `link` property exists on the `resource` object. If `resource.link` is `undefined`, skip the route creation for that resource.

3. **Create the route if a link exists:**

   - Use `resource.link` as the URL when creating the route. For example:
     ```javascript
     router.route(resource.link).get(function (req, res, next) {
       // Callback function content here
     });
     ```
   - Build the `.get()` callback function:

     - The callback should perform the following actions:
       1. Create an empty object called `links` to store links to subresources.
       2. Add the `links` object to the response header with:
          ```javascript
          res.links(links);
          ```
       3. Attach the `links` object to the response with:
          ```javascript
          req.links = links;
          ```
       4. Assign the current resource to `req.result`.
       5. Call the `next()` function to pass control to the next middleware.

4. **Make the function recursive to handle subresources:**

   - Resources on your Pi often contain nested subresources. For example:

     - `resources` contains `resources.pi`.
     - `resources.pi` has `sensors`, `actuators`, and `actions`.

   - To handle this:

     1. At the bottom of the `generateRoute` function, loop through the properties of the `resource` object using a `for-in` loop.
     2. Inside the loop, check if a property’s value is an object using:
        ```javascript
        if (typeof someValue === "object") {
          // Handle subresource
        }
        ```
     3. For each valid subresource, recursively call `generateRoute` with:
        ```javascript
        generateRoute(router, subresource);
        ```

   - **Hint:** Use the following structure for your `for-in` loop:
     ```javascript
     for (var key in resource) {
       var value = resource[key];
       if (typeof value === "object") {
         // Call generateRoute for the subresource
       }
     }
     ```

---

### ✅ Check Your Work!

After completing the above steps, test your implementation by running the server:

1. Start your server with:

```bash
node wot-server.js
```

2. Use a browser or Postman to navigate to various URLs corresponding to your Pi’s resources. Examples include:

   - `<your Pi’s IP>:8484/pi`
   - `<your Pi’s IP>:8484/pi/sensors`
   - `<your Pi’s IP>:8484/pi/actuators`

3. Verify that you receive valid responses for all resources. If the routes work dynamically, congratulations—you’ve automated route creation! 🚀

<br><br><br><br>

### TODO 4: populateLinks Function

🎯 **Goal:** Generate a list of subresource links for any given resource and include those links in both the response header and the `req` object.

---

### Step-by-Step Instructions

1. **Create and call the `populateLinks` function:**

   - **4a-1:** Create the following function:

     - **Name:** `populateLinks`
     - **Parameters:** A resource object (call it `resource`).
     - **Returns:** An object containing only links.
     - **Description:** Analyzes the properties of a resource, creates an object of links, and returns that object.

   - **4a-2:** In your `generateRoute` function, locate where you are giving an empty object to the `links` variable. Replace the empty object with a call to `populateLinks`, passing the current `resource` as an argument.

2. **Build the `populateLinks` function body:**

   - **4b-1:** On the first line of the function, create an empty object called `linkObject`.

   - **4b-2:** Create a `for-in` loop that iterates over the `resource` parameter. For now, leave the body of the loop empty.

   - **4b-3:** After the `for-in` loop, return the `linkObject`.

3. **Program the `for-in` loop:**

   - **4c-1:** Inside the loop, check if the current property's value is an object. (Refer to **TODO 3e** for examples of how to do this.)

   - **4c-2:** If the value is an object, assign it to a variable called `subResource` (optional but recommended).

   - **4c-3:** Check if the `subResource` has a `link` property (similar to **TODO 3b**). If it does, add a new property to the `linkObject`:
     - **Key:** `subResource.name`
     - **Value:** `subResource.link`

---

### ✅ **Check Your Work!**

After implementing this function, you can verify its success by checking the response headers.

1. **Start your server:**

   ```bash
   node wot-server.js
   ```

2. **Send a request to the Pi's root resource:**
   In a separate terminal, run:

   ```bash
   curl -v localhost:8484/pi/
   ```

3. **Verify the response:**
   Look for the `Link` header in the output. It should include entries like:

   ```javascript
   Link: </pi/sensors>; rel="Sensors List", </pi/actuators>; rel="Actuators List", </pi/actions>; rel="Actions List"
   ```

   If the links appear as expected, congratulations! Your server now automatically generates and shares subresource links in the response headers. 🚀

<br><br><br><br>

### TODO 5: Update the Converter

🎯 **Goal:** Enhance your HTML response to include clickable links for navigating subresources directly from the browser.

---

### Step-by-Step Instructions

1. **Update the HTML response:**

   - **5a-1:** Locate the `res.send()` statement for your HTML responses in the `converter.js` file.
   - **5a-2:** Replace the current response with the following code:

     ```javascript
     let response = json2html.transform(req.result, transform);
     let links = generateLinks(req.links);

     res.send(response + links);
     ```

     > **READ:** This update ensures that your HTML responses include both the resource data and a list of clickable links to subresources.

2. **Create the `generateLinks` function:**

   - **5b-1:** Define a new function with the following details:

     - **Name:** `generateLinks`
     - **Parameters:** A `linkList` object containing links to subresources.
     - **Returns:** A string of HTML code.

   - **5b-2:** Inside the function:
     1. Create a variable `html` and initialize it with `"<h4>Links</h4>"`.
     2. Create a `for-in` loop to iterate over `linkList`. For each link:
        - Append the following to `html`:
          ```javascript
          "<a href=" + linkList[link] + ">" + link + "</a><br>";
          ```
     3. Return `html` after the loop completes.

---

### ✅ **Check Your Work!**

To verify that your changes are working:

1. **Restart your server:**

   ```bash
   node wot-server.js
   ```

2. **Visit resource URLs in your browser:**
   Open a browser and navigate to one of your resource URLs, such as:

   - `arduino`
   - `Copy code`
   - `http://localhost:8484/`

3. **Test the links:**

   - Confirm that the page displays resource data as before.
   - Check that links to subresources appear under a "Links" section.
   - Click the links to verify they navigate correctly to their respective subresources.

If everything works as expected, congratulations! 🎉 You've made your Pi server significantly more user-friendly and dynamic. This final step completes your automated routing system, providing seamless navigation and scalability for future enhancements. 🚀

<br><br><br><br>

### Challenge: Automate Parent Links

🎯 **Goal:** Enhance your server to include parent links in the response headers, allowing users to navigate back to the root resource from any subresource.

### Step-by-Step Instructions (Optional)

1. **Update the `populateLinks` function:**

   - **1a-1:** Add a new parameter to the `populateLinks` function called `parentLink`.
   - **1a-2:** Inside the function, check if `parentLink` is defined. If it is, add a new property to the `linkObject`:

     - **Key:** `Parent`
     - **Value:** `parentLink`

     > **HINT:** If there is no parent link, then `parentLink` should be either `undefined` or `null`.

2. **Update the `generateRoute` function:**

   - **2a-1:** In the `generateRoute` function, add a new parameter to the `generateRoute` function call inside the recursive loop.
   - **2a-2:** Pass the current resource's `link` property as the `parentLink` argument.

3. **Display the parent link in the HTML**

   - **3a-1:** Update the `generateLinks` function to include the parent link in the HTML output.
   - **3a-2:** Add the following code to the beginning of the function:
     ```javascript
     if (linkList.Parent) {
       html += "<a href=" + linkList.Parent + ">Parent</a><br>";
     }
     ```

4. **Test the parent link:**

   - **4a-1:** Restart your server.
   - **4a-2:** Visit a subresource URL in your browser.
   - **4a-3:** Confirm that the "Links" section now includes a "Parent" link.
   - **4a-4:** Click the "Parent" link to verify it navigates back to the root resource.

Completing this challenge will enhance your server's navigation capabilities, allowing users to move between resources more efficiently. If you choose to tackle this challenge, great job! 🚀
