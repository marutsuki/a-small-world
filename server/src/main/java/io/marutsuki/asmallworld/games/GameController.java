package io.marutsuki.asmallworld.games;

import io.marutsuki.asmallworld.games.misc.Input;
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

    @MessageMapping("/{worldId}/player/{playerId}/input")
    public void onPlayerMove(@DestinationVariable String worldId, @DestinationVariable String playerId, Input message) {
        log.debug("Request: [Player Input], Player ID: {}, World ID: {}, input: {}", playerId, worldId, message);
        service.playerInput(worldId, playerId, message);
    }
}
