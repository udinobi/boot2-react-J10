package com.wlc.boot2react.repository;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;

import com.google.common.collect.ImmutableList;

import com.wlc.boot2react.document.Country;
import com.wlc.boot2react.document.SuggestedCompletionLocation;

import org.elasticsearch.action.search.SearchResponse;

import org.elasticsearch.client.Client;

import org.elasticsearch.common.unit.Fuzziness;

import org.elasticsearch.index.query.QueryBuilders;

import org.elasticsearch.search.SearchHit;

import org.elasticsearch.search.suggest.Suggest.Suggestion;

import org.elasticsearch.search.suggest.SuggestBuilder;
import org.elasticsearch.search.suggest.SuggestBuilders;
import org.elasticsearch.search.suggest.SuggestionBuilder;

import org.elasticsearch.search.suggest.completion.CompletionSuggestion;

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

    private static final String COUNTRY_INDEX_NAME = "countries";
    private static final String TYPE_NAME = "doc";

    @Autowired
    Client client;

    private final ObjectReader objectReader = new ObjectMapper().readerFor(SuggestedCompletionLocation.class);

    public ImmutableList<Country> countries() {
        SearchResponse response = client.prepareSearch(COUNTRY_INDEX_NAME)
            .setTypes(TYPE_NAME)
            .setQuery(QueryBuilders.matchAllQuery())
            .setSize(1000)
            .execute()
            .actionGet();

        List<Country> countries = new ArrayList<>();

        for (SearchHit hit : response.getHits()) {
            Map<String, Object> source = hit.getSource();
            countries.add(new Country((String) source.get("code"), (String) source.get("name")));
        }

        Collections.sort(countries);
        return ImmutableList.copyOf(countries);
    }

    public Stream<Optional<SuggestedCompletionLocation>> suggestByLocation(String countryCode, String locationTerm, int maxSuggestions) {
        SuggestionBuilder suggestionBuilder = SuggestBuilders
            .completionSuggestion("name")
            .prefix(locationTerm, Fuzziness.ZERO)
            .size(maxSuggestions);

        SuggestBuilder suggestBuilder = new SuggestBuilder().addSuggestion(TYPE_NAME, suggestionBuilder);

        SearchResponse response = client
            .prepareSearch(countryCode.toLowerCase())
            .setFetchSource(new String[] { "geoId", "name", "location" }, null)
            .suggest(suggestBuilder).get();

        List<? extends Suggestion.Entry.Option> options = response
            .getSuggest()
            .getSuggestion(TYPE_NAME)
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
