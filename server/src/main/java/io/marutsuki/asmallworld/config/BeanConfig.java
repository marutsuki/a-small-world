package io.marutsuki.asmallworld.config;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.Duration;

@Configuration
public class BeanConfig {

    @Value("${api.rateLimit.maxTokens:10}")
    private int maxTokens;

    @Value("${api.rateLimit.tokensPerMin:10}")
    private int tokensPerMin;

    @Bean
    public Bucket bucket() {
        Bandwidth limit = Bandwidth.builder()
                .capacity(maxTokens)
                .refillIntervally(tokensPerMin, Duration.ofSeconds(1))
                .build();
        return Bucket.builder().addLimit(limit).build();
    }
}
