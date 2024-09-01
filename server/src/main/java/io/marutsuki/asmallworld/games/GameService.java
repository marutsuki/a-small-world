package io.marutsuki.asmallworld.games;

import io.marutsuki.asmallworld.games.entities.Entity;
import io.marutsuki.asmallworld.games.events.DeleteEvent;
import io.marutsuki.asmallworld.games.events.Event;
import io.marutsuki.asmallworld.games.events.UpsertEvent;
import io.marutsuki.asmallworld.players.Player;
import io.marutsuki.asmallworld.worlds.World;
import io.marutsuki.asmallworld.worlds.WorldRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import static io.marutsuki.asmallworld.worlds.World.active;

@Slf4j
@AllArgsConstructor
@Service
public final class GameService {

    private final ActiveWorlds worlds;

    private final WorldRepository repository;

    private final ApplicationEventPublisher eventPublisher;

    public void startWorld(String worldId) {
        World world = repository.findById(worldId).orElseThrow(WorldNotFoundException::new);
        World activeWorld = active(world, true);
        repository.save(activeWorld);
        worlds.put(activeWorld);
    }

    public void stopWorld(String worldId) {
        World world = getWorld(worldId);
        World activeWorld = active(world, false);
        repository.save(activeWorld);
        worlds.remove(worldId);
    }

    public Player addPlayer(String worldId) {
        World world = getWorld(worldId);
        Player player = new Player();
        world.players().put(player.id(), player);
        log.debug("Added Player to world {}, Player: {}", worldId, player);
        return player;
    }

    public void spawnPlayer(String worldId, String playerId) {
        World world = getWorld(worldId);
        Player player = world.players().get(playerId);
        if (player == null) {
            log.error("Attempted to spawn player {} to world {} but they don't exist", playerId, worldId);
            throw new PlayerNotFoundException();
        }
        Entity entity = player.toEntity(world);
        world.entities().put(playerId, entity);
        eventPublisher.publishEvent(new Event(worldId, new UpsertEvent(entity)));
    }

    public void despawnPlayer(String worldId, String playerId) {
        World world = getWorld(worldId);
        if (!world.players().containsKey(playerId)) {
            log.error("Attempted to despawn player {} from world {} but they don't exist", playerId, worldId);
            throw new PlayerNotFoundException();
        }
        world.entities().remove(playerId);
        eventPublisher.publishEvent(new Event(worldId, new DeleteEvent(playerId)));
    }

    private World getWorld(String worldId) throws WorldNotFoundException {
        return worlds.get(worldId).orElseThrow(WorldNotFoundException::new);
    }
}
