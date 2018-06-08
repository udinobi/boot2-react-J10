package com.wlc.boot2react.document;

import lombok.Data;

import org.springframework.data.elasticsearch.core.geo.GeoPoint;

import java.io.Serializable;


@Data
public class SuggestedLocation implements Serializable {
    private String name;
    private GeoPoint location;

    public SuggestedLocation(SuggestedCompletionLocation suggestedCompletionLocation) {
        this.name = suggestedCompletionLocation.getName().getInput()[ 0 ];
        this.location = suggestedCompletionLocation.getLocation();
    }
}
