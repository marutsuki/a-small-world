package io.marutsuki.asmallworld.games;

import io.marutsuki.asmallworld.games.entities.Entity;
import io.marutsuki.asmallworld.games.events.*;
import io.marutsuki.asmallworld.games.misc.Input;
import io.marutsuki.asmallworld.games.misc.Location;
import io.marutsuki.asmallworld.players.Player;
import io.marutsuki.asmallworld.worlds.World;
import io.marutsuki.asmallworld.worlds.WorldRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicReference;

import static java.time.Instant.now;

/**
 * Implementation of {@link GameService}.
 */
@Slf4j
@AllArgsConstructor
@Service
public final class GameServiceImpl implements GameService {

    private final SimulationManagement worlds;

    private final WorldRepository repository;

    private final ApplicationEventPublisher eventPublisher;

    @Override
    public Player addPlayer(String worldId) {
        Simulation simulation = getWorld(worldId);
        Player player = new Player();
        simulation.getPlayers().put(player.id(), player);
        log.info("Added Player to world {}, Player: {}", worldId, player);
        return player;
    }

    @Override
    public void startWorld(String worldId) {
        World world = repository.findById(worldId).orElseThrow(() -> {
            log.error("Attempted to start world but it doesn't exist: {}", worldId);
            return new WorldNotFoundException();
        });
        worlds.register(worldId, createSimulation(world));
    }

    @Override
    public void stopWorld(String worldId) {
        Simulation simulation = worlds.get(worldId).orElseThrow(() -> {
            log.error("Attempted to stop world but it doesn't exist: {}", worldId);
            return new WorldNotFoundException();
        });
        repository.save(simulation.getWorld());
        worlds.unregister(worldId);
    }

    @Override
    public void spawnPlayer(String worldId, String playerId) {
        Simulation simulation = getWorld(worldId);
        Entity player = simulation.spawnPlayer(playerId);
        // Update the last accessed time for the world to prevent it from being marked for removal
        log.info("Updating last access date for world: {} to {}", worldId, now());
        simulation.access();
        eventPublisher.publishEvent(new Event(worldId, new SpawnEvent(playerId, player)));
    }

    @Override
    public void despawnPlayer(String worldId, String playerId) {
        Simulation simulation = getWorld(worldId);
        simulation.getEntities().remove(playerId);
        eventPublisher.publishEvent(new Event(worldId, new DespawnEvent(playerId)));
    }

    @Override
    public void playerInput(String worldId, String playerId, Input input) {
        Simulation simulation = getWorld(worldId);
        log.debug("Processing player input message for player ID: {}, Input: {}", playerId, input);
        Entity entity = simulation.getEntities().get(playerId);
        if (entity != null) {
            eventPublisher.publishEvent(new Event(worldId, new InputEvent(entity.id(), input)));
        }
    }

    @Override
    public void locatePlayer(String worldId, String playerId, Location location) {
        Map<String, Entity> entities = getWorld(worldId).getEntities();
        Entity entity = entities.get(playerId);
        if (entity == null) {
            log.error("Attempted to locate player {} but they haven't spawned in this world", playerId);
            return;
        }
        entities.put(playerId, new Entity(playerId, location, entity.velocity()));
        eventPublisher.publishEvent(new Event(worldId, new LocateEvent(playerId, location)));
    }

    private Simulation getWorld(String worldId) throws WorldNotFoundException {
        return worlds.get(worldId).orElseThrow(WorldNotFoundException::new);
    }

    private Simulation createSimulation(World world) {
        return new Simulation(new ConcurrentHashMap<>(), new ConcurrentHashMap<>(world.players()), new AtomicReference<>(world));
    }
}
