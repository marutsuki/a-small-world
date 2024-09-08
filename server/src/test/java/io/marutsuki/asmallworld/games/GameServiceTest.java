package io.marutsuki.asmallworld.games;

import io.marutsuki.asmallworld.games.entities.Entity;
import io.marutsuki.asmallworld.games.events.*;
import io.marutsuki.asmallworld.games.misc.Input;
import io.marutsuki.asmallworld.games.misc.Location;
import io.marutsuki.asmallworld.games.misc.Vector;
import io.marutsuki.asmallworld.players.Player;
import io.marutsuki.asmallworld.worlds.World;
import io.marutsuki.asmallworld.worlds.WorldRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicReference;

import static java.time.Instant.EPOCH;
import static org.mockito.Mockito.*;

@SpringBootTest(
        webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT
)
public final class GameServiceTest {

    private static final String WORLD_ID = "aaaaaaaaaaaaaaaaaaaaaaaa";
    @Autowired
    private GameService service;

    @MockBean
    private SimulationManagement management;

    @MockBean
    private EventDispatcher dispatcher;

    @MockBean
    private WorldRepository repository;

    World aWorld = new World(WORLD_ID, EPOCH, EPOCH, Collections.emptyMap(), World.DEFAULT_DIMENSIONS);

    @BeforeEach
    public void setup() {
        Map<String, Entity> entities = new HashMap<>();
        Player player = new Player("playerId");
        entities.put("playerId", player.toEntity(aWorld));
        Simulation simulation = new Simulation(entities, Map.of("playerId", player), new AtomicReference<>(aWorld));
        when(management.get("worldId")).thenReturn(Optional.of(simulation));
    }

    @Test
    public void onPlayerSpawnResponseTest() {
        service.spawnPlayer("worldId", "playerId");
        verify(dispatcher, times(1))
                .onEvent(new Event("worldId", new SpawnEvent("playerId", any())));
    }

    @Test
    public void onPlayerDespawnResponseTest() {
        service.despawnPlayer("worldId", "playerId");
        verify(dispatcher, times(1))
                .onEvent(new Event("worldId", new DespawnEvent("playerId")));
    }

    @Test
    public void onPlayerInputResponseTest() {
        service.playerInput("worldId", "playerId", new Input(new Vector(25, 40)));
        verify(dispatcher, times(1))
                .onEvent(new Event("worldId", new InputEvent("playerId", new Input(new Vector(25, 40)))));
    }

    @Test
    public void onPlayerLocateResponseTest() {
        service.locatePlayer("worldId", "playerId", new Location(100, 3000));
        verify(dispatcher, times(1))
                .onEvent(new Event("worldId", new LocateEvent("playerId", new Location(100, 3000))));
    }

    @Test
    public void onWorldStartTest() {
        when(repository.findById(WORLD_ID)).thenReturn(Optional.of(aWorld));
        service.startWorld(WORLD_ID);
        verify(management, times(1))
                .register(WORLD_ID, new Simulation(aWorld, Collections.emptyMap()));
    }

    @Test
    public void onWorldStopTest() {
        when(management.get(WORLD_ID))
                .thenReturn(Optional.of(new Simulation(aWorld, Collections.emptyMap())));
        service.stopWorld(WORLD_ID);
        verify(repository, times(1)).save(any(World.class));
        verify(management, times(1)).unregister(WORLD_ID);
    }

    @Test
    public void onNonExistentWorldStartTest() {
        when(management.get(WORLD_ID)).thenReturn(Optional.empty());
        Assertions.assertThrows(WorldNotFoundException.class,
                () -> service.startWorld(WORLD_ID));
    }

    @Test
    public void onNonExistentWorldStopTest() {
        when(management.get(WORLD_ID)).thenReturn(Optional.empty());
        Assertions.assertThrows(WorldNotFoundException.class,
                () -> service.stopWorld(WORLD_ID));
    }
}
