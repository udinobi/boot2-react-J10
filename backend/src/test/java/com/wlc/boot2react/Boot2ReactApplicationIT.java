package com.wlc.boot2react;

import com.fasterxml.jackson.databind.ObjectMapper;

import com.wlc.boot2react.document.SuggestedLocation;

import org.junit.Test;

import org.junit.runner.RunWith;

import org.springframework.boot.test.context.SpringBootTest;

import org.springframework.boot.test.web.client.TestRestTemplate;

import org.springframework.boot.web.server.LocalServerPort;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.test.context.ActiveProfiles;

import org.springframework.test.context.junit4.SpringRunner;

import java.io.IOException;

import static org.hamcrest.Matchers.emptyArray;

import static org.hamcrest.core.Is.is;
import static org.hamcrest.core.IsNot.not;
import static org.hamcrest.core.IsEqual.equalTo;

import static org.junit.Assert.assertThat;

import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.RANDOM_PORT;


@RunWith(SpringRunner.class)
@SpringBootTest(classes = Boot2ReactApplication.class, webEnvironment = RANDOM_PORT)
@ActiveProfiles("dev")
public class Boot2ReactApplicationIT {

    @LocalServerPort
    private int port;

    @Test
    public void testSuggestExistingLocations() throws IOException {
        HttpHeaders headers = new HttpHeaders();
        HttpEntity<String> entity = new HttpEntity<String>(null, headers);

        String uri = "http://localhost:" + port + "/geo/suggest/TH/Bangkok";
        ResponseEntity<String> response = new TestRestTemplate().exchange(uri, HttpMethod.GET, entity, String.class);

        assertThat(response.getStatusCode(), equalTo(HttpStatus.OK));

        SuggestedLocation[] suggestedLocations = new ObjectMapper().readValue(response.getBody(), SuggestedLocation[].class);
        assertThat(suggestedLocations, is(not(emptyArray())));
    }

    @Test
    public void testSuggestNotExistingLocations() throws IOException {
        HttpHeaders headers = new HttpHeaders();
        HttpEntity<String> entity = new HttpEntity<String>(null, headers);

        String uri = "http://localhost:" + port + "/geo/suggest/TH/_Not_Existing_Location_";
        ResponseEntity<String> response = new TestRestTemplate().exchange(uri, HttpMethod.GET, entity, String.class);

        assertThat(response.getStatusCode(), equalTo(HttpStatus.OK));

        SuggestedLocation[] suggestedLocations = new ObjectMapper().readValue(response.getBody(), SuggestedLocation[].class);
        assertThat(suggestedLocations, emptyArray());
    }
}
