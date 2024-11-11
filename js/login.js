function storeTestUser() {
    localStorage.setItem("userEmail", "test@example.com");
    localStorage.setItem("userPassword", "password123");
}

window.onload = function() {
    storeTestUser();
};

function loginUser(event) {
    event.preventDefault();  
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    const storedEmail = localStorage.getItem("userEmail");
    const storedPassword = localStorage.getItem("userPassword");

    if (email === storedEmail && password === storedPassword) {
        alert("Inicio de sesión exitoso. ¡Bienvenido!");
        window.location.href = "index.html";  
    } else {
        alert("Email o contraseña incorrectos.");
    }
}

function redirectToSignUp() {
    alert("Redirigiendo a la página de registro.");
}

function loginWithGoogle() {
    alert("Función de inicio con Google no implementada todavía.");
}
