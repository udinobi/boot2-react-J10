package com.wlc.boot2react.document;

import lombok.Data;

import java.io.Serializable;


// Cannot use here @AllArgsConstructor
// @see https://github.com/rzwitserloot/lombok/issues/1563
@Data
public class Country implements Comparable<Country>, Serializable {
    private final String code;
    private final String name;

    public Country(String code, String name) {
        this.code = code;
        this.name = name;
    }

    @Override
    public int compareTo(Country country) {
        return name.compareTo(country.name);
    }
}
