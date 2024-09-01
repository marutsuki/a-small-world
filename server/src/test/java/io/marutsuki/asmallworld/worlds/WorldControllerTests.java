package io.marutsuki.asmallworld.worlds;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.Instant;
import java.util.*;

import static org.hamcrest.Matchers.empty;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@AutoConfigureMockMvc
@SpringBootTest(
        webEnvironment = SpringBootTest.WebEnvironment.MOCK
)
public final class WorldControllerTests {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private WorldRepository repository;

    @Test
    public void getAllWorldsTest() throws Exception {
        World aWorld = new World("1",
                Instant.ofEpochSecond(5000),
                Collections.emptyMap(),
                Collections.emptyMap(),
                World.DEFAULT_DIMENSIONS,
                false);

        when(repository.findAll())
                .thenReturn(List.of(aWorld));

        mvc.perform(get("/worlds"))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].id", is("1")))
                .andExpect(jsonPath("$[0].createdAt", is("1970-01-01T01:23:20Z")))
                .andExpect(jsonPath("$[0].players", empty()));

        verify(repository, times(1)).findAll();
    }

    @Test
    public void postWorldTest() throws Exception {
        when(repository.save(any())).thenReturn(
                new World("1",
                        Instant.ofEpochSecond(5000),
                        Collections.emptyMap(),
                        Collections.emptyMap(),
                        World.DEFAULT_DIMENSIONS,
                        false));

        mvc.perform(post("/worlds"))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id", is("1")))
                .andExpect(jsonPath("$.createdAt", is("1970-01-01T01:23:20Z")))
                .andExpect(jsonPath("$.players", hasSize(0)));

        verify(repository, times(1)).save(any());
    }

    @Test
    public void patchWorldTest() throws Exception {
        World aWorld = new World("2",
                Instant.ofEpochSecond(5000),
                Collections.emptyMap(),
                Collections.emptyMap(),
                World.DEFAULT_DIMENSIONS,
                false);

        when(repository.findById("2")).thenReturn(Optional.of(aWorld));
        mvc.perform(patch("/worlds/2")
                        .content(objectMapper.writeValueAsBytes(new WorldPatch("aPlayerId")))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id", is("2")))
                .andExpect(jsonPath("$.createdAt", is("1970-01-01T01:23:20Z")))
                .andExpect(jsonPath("$.players", hasSize(1)))
                .andExpect(jsonPath("$.players", hasItem("aPlayerId")));

        verify(repository, times(1))
                .save(new World("2",
                        Instant.ofEpochSecond(5000),
                        Map.of("aPlayerId", any()),
                        Collections.emptyMap(),
                        World.DEFAULT_DIMENSIONS,
                        false));
    }

    @Test
    public void deleteWorldTest() throws Exception {
        mvc.perform(delete("/worlds/3"))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.TEXT_PLAIN))
                .andExpect(content().string("3"));

        verify(repository, times(1)).deleteById("3");
    }
}
