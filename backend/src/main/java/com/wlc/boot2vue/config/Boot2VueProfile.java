package com.wlc.boot2vue.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.context.annotation.PropertySource;

import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;


/**
 * http://localhost:8088/actuator/health
 */

@Configuration
@EnableElasticsearchRepositories(basePackages = "com.wlc.boot2vue.repository")
public class Boot2VueProfile {
    @Configuration
    @Profile("dev")
    @PropertySource(value = "${instance.confdir:classpath:}/Boot2Vue-dev.properties", ignoreResourceNotFound = true)
    static class DevConfiguration {}

    @Configuration
    @Profile("prod")
    @PropertySource(value = "${instance.confdir:classpath:}/Boot2Vue-prod.properties", ignoreResourceNotFound = true)
    static class ProdConfiguration {}
}
