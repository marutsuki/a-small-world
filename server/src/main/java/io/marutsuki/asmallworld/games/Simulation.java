package io.marutsuki.asmallworld.games;

import io.marutsuki.asmallworld.games.entities.Entity;
import io.marutsuki.asmallworld.players.Player;
import io.marutsuki.asmallworld.worlds.World;

import java.util.Map;

public record Simulation(World world, Map<String, Entity> entities, Map<String, Player> players) {
    public Entity spawnPlayer(String playerId) {
        Player player = players.get(playerId);
        if (player == null) {
            throw new PlayerNotFoundException();
        }
        Entity entity = player.toEntity(world);
        entities.put(playerId, entity);
        return entity;
    }
}
