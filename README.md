# B_prime


### Rode os seguinte comandos para subir o sistema

#### Database
```bash
docker run -d --name prime -p 5430:5432 -e POSTGRES_PASSWORD=password postgres;
docker exec -it prime bash -c "createdb -E UTF8 -T template0 -U postgres prime"
```

#### Backend

Requisitos: Java 17 e maven

```bash
sdk install java 17.0.2-zulu
sdk use java 17.0.2-zulu
sudo apt install maven
```

```bash
cd backend
mvn clean install
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
