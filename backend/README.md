# Backend

## Configuration

1. *backend/src/main/resources/Boot2React-(**dev**|**prod**).properties*
   - Set the port where the backend will be listening.  e.g. ```server.port = 8088```
   - Set the name of your ElasticSearch instance.  e.g. ```spring.data.elasticsearch.cluster-name = ESserver```
   - Set the url where your ElasticSearch instance is listening. e.g. ```spring.data.elasticsearch.cluster-nodes = 192.168.56.10:9300```

2. Geocoding information have to be added to ES, for any single country, by using the *backend/src/main/resources/country-loader.sh* script. e.g.

```shell
cd backend/src/main/resources
./country-loader.sh IT Italy
```

- *NOTE*: before running the script, you have to set the ```EShost``` and ```ESport``` vars according to your ES instance.

The *country-loader.sh* script

1. downloads the specified country file (a zipped CSV file) from [geonames.org](http://geonames.org),
2. parses and transforms it into a JSON file,
3. generates the mappings in ES for the country,
4. and then adds all country's locations in bulk to ES

- *NOTE*: the UI provides a button that enables the user to refresh at any moment the country selection.

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

## Running the backend service

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

## REST Endpoints

**Service endpoints**

- *NOTE*: ```/swagger-ui.html``` provides the actual list of the available service endpoints.

1. ```/geo/countries```  (GET)

    List of countries whose locations are present in ES.

    - **Success Response:**
      * Code: **200**
      * Content: ```[ { "code": "KH", "name": "Cambodia" }, { "code": "EC", "name": "Ecuador" } ]```

2. ```/geo/suggest/{countryCode}/{locationTerm}```  (GET)

    List of suggestions according to country code and location prefix (unfortunately ES does not support yet Lucene's infix suggester).

    - **Optional URL parameter**: ```maxSuggestions=[integer]```

    - **Success Response:**
      * Code: **200**
      * Content:
        ```
        [ {
            "coord": {
                "lat": 17.96667,
                "lon": 102.6
            },
            "geoId": 1651944,
            "name": "Vientiane",
            "tz": "Asia/Vientiane"
        },
        {
            "coord": {
                "lat": 18.08333,
                "lon": 102.66667
            },
            "geoId": 1904618,
            "name": "Vientiane Prefecture",
            "tz": "Asia/Vientiane"
        } ]
        ```

    - **Sample call**

      ```/geo/suggest/LA/Vient?maxSuggestions=2```

**Admin endpoints**

- *NOTE*: only available by using the development profile.

1. ```/actuator/shutdown```  (GET)

    Gracefully exit the backend service.

