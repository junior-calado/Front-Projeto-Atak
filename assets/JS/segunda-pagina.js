document.addEventListener('DOMContentLoaded', async function () {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Você precisa estar logado para acessar esta página.');
        window.location.href = 'index.html'; 
        return;
    }

    try {
        const response = await fetch('https://projeto-atak-production.up.railway.app/api/User/Info', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const userInfo = await response.json();
            document.getElementById('userName').textContent = userInfo.name;
            document.getElementById('userEmail').textContent = userInfo.email;
        } else {
            alert('Erro ao obter as informações do usuário.');
            window.location.href = 'index.html'; 
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao tentar carregar as informações do usuário.');
    }
});

async function createExcelFile() {
    const token = localStorage.getItem('token');
    const numberInput = document.getElementById('numberInput').value;

    const numberValue = parseInt(numberInput);
    if (isNaN(numberValue) || numberValue < 10 || numberValue > 1000) {
        alert('Por favor, insira um número entre 10 e 1000.');
        return;
    }

    try {
        const response = await fetch('https://projeto-atak-production.up.railway.app/Excel/generate-excel', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(numberValue) 
        });

        if (response.ok) {
            const resultMessage = await response.text(); 
            alert(resultMessage);
        } else {
            const errorResponse = await response.text();
            console.error('Erro ao gerar o arquivo Excel:', errorResponse);
            alert('Erro ao gerar o arquivo Excel.');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao tentar gerar o arquivo Excel.');
    }
}

async function sendEmail() {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch('https://projeto-atak-production.up.railway.app/Email/enviar-email', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        });

        if (response.ok) {
            alert('E-mail enviado com sucesso.');
        } else {
            const errorResponse = await response.text();
            console.error('Erro ao enviar o e-mail:', errorResponse);
            alert('Erro ao enviar o e-mail.');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao tentar enviar o e-mail.');
    }
}


document.querySelector('.send-button').addEventListener('click', (event) => {
    event.preventDefault();
    sendEmail();
});
