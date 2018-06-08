package com.wlc.boot2react.controller;

import com.wlc.boot2react.document.SuggestedLocation;

import com.wlc.boot2react.repository.LocationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@RestController
@RequestMapping(value = "/geo")
public class GeoController {

    @Autowired
    LocationRepository locationRepository;

    @Value("${max.suggested.locations : 10}")
    private int defaultMaxSuggestions;

    @CrossOrigin
    @GetMapping(value = "/suggest/{countryCode}/{locationTerm}")
    List<SuggestedLocation> suggest(
        @PathVariable("countryCode") String countryCode,
        @PathVariable("locationTerm") String locationTerm,
        @RequestParam(value = "maxSuggestions", required = false) Integer maxSuggestions) {

        int maxSuggestedLocations = Optional
            .ofNullable(maxSuggestions)
            .orElse(defaultMaxSuggestions);

        return locationRepository
            .suggestByLocation(countryCode.toUpperCase(), locationTerm, maxSuggestedLocations)
            .filter(Optional::isPresent)
            .map(suggestion -> new SuggestedLocation(suggestion.get()))
            .collect(Collectors.toList());
    }
}
