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

example workflow, we connect to postgress and drop an existing DB:

```
sudo -i -u postgres
psql
\l
DROP DATABASE postgis_db;
\l
```

# setting up a database for our project

## creating a db

```
createuser geocoder
createdb routing_db -O geocoder
```

## configuring the db

after creating a db we connect to it `/connect db_name` and install the extensions needed:

```
CREATE EXTENSION postgis;
CREATE EXTENSION pgRouting;
```

we copy the data to the db using

```
osm2pgrouting -d routing_db -U postgres -h localhost -p <postgress port number> -W your_password -f map1.osm -c “.\mapconfig.xml” — clean
```

to get the port number of postgres we use `pg_lsclusters`

osm2pgrouting -d routing_db -U postgres -h localhost -p 5433 -W postgres -f "/mnt/92804264-c37f-48cb-8ec5-49bc5be832fa/hasan/playground/bunyan/personal_projects/geocoder/assets/map.osm" -c "/mnt/92804264-c37f-48cb-8ec5-49bc5be832fa/hasan/playground/bunyan/personal_projects/geocoder/mapconfig.xml" — clean
