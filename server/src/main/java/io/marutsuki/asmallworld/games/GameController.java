package io.marutsuki.asmallworld.games;

import io.marutsuki.asmallworld.games.misc.Location;
import io.marutsuki.asmallworld.games.misc.Vector;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

@Slf4j
@AllArgsConstructor
@Controller
public class GameController {

    private final GameService service;

    @MessageMapping("/{worldId}/player/{playerId}/spawn")
    public void onPlayerSpawn(@DestinationVariable String worldId, @DestinationVariable String playerId) {
        log.info("Request: [Player Spawn], Player ID: {}, World ID: {}", playerId, worldId);
        service.spawnPlayer(worldId, playerId);
    }

    @MessageMapping("/{worldId}/player/{playerId}/despawn")
    public void onPlayerDespawn(@DestinationVariable String worldId, @DestinationVariable String playerId) {
        log.info("Request: [Player Despawn], Player ID: {}, World ID: {}", playerId, worldId);
        service.despawnPlayer(worldId, playerId);
    }

    @MessageMapping("/{worldId}/player/{playerId}/move")
    public void onPlayerMove(@DestinationVariable String worldId, @DestinationVariable String playerId, Vector displacement) {
        log.debug("Request: [Player Move], Player ID: {}, World ID: {}, displacement: {}", playerId, worldId, displacement);
        service.movePlayer(worldId, playerId, displacement);
    }
}
