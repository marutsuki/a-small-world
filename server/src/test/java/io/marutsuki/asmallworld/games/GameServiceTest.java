package io.marutsuki.asmallworld.games;

import io.marutsuki.asmallworld.games.entities.Entity;
import io.marutsuki.asmallworld.games.events.DespawnEvent;
import io.marutsuki.asmallworld.games.events.Event;
import io.marutsuki.asmallworld.games.events.SpawnEvent;
import io.marutsuki.asmallworld.players.Player;
import io.marutsuki.asmallworld.worlds.World;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.time.Instant;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static org.mockito.Mockito.*;

@SpringBootTest(
        webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT
)
public final class GameServiceTest {

    @Autowired
    private GameService service;

    @MockBean
    private ActiveWorlds worlds;

    @MockBean
    private EventDispatcher dispatcher;

    @Test
    public void onPlayerSpawnResponseTest() {
        Player player = new Player();
        World world = new World("worldId",
                Instant.EPOCH,
                Collections.emptyMap(),
                World.DEFAULT_DIMENSIONS);
        Simulation simulation = new Simulation(world, new HashMap<>(), Map.of("playerId", player));
        when(worlds.get("worldId")).thenReturn(Optional.of(simulation));
        service.spawnPlayer("worldId", "playerId");
        verify(dispatcher, times(1))
                .onEvent(new Event("worldId", new SpawnEvent("playerId", player.toEntity(world))));
    }

    @Test
    public void onPlayerDespawnResponseTest() {
        Map<String, Entity> entities = new HashMap<>();
        World world = new World("worldId",
                Instant.EPOCH,
                Collections.emptyMap(),
                World.DEFAULT_DIMENSIONS);
        entities.put("playerId", new Player().toEntity(world));
        Simulation simulation = new Simulation(world, entities, Collections.emptyMap());
        when(worlds.get("worldId")).thenReturn(Optional.of(simulation));
        service.despawnPlayer("worldId", "playerId");
        verify(dispatcher, times(1))
                .onEvent(new Event("worldId", new DespawnEvent("playerId")));
    }
}
