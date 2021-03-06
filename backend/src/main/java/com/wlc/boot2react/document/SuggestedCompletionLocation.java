package com.wlc.boot2react.document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.springframework.data.elasticsearch.core.completion.Completion;

import org.springframework.data.elasticsearch.core.geo.GeoPoint;

import java.io.Serializable;


@Data @AllArgsConstructor @NoArgsConstructor
public class SuggestedCompletionLocation implements Serializable {
	private int geoId;
    private Completion name;
    private GeoPoint location;
    private String tz;
}
