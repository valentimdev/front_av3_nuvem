
const apiUrl = 'http://localhost:3000'; // Substitua pela URL do seu backend, se necessário

// Função para mostrar todos os produtos
async function getAllProducts() {
    const response = await fetch(`${apiUrl}/products`);
    const products = await response.json();
    
    const productsList = document.getElementById('products-list');
    productsList.innerHTML = ''; // Limpar lista antes de adicionar novos produtos
    
    if (products.length === 0) {
        productsList.innerHTML = '<p>Nenhum produto encontrado.</p>';
    } else {
        const ul = document.createElement('ul');
        products.forEach(product => {
            const li = document.createElement('li');
            li.textContent = `ID: ${product.id} | Nome: ${product.name} | Preço: R$${product.price}`;
            ul.appendChild(li);
        });
        productsList.appendChild(ul);
    }
}

// Função para consultar produto por ID
async function getProductById() {
    const id = document.getElementById('product-id').value;
    
    if (!id) {
        alert('Digite um ID');
        return;
    }
    
    const response = await fetch(`${apiUrl}/products/${id}`);
    
    if (response.status === 200) {
        const product = await response.json();
        document.getElementById('product-result').textContent = `Produto: ${product.name}, Descrição: ${product.description}, Preço: R$${product.price}`;
    } else {
        document.getElementById('product-result').textContent = 'Produto não encontrado';
    }
}

// Função para cadastrar produto
document.getElementById('create-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;

    if (!name || !description || !price) {
        alert('Preencha todos os campos');
        return;
    }

    const response = await fetch(`${apiUrl}/products`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description, price }),
    });

    if (response.ok) {
        alert('Produto cadastrado com sucesso!');
        document.getElementById('create-form').reset();
        getAllProducts();
    } else {
        alert('Falha ao cadastrar produto');
    }
});

// Função para alterar produto
async function updateProduct() {
    const id = document.getElementById('update-id').value;
    const name = document.getElementById('update-name').value;
    const description = document.getElementById('update-description').value;
    const price = document.getElementById('update-price').value;

    if (!id || !name || !description || !price) {
        alert('Preencha todos os campos');
        return;
    }

    const response = await fetch(`${apiUrl}/products/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description, price }),
    });

    if (response.ok) {
        alert('Produto alterado com sucesso!');
        getAllProducts();
    } else {
        alert('Falha ao alterar produto');
    }
}

// Função para deletar produto
async function deleteProduct() {
    const id = document.getElementById('delete-id').value;

    if (!id) {
        alert('Digite o ID do produto a ser deletado');
        return;
    }

    const response = await fetch(`${apiUrl}/products/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        alert('Produto deletado com sucesso!');
        getAllProducts();
    } else {
        alert('Falha ao deletar produto');
    }
}
