document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch('https://projeto-atak-production.up.railway.app/api/User/Login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        if (response.ok) {

            const text = await response.text();
            
            if (text.startsWith('eyJhbGci')) {
                alert("Login realizado com sucesso!");
                localStorage.setItem('token', text);
                window.location.href = "segunda-pagina.html";
            } else {
                alert("Resposta inesperada do servidor.");
            }
        } else {
            alert("Erro ao realizar login. Verifique suas credenciais.");
        }
    } catch (error) {
        console.error("Erro:", error);
        alert("Ocorreu um erro ao realizar o login.");
    }
});
