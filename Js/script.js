const formLogin = document.getElementById("formLogin");
const erroLogin = document.getElementById("erroLogin");
const inputSenha = document.getElementById("senha");
const toggleSenha = document.getElementById("toggleSenha");

if (inputSenha && toggleSenha) {
    toggleSenha.addEventListener("click", () => {
        const isPassword = inputSenha.type === "password";
        inputSenha.type = isPassword ? "text" : "password";
        toggleSenha.classList.toggle("fa-eye");
        toggleSenha.classList.toggle("fa-eye-slash");
    });
}

formLogin.addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();

    if (!email || !senha) {
        erroLogin.textContent = "Preencha e-mail e senha.";
        return;
    }

    try {
        const resposta = await fetch("http://localhost:8000/backend/Api/login.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, senha }),
            credentials: "include"
        });

        const dados = await resposta.json();
        console.log(dados);

        if (resposta.ok) {
            alert("✅ Login realizado com sucesso! Bem-vindo, " + dados.nome + "!");
            window.location.href = "notas.html";
        } else {
            erroLogin.textContent = dados.erro || "Erro ao realizar login.";
        }

    } catch (erro) {
        erroLogin.textContent = "Erro ao conectar com o servidor.";
        console.error(erro);
    }
});