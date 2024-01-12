
export {};

interface SigninUserData {
  email: string;
  password: string;
}

// interface AuthResponse {
//   token: string;
//   role: string;
// }

async function loginUser(signInUser: SigninUserData): Promise<void> {
  try {
    const response = await fetch('http://localhost:3000/auth/login',  {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signInUser),
      
    });

    if (response.ok) {
      const data= await response.json();

      // // Store user token and role in local storage
      // console.log(data.role)
      // localStorage.setItem('userToken', data.token);
      // localStorage.setItem('userRole', data.role);

      console.log('User logged in successfully!');
      if (data.role === 'admin') {
        window.location.href = 'projectlist.html';
      } else {
        window.location.href = 'index.html';
      }
    } else {
      console.error('Failed to login user:', response.statusText);
    }
  } catch (error) {
    console.error('Error logging in user:', error);
  }
}


function handleLogin(): void {
  const emailInput = document.getElementById('email') as HTMLInputElement;
  const passwordInput = document.getElementById('password') as HTMLInputElement;

  
  const signInUser: SigninUserData = {
    email: emailInput.value,
    password: passwordInput.value,
  };

  
  loginUser(signInUser);
  emailInput.value = '';
  passwordInput.value = '';
}

document.addEventListener('DOMContentLoaded', function () {
  const loginButton = document.getElementById(
    'loginButton',
  ) as HTMLButtonElement;
  loginButton.addEventListener('click', handleLogin);
});
