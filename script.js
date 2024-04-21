document.addEventListener('DOMContentLoaded', function() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.isLoggedIn) {
      updateUserProfile(user);
    } else {
      showLoginForm();
    }
  });
  
  function login() {
    const usernameInput = document.getElementById('username-input');
    const fileInput = document.getElementById('icon-file-input');
    
    const reader = new FileReader();
    reader.onload = function(e) {
      const user = {
        isLoggedIn: true,
        name: usernameInput.value,
        profilePictureUrl: e.target.result // La imagen se convierte en una URL base64
      };
  
      localStorage.setItem('user', JSON.stringify(user));
      updateUserProfile(user);
    };
  
    // Si se ha subido una imagen, lee la imagen como URL base64, de lo contrario, procede sin ella
    if (fileInput.files.length > 0) {
      reader.readAsDataURL(fileInput.files[0]);
    } else {
      const user = {
        isLoggedIn: true,
        name: usernameInput.value,
        profilePictureUrl: 'default_profile.png' // Utiliza una imagen predeterminada si no se sube ninguna imagen
      };
  
      localStorage.setItem('user', JSON.stringify(user));
      updateUserProfile(user);
    }
  }
  
  function logout() {
    localStorage.removeItem('user');
    showLoginForm();
  }
  
  function updateUserProfile(user) {
    const profileIcon = document.getElementById('profile-icon');
    const usernameSpan = document.getElementById('username');
    const loginForm = document.getElementById('login-form');
    const userProfile = document.getElementById('user-profile');
  
    if (user.isLoggedIn) {
      profileIcon.src = user.profilePictureUrl;
      usernameSpan.textContent = user.name;
      loginForm.style.display = 'none';
      userProfile.style.display = 'flex';
    } else {
      profileIcon.src = 'guest_icon.png';
      usernameSpan.textContent = 'Guest';
      userProfile.style.display = 'none';
      loginForm.style.display = 'block';
    }
  }
  
  function showLoginForm() {
    const loginForm = document.getElementById('login-form');
    const userProfile = document.getElementById('user-profile');
    loginForm.style.display = 'block';
    userProfile.style.display = 'none';
  }
  