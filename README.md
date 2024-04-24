# prime


### Run the following commands to start the database
```bash
docker run -d --name prime -p 5430:5432 -e POSTGRES_PASSWORD=password postgres;
docker exec -it prime bash -c "createdb -E UTF8 -T template0 -U postgres prime"
```
