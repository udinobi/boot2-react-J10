package com.wlc.boot2react.repository;

import com.carrotsearch.hppc.cursors.ObjectObjectCursor;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;

import com.google.common.collect.ImmutableList;

import com.wlc.boot2react.document.Country;
import com.wlc.boot2react.document.SuggestedCompletionLocation;

import org.elasticsearch.action.admin.indices.create.CreateIndexRequest;

import org.elasticsearch.action.admin.indices.create.CreateIndexResponse;
import org.elasticsearch.action.admin.indices.exists.indices.IndicesExistsRequest;
import org.elasticsearch.action.admin.indices.exists.indices.IndicesExistsResponse;

import org.elasticsearch.action.admin.indices.mapping.get.GetMappingsResponse;

import org.elasticsearch.action.search.SearchResponse;

import org.elasticsearch.client.Client;

import org.elasticsearch.client.IndicesAdminClient;

import org.elasticsearch.cluster.metadata.MappingMetaData;

import org.elasticsearch.common.collect.ImmutableOpenMap;

import org.elasticsearch.common.unit.Fuzziness;

import org.elasticsearch.search.suggest.Suggest.Suggestion;

import org.elasticsearch.search.suggest.completion.CompletionSuggestion;

import org.elasticsearch.search.suggest.SuggestBuilder;
import org.elasticsearch.search.suggest.SuggestBuilders;
import org.elasticsearch.search.suggest.SuggestionBuilder;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Repository;

import java.io.IOException;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import java.util.stream.Stream;


@Repository
public class LocationRepository {

    private static final Logger logger = LoggerFactory.getLogger(LocationRepository.class);

    private static final String INDEX_NAME = "locations";

    @Autowired
    Client client;

    private final ObjectReader objectReader = new ObjectMapper().readerFor(SuggestedCompletionLocation.class);

    public ImmutableList<Country> countries() {
        GetMappingsResponse response = client.admin()
            .indices()
            .prepareGetMappings(INDEX_NAME).get();

        List<Country> countries = new ArrayList<>();

        ImmutableOpenMap<String, MappingMetaData> mapping = response.mappings().get(INDEX_NAME);
        for (ObjectObjectCursor<String, MappingMetaData> entry : mapping) {
            Optional.of(entry.value.sourceAsMap().get("_meta"))
                .filter(Map.class::isInstance)
                .ifPresent(meta -> Optional.ofNullable(((Map) meta).get("country"))
                    .filter(String.class::isInstance)
                    .ifPresent(country -> countries.add(new Country(entry.key, (String) country)))
                );
        }

        Collections.sort(countries);
        return ImmutableList.copyOf(countries);
    }

    public void createLocationIndexIfNotExists() {
        IndicesAdminClient adminClient = client.admin().indices();
        IndicesExistsResponse indexExistsResponse = adminClient.exists(new IndicesExistsRequest(INDEX_NAME)).actionGet();
        if (indexExistsResponse.isExists()) {
            return;
        }

        CreateIndexRequest request = new CreateIndexRequest(INDEX_NAME);
        CreateIndexResponse createIndexResponse = adminClient.create(request).actionGet(1000L);
        if(!createIndexResponse.isAcknowledged()) {
            String message = "Failed to create index (" + INDEX_NAME + ") in ElasticSearch";
            logger.error(message);
            throw new RuntimeException(message);
        }
    }

    public Stream<Optional<SuggestedCompletionLocation>> suggestByLocation(String countryCode, String locationTerm, int maxSuggestions) {
        SuggestionBuilder suggestionBuilder = SuggestBuilders
            .completionSuggestion("name")
            .prefix(locationTerm, Fuzziness.ZERO)
            .size(maxSuggestions);

        SuggestBuilder suggestBuilder = new SuggestBuilder().addSuggestion(countryCode, suggestionBuilder);

        SearchResponse response = client
            .prepareSearch("locations")
            .setFetchSource(new String[] { "geoId", "name", "location" }, null)
            .suggest(suggestBuilder).get();

        List<? extends Suggestion.Entry.Option> options = response
            .getSuggest()
            .getSuggestion(countryCode)
            .getEntries()
            .get(0)
            .getOptions();

        return options.stream().map(option -> mapToSuggestedLocation(((CompletionSuggestion.Entry.Option) option)
            .getHit()
            .getSourceAsString()
        ));
    }

    private Optional<SuggestedCompletionLocation> mapToSuggestedLocation(String json) {
        try {
            return Optional.of(objectReader.readValue(json));
        } catch (IOException e) {
            logger.error(json, e);
            return Optional.empty();
        }
    }
}
