# 🚗 Controle de Veículos - WS Work

![Status](https://img.shields.io/badge/status-concluído-green)
![Java](https://img.shields.io/badge/Java-17-blue?logo=java&logoColor=white)
![Spring](https://img.shields.io/badge/Spring_Boot-3.x-green?logo=spring&logoColor=white)
![React](https://img.shields.io/badge/React-18-blue?logo=react&logoColor=61DAFB)
![AWS](https://img.shields.io/badge/AWS-Deployed-orange?logo=amazon-aws&logoColor=white)

Aplicação Full-Stack desenvolvida como parte do processo seletivo da **WS Work**. O projeto consiste em um sistema de CRUD para Carros, Modelos e Marcas, com uma API REST em Spring Boot e um frontend reativo em React.

---

## 🌐 Demonstração ao Vivo

A aplicação está hospedada na AWS e pode ser acessada através do link abaixo:

**[Acessar a Aplicação](http://wswork-api-teste-2025.s3-website.us-east-2.amazonaws.com)**

*(Nota: Como o backend utiliza um banco de dados em memória (H2), os dados são reiniciados a cada deploy ou reinicialização do servidor.)*

---

## ✨ Funcionalidades

* **Backend**: API REST completa com operações CRUD para Carros, Modelos e Marcas.
* **Frontend**: Interface reativa e responsiva para listar e cadastrar veículos.
* **Banco de Dados**: Utiliza H2 em memória, populado com dados iniciais a cada inicialização para fins de demonstração.
* **Deploy**: Arquitetura de nuvem com Backend no AWS Elastic Beanstalk e Frontend no AWS S3.

---

## 🛠️ Tecnologias Utilizadas

| Backend (API) | Frontend (UI) |
| :--- | :--- |
| Java 17 | React 18 |
| Spring Boot 3.x | Vite |
| Spring Data JPA | Tailwind CSS |
| H2 Database | JavaScript (ES6+) |
| Lombok | PostCSS |
| Maven | NPM |

---

## 📁 Estrutura do Projeto

O repositório está organizado em um formato **monorepo**, com duas pastas principais na raiz:

* `/backend`: Contém a aplicação Spring Boot (API REST).
* `/frontend`: Contém a aplicação React (Interface do Usuário).

---

## 🚀 Como Rodar Localmente

### Pré-requisitos

* **Java 17 ou superior** (JDK)
* **Maven 3.8 ou superior**
* **Node.js 18 ou superior**
* **NPM** (geralmente vem com o Node.js)

### 1. Rodando o Backend (API)

```bash
# Clone o repositório
git clone [https://github.com/JhonnyBrN/wswork_api-test.git](https://github.com/seu-usuario/seu-repositorio.git)
cd seu-repositorio/backend

# Instale as dependências e inicie a aplicação
mvn spring-boot:run
```
A API estará disponível em `http://localhost:8080`. (NÃO ESQUEÇA DE TROCAR DO APP.JSX[se for rodar localmente])

### 2. Rodando o Frontend (UI)

*Abra um **novo terminal**.*
```bash
# Navegue para a pasta do frontend
cd seu-repositorio/frontend

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```
A aplicação frontend estará disponível em `http://localhost:5173` (ou porta similar).

---

## 🗄️ Banco de Dados H2 (Local)

Para desenvolvimento local, o projeto utiliza **H2 Database em memória**. Os dados iniciais de Marcas e Modelos são populados automaticamente pela classe `DataInitializer`.

Para acessar o console do banco no navegador:

* **URL:** `http://localhost:8080/h2-console`
* **JDBC URL:** `jdbc:h2:mem:wsworkdb`
* **User:** `sa`
* **Password:** *(deixe em branco)*

---

## 🔗 Endpoints da API

A URL base para todos os endpoints é `http://localhost:8080`.

### Marcas
| Método HTTP | Endpoint | Descrição |
| :--- | :--- | :--- |
| `GET` | `/marcas` | Lista todas as marcas. |
| `POST` | `/marcas` | Cria uma nova marca. |
| `PUT` | `/marcas/{id}` | Atualiza uma marca existente. |
| `DELETE` | `/marcas/{id}` | Deleta uma marca. |

*Exemplo de corpo para `POST /marcas`:*
```json
{ "nome_marca": "Honda" }
```

### Modelos
| Método HTTP | Endpoint | Descrição |
| :--- | :--- | :--- |
| `GET` | `/modelos` | Lista todos os modelos. |
| `GET` | `/modelos/json` | **Endpoint especial** que retorna os carros formatados. |
| `POST` | `/modelos` | Cria um novo modelo. |
| `PUT` | `/modelos/{id}` | Atualiza um modelo existente. |
| `DELETE` | `/modelos/{id}` | Deleta um modelo. |

*Exemplo de corpo para `POST /modelos`:*
```json
{
  "nome": "Civic",
  "valor_fipe": 120000,
  "marca": { "id": 1 }
}
```

### Carros
| Método HTTP | Endpoint | Descrição |
| :--- | :--- | :--- |
| `GET` | `/carros` | Lista todos os carros (formato de entidade). |
| `POST` | `/carros` | Cria um novo carro. |
| `PUT` | `/carros/{id}` | Atualiza um carro existente. |
| `DELETE` | `/carros/{id}` | Deleta um carro. |

*Exemplo de corpo para `POST /carros`:*
```json
{
  "ano": 2023,
  "combustivel": "Híbrido",
  "num_portas": 4,
  "cor": "Prata",
  "modelo": { "id": 1 }
}
```
---
Desenvolvido por **João Felipe**.
