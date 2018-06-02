package com.wlc.boot2vue;

import org.springframework.boot.SpringApplication;

import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.core.env.AbstractEnvironment;


@SpringBootApplication
public class Boot2VueApplication {

    public static void main(String[] args) {
        activateProdProfileIfNeeded();
        SpringApplication.run(Boot2VueApplication.class, args);
    }

    private static void activateProdProfileIfNeeded() {
        if (System.getProperty(AbstractEnvironment.ACTIVE_PROFILES_PROPERTY_NAME) == null) {
            System.setProperty(AbstractEnvironment.ACTIVE_PROFILES_PROPERTY_NAME, "prod");
        }
    }
}
