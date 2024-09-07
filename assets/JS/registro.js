document.querySelector('form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:5089/api/User/Create', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                userName: name,
                password: password
            })
        });

        if (response.ok) {
            alert('Registro bem-sucedido! Faça login para continuar.');
            window.location.href = 'index.html';
        } else {
            const errorText = await response.text();
            alert('Erro no registro. Verifique os dados e tente novamente.\n' + errorText);
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao tentar realizar o registro.');
    }
});
