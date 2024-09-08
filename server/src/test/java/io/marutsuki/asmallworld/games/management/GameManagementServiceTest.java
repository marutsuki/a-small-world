package io.marutsuki.asmallworld.games.management;

import io.marutsuki.asmallworld.games.Simulation;
import io.marutsuki.asmallworld.games.SimulationManagement;
import io.marutsuki.asmallworld.worlds.World;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.time.Duration;

import static io.marutsuki.asmallworld.worlds.World.DEFAULT_DIMENSIONS;
import static java.lang.Thread.sleep;
import static java.time.Instant.EPOCH;
import static java.time.Instant.now;
import static java.util.Collections.emptyMap;
import static java.util.Collections.singleton;
import static org.mockito.Mockito.*;

@SpringBootTest
public final class GameManagementServiceTest {

    @Value("${simulation.cleanup.rate:5000}")
    public long cleanupRate;

    @MockBean
    private SimulationManagement management;

    @Test
    public void inactiveSimulationsTest() throws InterruptedException {
        when(management.getAll()).thenReturn(singleton(new Simulation(emptyWorld("worldId"), emptyMap())));
        sleep(Duration.ofMillis(cleanupRate));
        verify(management, times(1)).unregister("worldId");
    }

    private World emptyWorld(String id) {
        return new World(id, now(), EPOCH, emptyMap(), DEFAULT_DIMENSIONS);
    }
}
