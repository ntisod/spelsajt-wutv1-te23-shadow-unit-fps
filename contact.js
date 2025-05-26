document.getElementById('contactForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission

  // Clear previous error messages
  document.getElementById('nameError').textContent = '';
  document.getElementById('emailError').textContent = '';
  document.getElementById('messageError').textContent = '';
  document.getElementById('successMessage').style.display = 'none';

  // Get form inputs
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  let isValid = true;

  // Validate name
  if (name.length < 2) {
    document.getElementById('nameError').textContent = 'Name must be at least 2 characters long';
    isValid = false;
  }

  // Validate email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    document.getElementById('emailError').textContent = 'Please enter a valid email address';
    isValid = false;
  }

  // Validate message
  if (message.length < 10) {
    document.getElementById('messageError').textContent = 'Message must be at least 10 characters long';
    isValid = false;
  }

  // If all validations pass, submit the form
  if (isValid) {
    fetch(this.action, {
      method: this.method,
      body: new FormData(this),
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        document.getElementById('successMessage').style.display = 'block';
        this.reset(); // Clear the form
      } else {
        alert('There was an error submitting the form. Please try again.');
      }
    })
    .catch(error => {
      alert('Network error: ' + error.message);
    });
  }
});