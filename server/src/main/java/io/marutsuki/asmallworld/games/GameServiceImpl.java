package io.marutsuki.asmallworld.games;

import io.marutsuki.asmallworld.games.entities.Entity;
import io.marutsuki.asmallworld.games.events.DeleteEvent;
import io.marutsuki.asmallworld.games.events.Event;
import io.marutsuki.asmallworld.games.events.UpsertEvent;
import io.marutsuki.asmallworld.games.misc.Location;
import io.marutsuki.asmallworld.players.Player;
import io.marutsuki.asmallworld.worlds.World;
import io.marutsuki.asmallworld.worlds.WorldRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

@Slf4j
@AllArgsConstructor
@Service
public final class GameServiceImpl implements GameService {

    private final ActiveWorlds worlds;

    private final WorldRepository repository;

    private final ApplicationEventPublisher eventPublisher;

    @Override
    public void startWorld(String worldId) {
        World world = repository.findById(new ObjectId(worldId)).orElseThrow(() -> {
            log.error("Attempted to start world but it doesn't exist: {}", worldId);
            return new WorldNotFoundException();
        });
        worlds.put(world);
    }

    @Override
    public void stopWorld(String worldId) {
        World world = worlds.get(worldId).orElseThrow(() -> {
            log.error("Attempted to stop world but it doesn't exist: {}", worldId);
            return new WorldNotFoundException();
        });
        repository.save(world);
        worlds.remove(worldId);
    }

    @Override
    public Player addPlayer(String worldId) {
        World world = getWorld(worldId);
        Player player = new Player();
        world.players().put(player.id(), player);
        log.debug("Added Player to world {}, Player: {}", worldId, player);
        return player;
    }

    @Override
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

    @Override
    public void despawnPlayer(String worldId, String playerId) {
        World world = getWorld(worldId);
        if (!world.players().containsKey(playerId)) {
            log.error("Attempted to despawn player {} from world {} but they don't exist", playerId, worldId);
            throw new PlayerNotFoundException();
        }
        world.entities().remove(playerId);
        eventPublisher.publishEvent(new Event(worldId, new DeleteEvent(playerId)));
    }

    @Override
    public void movePlayer(String worldId, String playerId, Location location) {
        World world = getWorld(worldId);
        if (!world.entities().containsKey(playerId)) {
            log.error("Attempted to move player {} to world {} but they don't exist or isn't spawned", playerId, worldId);
            throw new PlayerNotFoundException();
        }
        Entity player = new Entity(location);
        world.entities().put(playerId, player);
        eventPublisher.publishEvent(new Event(worldId, new UpsertEvent(player)));
    }

    private World getWorld(String worldId) throws WorldNotFoundException {
        return worlds.get(worldId).orElseThrow(WorldNotFoundException::new);
    }
}
