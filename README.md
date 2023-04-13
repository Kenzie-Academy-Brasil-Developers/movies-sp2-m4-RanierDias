# Locadora de Filmes

## Introdução

Hoje você recebeu uma demanda inesperada. O gestor de uma _locadora de filmes_ entrou em contato solicitando seus serviços. O objetivo é elaborar uma API que será utilizada em uma plataforma de streaming. Essa API terá o intuito de gerenciar a coleção de filmes disponíveis.

Abaixo estão todas as regras de negócio definidas pelo cliente, tanto para a entrega quanto para a aplicação. Esse é um cliente muito exigente, portanto siga à risca todas as regras impostas.

Vamos lá?!

## Tabela Movie


| Coluna       | Especificações                               |
| ------------ | -------------------------------------------- |
| **id**       | inteiro, auto incrementado e chave primária. |
| **name**     | string tamanho 50 e não nulo.                |
| **category** | string tamanho 20 e não nulo.                |
| **duration** | inteiro e não nulo.                          |
| **price**    | inteiro e não nulo.                          |

#

## Endpoints da aplicação

| Método | Endpoint    | Responsabilidade       |
| ------ | ----------- | ---------------------- |
| POST   | /movies     | Criar os filmes        |
| GET    | /movies     | Listar todos os filmes |
| GET    | /movies/:id | Buscar filme por id    |
| PATCH  | /movies/:id | Atualizar filme por id |
| DELETE | /movies/:id | Deletar filme por id   |

#

## Regras da aplicação

### GET /movies

| **Resposta do servidor:**           |
| ----------------------------------- |
| **Status code:** **_200 OK._** |

```json
[
    {
        "id": 1,
        "name": "Divertidamente",
        "category": "Animação",
        "duration": 120,
        "price": 35
    },
    {
        "id": 2,
        "name": "Meu vizinho Tororo",
        "category": "Animação",
        "duration": 120,
        "price": 20
}
]
```

## Casos de erro

-   Nas rotas **GET, PATCH e DELETE /movies/:id**, caso **id** não exista a mensagem de erro e status code será:

    -   Status code: **_404 NOT FOUND._**
    -   Mensagem de retorno:

        ```json
        {
            "error": "Movie not found!"
        }
        ```

-   Nas rotas **POST e PATCH**, caso **name** já exista o status code será:

    -   Status code: **_409 CONFLICT._**
    -   Mensagem de retorno:

        ```json
        {
            "error": "Movie name already exists!"
        }
        ```

#

## Exemplos de requisição

### POST /movies

Rota de criação de filme.
| **Corpo da requisição:** |
|-|

```json
{
    "name": "Divertidamente",
    "category": "Animação",
    "duration": 120,
    "price": 35
}
```

| **Resposta do servidor:**           |
| ----------------------------------- |
| **Status code:** **_201 CREATED._** |

```json
{
    "id": 1,
    "name": "Divertidamente",
    "category": "Animação",
    "duration": 120,
    "price": 35
}
```

### GET /movies

Rota de listagem de filmes.
| Resposta do servidor: |
| - |
|**Status code:** **_200 OK._**|

```json
[
    {
        "id": 1,
        "name": "Divertidamente",
        "category": "Animação",
        "duration": 120,
        "price": 35
    },
    {
        "id": 2,
        "name": "Matrix",
        "category": "Ficção",
        "duration": 120,
        "price": 35
    }
]
```

#### Com query parameter

Rota: **/movies?category=Animação**.
| Resposta do servidor: |
| - |
| **Status code:** **_200 OK._** |

```json
[
    {
        "id": 1,
        "name": "Divertidamente",
        "category": "Animação",
        "duration": 120,
        "price": 35
    }
]
```

#### Com query parameter

Rota: **/movies?category=outra categoria**.
| Resposta do servidor: |
| - |
| **Status code:** **_200 OK._** |

```json
[
    {
        "id": 1,
        "name": "Divertidamente",
        "category": "Animação",
        "duration": 120,
        "price": 35
    },
    {
        "id": 2,
        "name": "Matrix",
        "category": "Ficção",
        "duration": 120,
        "price": 35
    }
]
```

### GET /movies/:id

Rota de ler um filme específico.

| Resposta do servidor: |
| - |
| **Status code:** **_200 OK._** |

```json
{
    "id": 1,
    "name": "Divertidamente",
    "category": "Animação",
    "duration": 120,
    "price": 35
}
```

### PATCH /movies/:id

Rota de atualização de filme.

| **Corpo da requisição:** |
|-|

```json
{
    "name": "Matrix 2"
}
```

| Resposta do servidor:          |
| ------------------------------ |
| **Status code:** **_200 OK._** |

```json
{
    "id": 2,
    "name": "Matrix 2",
    "category": "Ficção",
    "duration": 120,
    "price": 35
}
```

### DELETE /movies/:id

Rota de deleção de filme.

| Resposta do servidor: |
|-|
|**Status code:** **_204 NO CONTENT._**|

repository uid: 6c05b259-e7c0-4798-917f-270afbc010d9
