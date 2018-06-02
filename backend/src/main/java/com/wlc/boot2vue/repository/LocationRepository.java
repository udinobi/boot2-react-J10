package com.wlc.boot2vue.repository;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;

import com.wlc.boot2vue.document.SuggestedCompletionLocation;

import org.elasticsearch.action.search.SearchResponse;

import org.elasticsearch.client.Client;

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

import java.util.List;
import java.util.Optional;

import java.util.stream.Stream;


@Repository
public class LocationRepository {

    private static final Logger logger = LoggerFactory.getLogger(LocationRepository.class);

    @Autowired
    Client client;

    private final ObjectReader objectReader = new ObjectMapper().readerFor(SuggestedCompletionLocation.class);

    public Stream<Optional<SuggestedCompletionLocation>> suggestByLocation(String countryCode, String locationTerm, int maxSuggestions) {
        SuggestionBuilder suggestionBuilder = SuggestBuilders
            .completionSuggestion("name")
            .prefix(locationTerm, Fuzziness.ONE)
            .size(maxSuggestions);

        SuggestBuilder suggestBuilder = new SuggestBuilder().addSuggestion(countryCode, suggestionBuilder);

        SearchResponse response = client
            .prepareSearch("locations")
            .setFetchSource(new String[] { "name", "location" }, null)
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
