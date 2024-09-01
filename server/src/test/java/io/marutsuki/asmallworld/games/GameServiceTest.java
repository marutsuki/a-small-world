package io.marutsuki.asmallworld.games;

import io.marutsuki.asmallworld.games.events.DeleteEvent;
import io.marutsuki.asmallworld.games.events.Event;
import io.marutsuki.asmallworld.games.events.UpsertEvent;
import io.marutsuki.asmallworld.players.Player;
import io.marutsuki.asmallworld.worlds.World;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.time.Instant;
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
                Map.of("playerId", player),
                new HashMap<>(),
                World.DEFAULT_DIMENSIONS,
                true);
        when(worlds.get("worldId")).thenReturn(Optional.of(world));
        service.spawnPlayer("worldId", "playerId");
        verify(dispatcher, times(1))
                .onEvent(new Event("worldId", new UpsertEvent(player.toEntity(world))));
    }

    @Test
    public void onPlayerDespawnResponseTest() {
        Map<String, Player> players = new HashMap<>();
        players.put("playerId", new Player());
        World world = new World("worldId",
                Instant.EPOCH,
                players,
                new HashMap<>(),
                World.DEFAULT_DIMENSIONS,
                true);
        when(worlds.get("worldId")).thenReturn(Optional.of(world));
        service.despawnPlayer("worldId", "playerId");
        verify(dispatcher, times(1))
                .onEvent(new Event("worldId", new DeleteEvent("playerId")));
    }
}
