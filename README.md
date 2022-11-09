# installing Postgres and its extesntions

postgres comes by default with Ubuntu.
pg_routing needs postgis:

```
sudo apt install postgis postgresql-14-postgis-3
sudo apt install postgresql-14-pgrouting
```

To use postgres we login as user `postgres`

```
sudo -i -u postgres
```

We now can use commands to create databases, users ..etc:

```
createuser routingTest
createdb routing_db -O routingTest
```

To run sql commands with postgres we must start the `psql` app.
