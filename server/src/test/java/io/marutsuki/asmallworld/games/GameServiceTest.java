package io.marutsuki.asmallworld.games;

import io.marutsuki.asmallworld.games.entities.Entity;
import io.marutsuki.asmallworld.games.events.*;
import io.marutsuki.asmallworld.games.misc.Input;
import io.marutsuki.asmallworld.games.misc.Location;
import io.marutsuki.asmallworld.games.misc.Vector;
import io.marutsuki.asmallworld.players.Player;
import io.marutsuki.asmallworld.worlds.World;
import io.marutsuki.asmallworld.worlds.WorldRepository;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
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

    private static final String OBJECT_ID = "aaaaaaaaaaaaaaaaaaaaaaaa";
    @Autowired
    private GameService service;

    @MockBean
    private ActiveWorlds worlds;

    @MockBean
    private EventDispatcher dispatcher;

    @MockBean
    private WorldRepository repository;

    @BeforeEach
    public void setup() {
        Map<String, Entity> entities = new HashMap<>();
        Player player = new Player("playerId");
        World world = new World("worldId",
                Instant.EPOCH,
                Collections.emptyMap(),
                World.DEFAULT_DIMENSIONS);
        entities.put("playerId", player.toEntity(world));
        Simulation simulation = new Simulation(world, entities, Map.of("playerId", player));
        when(worlds.get("worldId")).thenReturn(Optional.of(simulation));
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
        World aWorld = new World(OBJECT_ID, Instant.EPOCH, Collections.emptyMap(), World.DEFAULT_DIMENSIONS);
        when(repository.findById(new ObjectId(OBJECT_ID))).thenReturn(Optional.of(aWorld));
        service.startWorld(OBJECT_ID);
        verify(worlds, times(1))
                .put(OBJECT_ID, new Simulation(aWorld, Collections.emptyMap(), Collections.emptyMap()));
    }

    @Test
    public void onWorldStopTest() {
        World aWorld = new World(OBJECT_ID, Instant.EPOCH, Collections.emptyMap(), World.DEFAULT_DIMENSIONS);
        when(worlds.get(OBJECT_ID))
                .thenReturn(Optional.of(new Simulation(aWorld, Collections.emptyMap(), Collections.emptyMap())));
        service.stopWorld(OBJECT_ID);
        verify(repository, times(1)).save(any(World.class));
        verify(worlds, times(1)).remove(OBJECT_ID);
    }

    @Test
    public void onNonExistentWorldStartTest() {
        when(worlds.get(OBJECT_ID)).thenReturn(Optional.empty());
        Assertions.assertThrows(WorldNotFoundException.class,
                () -> service.startWorld(OBJECT_ID));
    }

    @Test
    public void onNonExistentWorldStopTest() {
        when(worlds.get(OBJECT_ID)).thenReturn(Optional.empty());
        Assertions.assertThrows(WorldNotFoundException.class,
                () -> service.stopWorld(OBJECT_ID));
    }
}
