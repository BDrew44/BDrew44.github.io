import fetch from("node-fetch");

async function f() {
  const response = await fetch("http://github.com");

  console.log(response);

  if (response.ok) {
    console.log("response recieved");
    console.log(response.status);
  }
}