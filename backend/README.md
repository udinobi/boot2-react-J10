# Backend

## Backend configuration

1. *backend/src/main/resources/Boot2React-(**dev**|**prod**).properties*
   - Set the port where the backend will be listening.  e.g. ```server.port = 8088```
   - Set the name of your ElasticSearch instance.  e.g. ```spring.data.elasticsearch.cluster-name = ESserver```
   - Set the url where your ElasticSearch instance is listening. e.g. ```spring.data.elasticsearch.cluster-nodes = 192.168.56.10:9300```

2. The backend creates the location index in ElasticSearch (ES), when not already existing, but geocoding information have to be added to ES, for any single country, by using the *backend/src/main/resources/country-loader.sh* script. e.g.

```shell
cd backend/src/main/resources
./country-loader.sh IT Italy
```

- *NOTE*: before running the script, you have to adjust the ```EShost``` and ```ESport``` vars according to your ES instance.

The *country-loader.sh* script

1. downloads the specified country file (a zipped CSV file) from [geonames.org](http://geonames.org),
2. parses and transforms it into a JSON file,
3. generates the mappings in ES for the country,
4. and then adds all country's locations in bulk to ES

- *NOTE*: the UI provides a button that enables the user to refresh at any moment the selectable countries.

## Building the backend artifact

```shell
cd backend
./mvnw clean package
```

- *NOTE*: if Java 10 is not your default runtime run (Mac/Linux)...

```shell
cd backend
JAVA_HOME="${path_to_your_jdk10_folder}" ./mvnw clean package
```

## Running the backend

```shell
cd backend
./mvnw spring-boot:run
```

- *NOTE*: if Java 10 is not your default runtime run (Mac/Linux)...

```shell
cd backend
JAVA_HOME="${path_to_your_jdk10_folder}" ./mvnw spring-boot:run
```

The backend by default runs on a "production" profile. For a "development" profile run...

```shell
cd backend
JAVA_HOME="${path_to_your_jdk10_folder}" ./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
```

If you have maven globally installed you can also run the backend from the project root directory.
Just replace the ```./mvnw``` command with ```mvn --projects backend```. e.g.

```shell
JAVA_HOME="${path_to_your_jdk10_folder}" mvn --projects backend spring-boot:run
```
