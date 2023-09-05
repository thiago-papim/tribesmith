# Store Manager

Feito por [Thiago Papim](https://www.linkedin.com/in/thiago-papim/)


## Sobre o Projeto 📝
 
Este projeto visa desenvolver uma API para gerenciar itens medievais, seguindo o padrão CRUD (Create, Read, Update e Delete). A aplicação está escrita em TypeScript e utilizará o Sequelize, um ORM (Object-Relational Mapping), para interagir com um banco de dados.

<b>Principal objetivo do projeto:</b><br>
Desenvolver um CRUD com TypeScript

## Ferramentas e Habilidades utilizadas ⚙️
- Node.js
- MySQL
- Express
- Docker
- Arquitetura de software MSC

 ## Como Executar o Projeto ✅
> 👀 Necessário ter o docker e o docker-compose instalados em sua máquina.
<details><summary><strong>Passo a passo</strong></summary><br/>

1. Clone o repositório
```
git clone git@github.com:thiago-papim/project-store-manager.git
```
2. Instalar dependências<br>
```
npm install
```
3. Subir os containers<br>
Iremos subir 2 containers no total, sendo eles backend e database

```
docker-compose up -d --build
```
4. Acessar o container
```
docker exec -it trybesmith_api bash
```
5. Popular o Banco de Dados
```
npm run db:reset
```

</details>

 ## Endpoints 🔽

 <h2>Autenticação de Token</h2>
<details><summary><strong>Funcionamento</strong></summary><br/>

`Realizando um login com sucesso, será gerado um token. Esse token será a autenticação em algumas rotas que estarão marcadas.`

Basta na requisição colocar na chave Authorization o Bearer juntamente ao token: 

Exemplo com chave fictícia:

```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWxzIjoiYWRtaW5AYWRtaW4uY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjkwMzg1MzAzfQ.iVsAT1dlUMQsexBEi-t8qPqAzD0wi-tME0nVWR80BS0
```
<details><summary><strong>Caso não tenha a chave Authorization ou não tenha um token declarado</strong></summary><br/>
Tem status o 401 e a resposta da requisição:

```
{
	"message": "Token not found"
}
```
</details>

<details><summary><strong>Caso o token seja inválido</strong></summary><br/>
Tem status o 401 e a resposta da requisição:

```
{
	"message": "Invalid token"
}
```

</details>

</details>
<h2>Produtos</h2>
<details><summary><strong>Rotas</strong></summary><br/>

| Endpoint | Método | Funcionalidade |
|---|---|---|
| `/produtos` | `POST` | Criar um produto |

O corpo da requisição tem que ter a seguinte estrutura:

> As ordens dos pedidos de id 1 a 3 já foram criados pelo seeders no banco de dados, sendo assim novos produtos devem passar um novo orderId, pois os produtos são exclusivos.

```
{
  "name": "Martelo de Thor",
  "price": "30 peças de ouro",
  "orderId": 4
}
```

<details><summary><strong>Em caso de sucesso</strong></summary><br/>

O resposta da requisição tem que ser um token com status 201.<br>
Exemplo de retorno:

```
{
  "id": 6,
  "name": "Martelo de Thor",
  "price": "30 peças de ouro"
}
```

</details>

<details><summary><strong>Em caso de Falha</strong></summary><br/>

Caso não tenha o campo name tem status 400 e retorno:

```
{
  "message": "\"name\" is required"
}
```

Caso name não seja do tipo string tem status 422 e retorno:

```
{
  "message": "\"name\" must be a string"
}
```

Name tem que ser uma string com mais de 2 caracteres tem status 422 e retorno:
```
{
  "message": "\"name\" length must be at least 3 characters long"
}
```

Caso não tenha o campo price tem status 400 e retorno:

```
{
  "message": "\"price\" is required"
}
```

Caso price não seja do tipo string tem status 422 e retorno:

```
{
  "message": "\"price\" must be a string"
}
```

Price tem que ser uma string com mais de 2 caracteres tem status 422 e retorno:
```
{
  "message": "\"price\" length must be at least 3 characters long"
}
```


</details>

##

| Endpoint | Método | Funcionalidade |
|---|---|---|
| `/produtos` | `GET` | Listar todos os produtos |

<details><summary><strong>Em caso de sucesso</strong></summary><br/>

O resposta da requisição tem que ser um token com status 200.<br>
Exemplo de retorno:

```
[
  {
    "id": 1,
    "name": "Pedra Filosofal",
    "price": "20 gold",
    "orderId": null
  },
  {
    "id": 2,
    "name": "Lança do Destino",
    "price": "100 diamond",
    "orderId": 1
  }
]
```

</details>

</details>

<!-- PEDIDOS -->

<h2>Pedidos</h2>
<details><summary><strong>Rotas</strong></summary><br/>

| Endpoint | Método | Funcionalidade |
|---|---|---|
| `/orders` | `GET` | Retornar todos os pedidos |

<details><summary><strong>Em caso de sucesso</strong></summary><br/>

O resposta da requisição tem que ser um token com status 200.<br>
Exemplo de retorno:

```
[
  {
    "id": 1,
    "userId": 2,
    "productIds": [1, 2]
  },
  {
    "id": 2,
    "userId": 1,
    "productIds": [3, 4]
  }
]
```

</details>

| Endpoint | Método | Funcionalidade |
|---|---|---|
| `/orders` | `POST` | Cadastrar um pedido |

`IMPORTANTE: NECESSÁRIO USO DO TOKEN DE AUTENTICAÇÃO`

O endpoint deve receber a seguinte estrutura:

```
{
  "productIds": [1, 2],
  "userId": 1
}
```

<details><summary><strong>Em caso de sucesso</strong></summary><br/>

O resposta da requisição tem que ser um token com status 201.<br>
Exemplo de retorno:

```
{
  "userId": 1,
  "productIds": [1, 2]
}
```

</details>

<details><summary><strong>Em caso de falha</strong></summary><br/>

Caso não tenha o campo userID tem status 400 e resposta:

```
{
  "message": "\"userId\" is required"
}
```

Caso o campo userID não seja um number tem status 422 e resposta:

```
{
  "message": "\"userId\" must be a number"
}
```

Caso o campo userID não for um usuário tem status 404 e resposta:

```
{
  "message": "\"userId\" not found"
}
```

Caso não tenha o campo productIds tem status 400 e resposta:

```
{
  "message": "\"productIds\" is required"
}
```

Caso o campo productIds não seja um array tem status 422 e resposta:

```
{
  "message": "\"productIds\" must be an array"
}
```

Caso o campo productIds seja um array vazio tem status 422 e resposta:

```
{
  "message": "\"productIds\" must include only numbers"
}
```

</details>

</details>

<h2>Login</h2>
<details><summary><strong>Rotas</strong></summary><br/>

| Endpoint | Método | Funcionalidade |
|---|---|---|
| `/login` | `POST` | Realizar login |

Esses campos são validados no Banco de Dados
Exemplo abaixo é um usúario já cadastrado
O endpoint deve receber a seguinte estrutura:

```
{
  "username": "Hagar",
  "password": "terrível"
}
```

<details><summary><strong>Em caso de sucesso</strong></summary><br/>

O resposta da requisição tem que ser um token com status 200.<br>
Exemplo de retorno:

```
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJIYWdhciIsImlhdCI6MTY5MzkyOTYxOH0.eIcJn4WXhJ37XMD9F87UWOQOYTtrdB_IqU2KaLN4vlM"
}
```

</details>

<details><summary><strong>Em caso de falha</strong></summary><br/>

Caso não tenha o campo username ou password:

```
{
	"message": "\"username\" and \"password\" are required"
}
```

Caso o username ou password estejam errados:

```
{
	"message": "Username or password invalid"
}
```

</details>

</details>