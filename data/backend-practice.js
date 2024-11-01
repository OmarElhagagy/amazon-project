// to send an http request to the backend
const xhr = new XMLHttpRequest();

xhr.addEventListener('load', () => {
  console.log(xhr.response); 
}); 

xhr.open('GET', 'https://supersimplebackend.dev/images/apple.jpg'); 
