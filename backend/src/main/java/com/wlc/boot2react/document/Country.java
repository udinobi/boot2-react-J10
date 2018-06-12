package com.wlc.boot2react.document;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;


@Data @AllArgsConstructor
public class Country implements Comparable<Country>, Serializable {
    private final String code;
    private final String name;

    @Override
    public int compareTo(Country country) {
        return name.compareTo(country.name);
    }
}
