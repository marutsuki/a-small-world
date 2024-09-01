package io.marutsuki.asmallworld.games;

import io.marutsuki.asmallworld.players.Player;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Slf4j
@AllArgsConstructor
@Controller
public class GameController {

    private final GameService service;

    @GetMapping("/{id}/start")
    public void startWorld(@PathVariable String id) {
        service.startWorld(id);
    }

    @GetMapping("/{id}/stop")
    public void stopWorld(@PathVariable String id) {
        service.stopWorld(id);
    }

    @GetMapping("/{worldId}/join")
    public Player onPlayerJoin(@PathVariable String worldId) {
        log.info("Request: [Player Join], World ID: {}", worldId);
        return service.addPlayer(worldId);
    }

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
}
