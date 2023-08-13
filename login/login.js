
const axios = require('axios')
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.login-form');
  
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const username = loginForm.querySelector('input[type="text"]').value;
      const password = loginForm.querySelector('input[type="password"]').value;
      const credentials = `${username}:${password}`;
      const base64Credentials = btoa(credentials);

      console.log(password,username)
  
      try {
        const response = await axios.post('http://localhost:3000/login/patient', null, {
          headers: {
            'Authorization': `Basic ${base64Credentials}`
          }
        });
        console.log(response)
        if (response.status === 200) {
          // Redirect to /chat page on successful login
          window.location.href = 'http://localhost:3000/chat';
        } else {
          console.error('Login failed');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    });
  });