// Lista de usuários e senhas com roles
const users = [
    { username: "admin", password: "4321", role: "admin" },
    { username: "user1", password: "1234", role: "user" },
    { username: "user2", password: "5678", role: "user" }
];

document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Busca o usuário na lista
    const userFound = users.find(user => user.username === username && user.password === password);

    if (userFound) {
        // Salva como JSON no sessionStorage
        sessionStorage.setItem("loggedInUser", JSON.stringify(userFound));

        // Redireciona para a galeria
        window.location.href = "./news.html"; 
    } else {
        const errorMessage = document.getElementById("error-message");
        errorMessage.style.display = "block";
        errorMessage.textContent = "Usuário ou senha incorretos.";
    }
    document.addEventListener("DOMContentLoaded", () => {
        const user = JSON.parse(sessionStorage.getItem("loggedInUser"));
    
        if (!user) {
            window.location.href = "index.html"; // Redireciona para login se não estiver logado
        }
    
        document.getElementById("logoutButton").addEventListener("click", () => {
            sessionStorage.removeItem("loggedInUser"); // Remove o usuário da sessão
            window.location.href = "index.html"; // Redireciona para login
        });
    });
    
});


