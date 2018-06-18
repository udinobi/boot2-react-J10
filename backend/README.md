# Backend

## Backend configuration

1. *backend/src/main/resources/Boot2React-(**dev**|**prod**).properties*
   - Set the port where the backend will be listening.  e.g. ```server.port = 8088```
   - Set the name of your ElasticSearch instance.  e.g. ```spring.data.elasticsearch.cluster-name = ESserver```
   - Set the url where your ElasticSearch instance is listening. e.g. ```spring.data.elasticsearch.cluster-nodes = 192.168.56.10:9300```

2. The backend creates the location index in ElasticSearch (ES), when not already existing, but geographical information have to added to ES, for any single country, by using the *backend/src/main/resources/country-loader.sh* script. e.g.

```shell
./backend/src/main/resources/country-loader.sh IT Italy
```

- *NOTE*: before running the script, you have to adjust the ```EShost``` and ```ESport``` vars according to your ES instance.

The *country-loader.sh* script

1. downloads the specified country file (a zipped CSV file) from [geonames.org](http://geonames.org),
2. parses and transforms it into a JSON file,
3. generates the mappings in ES for the country,
4. and then adds all country's locations in bulk to ES

- *NOTE*: the UI provides a button that enables the user to reload the available countries from ES.

## Building the backend artifact

```shell
mvn clean package
```

- *NOTE*: if Java 10 is not your default runtime run...

```shell
JAVA_HOME="${path_to_your_jdk10_folder}" mvn clean package
```

## Running the backend

```shell
mvn --projects backend spring-boot:run
```

- *NOTE*: if Java 10 is not your default runtime run...

```shell
JAVA_HOME="${path_to_your_jdk10_folder}" mvn --projects backend spring-boot:run
```

The backend by default runs on a "production" profile. For a "development" profile run...

```shell
JAVA_HOME="${path_to_your_jdk10_folder}" mvn --projects backend spring-boot:run -Dspring-boot.run.profiles=dev
```
