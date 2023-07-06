const form = document.getElementById('login-form');

form.addEventListener('submit', function(event) {
  event.preventDefault();
  
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
  const user = existingUsers.find(user => user.username === username && user.password === password);
  
  if (user) {
    // send login data to server
    console.log('Username:', username);
    console.log('Password:', password);
    // redirect to index.html
    window.location.href = 'index.html';
  } else {
    alert('Invalid username or password! Maybe Sign up First or Check that Username and password are correct :) ');
  }
});


