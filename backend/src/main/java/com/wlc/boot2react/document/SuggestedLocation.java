package com.wlc.boot2react.document;

import lombok.Data;

import org.springframework.data.elasticsearch.core.geo.GeoPoint;

import java.io.Serializable;


@Data
public class SuggestedLocation implements Serializable {
    private int geoId;
    private String name;
    private GeoPoint coord;
    private String tz;

    public SuggestedLocation(SuggestedCompletionLocation suggestedCompletionLocation) {
        this.geoId = suggestedCompletionLocation.getGeoId();
        this.name = suggestedCompletionLocation.getName().getInput()[ 0 ];
        this.coord = suggestedCompletionLocation.getLocation();
        this.tz = suggestedCompletionLocation.getTz();
    }
}
