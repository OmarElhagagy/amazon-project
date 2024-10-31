// to send an http request to the backend
const xhr = new XMLHttpRequest();
// to set it up
// We have to put the event listener before we send the request because the response might come back before we even set up the event listener
xhr.addEventListener('load', () => {
  console.log(xhr.response); // and this will not be undefined it will contain the response we saw earlier in the network tab
}); // listens or waits for an event and then it can run function. It takes 2 param first is the event we ewant to listen for in this case we want to wait for the response to come back so we will listen for the load event Load means the response has loaded. Second param is the function we want to run when the event happens

xhr.open('GET', 'https://supersimplebackend.dev/images/apple.jpg'); // first param is Type of HTTP message. Second param is where to send this HTTP message
xhr.send(); // to send the request
// after we send the request we can get the response using but theres a problem using it when we send a request to the backend it takes time for the requesy to travel across the internet to the backend and for the response to come back so the response isnt available immediately and xhr.response will be undefined at first so xhr.send is known as asynchronous code means it doesnt wait for this line to finish it justs send the request and then immediatly goes to the next line the response might come later but we dont have access to it here
// to get the response we need to wait for the response to come back first and then we can access the response using an event listener
//xhr.response
// If the URL isnt supported, theres a status code 404 starts with 4 or 5 (404,400, 500)= response failed. Starting with 4 means our problrm. Starting with 5 means backends problem. Starts with 2 means success. Starts with 3 means redirection.
// How do we know whuch URL paths are supported and which are not. Some backend provide a documentation page that lists all the supported paths
// The list of URL supported paths is called backend API (Application Programming Interface) Interface means how we interact with something. SO the list of URL paths are all the ways we can interact with the backend