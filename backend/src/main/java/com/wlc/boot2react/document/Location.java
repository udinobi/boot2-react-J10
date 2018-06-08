package com.wlc.boot2react.document;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.springframework.data.annotation.Id;

import org.springframework.data.elasticsearch.annotations.Document;

import org.springframework.data.elasticsearch.core.completion.Completion;

import org.springframework.data.elasticsearch.core.geo.GeoPoint;

import java.io.Serializable;
import java.time.LocalDate;


@Data @AllArgsConstructor @NoArgsConstructor
@Document(indexName = "locations", type = "location", shards = 1)
public class Location implements Serializable {

    @Id
    private String id;

    private int geoId;
    private Completion name;
    private GeoPoint location;
    private String tz;

    @JsonDeserialize(using = LocalDateDeserializer.class)
    @JsonSerialize(using = LocalDateSerializer.class)
    private LocalDate lastMod;
}
