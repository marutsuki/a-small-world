package io.marutsuki.asmallworld.config;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@AllArgsConstructor
@Component
public class WebConfig implements WebMvcConfigurer {

    private final ClientProperties properties;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(properties.getOrigins().toArray(String[]::new))
                .allowedMethods("*");
    }
}
