// Get form and submit button elements
const signupForm = document.getElementById('signup-form');
const signupButton = document.getElementById('signup-button');

// Add event listener to submit button
signupButton.addEventListener('click', signUp);

function signUp(event) {
  // Prevent form from submitting and page from reloading
  event.preventDefault();

  // Get form values
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (!username || !email || !password) {
    alert('Please fill all form fields.');
    return;
  }
  
  // Check if user already exists in local storage
  const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
  const userExists = existingUsers.some(user => user.username === username || user.email === email);
  if (userExists) {
    alert('This user already exists. You have already signed up :)');
   // Redirect to log in page
    window.location.href = 'login.html'; 
    return;
  }
  
  // Save user data to local storage
  const newUser = { username, email, password };
  existingUsers.push(newUser);
  localStorage.setItem('users', JSON.stringify(existingUsers));

  // Redirect to log in page
  window.location.href = 'login.html';
}


