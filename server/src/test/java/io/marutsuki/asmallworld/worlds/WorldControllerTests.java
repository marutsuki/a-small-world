package io.marutsuki.asmallworld.worlds;

import org.bson.types.ObjectId;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;
import java.util.List;

import static java.time.Instant.EPOCH;
import static java.time.Instant.ofEpochSecond;
import static org.hamcrest.Matchers.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@AutoConfigureMockMvc
@SpringBootTest(
        webEnvironment = SpringBootTest.WebEnvironment.MOCK
)
public final class WorldControllerTests {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private WorldRepository repository;

    @Test
    public void getAllWorldsTest() throws Exception {
        World aWorld = new World("1",
                ofEpochSecond(5000),
                EPOCH,
                Collections.emptyMap(),
                World.DEFAULT_DIMENSIONS);

        when(repository.findAll())
                .thenReturn(List.of(aWorld));

        mvc.perform(get("/worlds"))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].id", is("1")))
                .andExpect(jsonPath("$[0].createdAt", is("1970-01-01T01:23:20Z")))
                .andExpect(jsonPath("$[0].players", anEmptyMap()));

        verify(repository, times(1)).findAll();
    }

    @Test
    public void postWorldTest() throws Exception {
        when(repository.save(any())).thenReturn(
                new World("1",
                        ofEpochSecond(5000),
                        EPOCH,
                        Collections.emptyMap(),
                        World.DEFAULT_DIMENSIONS));

        mvc.perform(post("/worlds"))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id", is("1")))
                .andExpect(jsonPath("$.createdAt", is("1970-01-01T01:23:20Z")))
                .andExpect(jsonPath("$.players", anEmptyMap()));

        verify(repository, times(1)).save(any());
    }

    @Test
    public void deleteWorldTest() throws Exception {
        mvc.perform(delete("/worlds/66d55b319722801075d78ed3"))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.TEXT_PLAIN))
                .andExpect(content().string("66d55b319722801075d78ed3"));

        verify(repository, times(1)).deleteById(new ObjectId("66d55b319722801075d78ed3"));
    }
}
