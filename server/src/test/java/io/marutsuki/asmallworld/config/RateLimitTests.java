package io.marutsuki.asmallworld.config;

import io.marutsuki.asmallworld.worlds.WorldRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import static java.util.Collections.emptyList;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
@SpringBootTest
public final class RateLimitTests {

    @Value("${api.rateLimit.maxTokens}")
    private int maxTokens;

    @Autowired
    private MockMvc mvc;

    @MockBean
    private WorldRepository repository;

    @BeforeEach
    public void setup() {
        when(repository.findAll()).thenReturn(emptyList());
    }

    @Test
    public void rateLimitReachedTest() throws Exception {
        for (int i = 0; i < maxTokens; i++) {
            mvc.perform(get("/worlds"))
                    .andExpect(status().isOk());
        }
        mvc.perform(get("/worlds"))
                .andExpect(status().isTooManyRequests());
    }
}
