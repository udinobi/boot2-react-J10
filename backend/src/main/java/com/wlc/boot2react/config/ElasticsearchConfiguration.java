package com.wlc.boot2react.config;

import org.elasticsearch.client.transport.TransportClient;

import org.elasticsearch.cluster.ClusterName;

import org.elasticsearch.common.settings.Settings;

import org.elasticsearch.common.transport.InetSocketTransportAddress;

import org.elasticsearch.transport.client.PreBuiltTransportClient;

import org.springframework.beans.factory.annotation.Value;

import org.springframework.context.annotation.Bean;

import org.springframework.context.annotation.Configuration;

import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.ElasticsearchTemplate;

import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;

import java.io.IOException;
import java.net.InetAddress;


@Configuration
@EnableElasticsearchRepositories("com.wlc.boot2react.repository")
public class ElasticsearchConfiguration {

    @Value("${spring.data.elasticsearch.cluster-name}")
    private String clusterName;

    @Value("${spring.data.elasticsearch.cluster-nodes}")
    private String clusterNodes;

    @Bean
    public ElasticsearchOperations elasticsearchOperations() throws IOException {
        String[] nodes = clusterNodes.split(":");
        String server = nodes[0];
        Integer port = Integer.parseInt(nodes[1]);

        Settings settings = Settings.builder()
            .put(ClusterName.CLUSTER_NAME_SETTING.getKey(), clusterName)
            .put("http.enabled", "true")
            //.put("client.transport.sniff", "true")
            //.put("password", "secret password")
            //.put("index.number_of_shards", "1")
            .build();

        TransportClient client = new PreBuiltTransportClient(settings);

        InetAddress inetAddress = InetAddress.getByName(server);
        InetSocketTransportAddress transportAddress = new InetSocketTransportAddress(inetAddress, port);

		client.addTransportAddress(transportAddress);

        return new ElasticsearchTemplate(client);
    }
}
