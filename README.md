# B_prime


### Rode os seguinte comandos para subir o sistema

#### Backend

Baixe o java 17, caso não possua

```bash
sdk install java 17.0.2-zulu
sdk use java 17.0.2-zulu
```

```bash
cd backend
mvn spring-boot:run
```

#### Frontend

```bash
cd frontend
npm install
npm start
```

### Tecnologias utilizadas:

#### Backend
- Spring Boot: Cria a API e o servidor. Separando em camadas como Controller, Service e Model para separar as regras de negócio da estrutura principal.
- JUnit: Criação de testes unitários.
- Java 17

#### Frontend
- React: Criação do frontend, por meio de componentes e gerenciando o estado da aplicação.
- Bold-ui: Biblioteca de componentes e estilo para que o aplicativo possua uma aparência Bridger.
- Typescript: Para tipagem e melhor organização do código.
