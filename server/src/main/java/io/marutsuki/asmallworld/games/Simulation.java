package io.marutsuki.asmallworld.games;

import io.marutsuki.asmallworld.games.entities.Entity;
import io.marutsuki.asmallworld.players.Player;
import io.marutsuki.asmallworld.worlds.World;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicReference;

/**
 * Holds the state for an active simulation managed by this server.
 *
 * @implNote Uses a class instead of a {@link Record} for the purpose of mutability.
 */
@Getter
@AllArgsConstructor
@EqualsAndHashCode
public final class Simulation {

    /**
     * Any spawned entities in the simulation.
     */
    private final Map<String, Entity> entities;
    /**
     * Any registered players in the simulation. Doesn't have to be spawned.
     */
    private final Map<String, Player> players;

    /**
     * The world instance this simulation is based off.
     * <br>
     * The {@link World#players()} property may be out of sync with {@link Simulation#players}.
     * <br>
     * It is expected that once this simulation is stopped, this World instance will be replaced in the database
     * with the new state.
     */
    private AtomicReference<World> world;

    /**
     * Constructor.
     *
     * @param world the world to simulate
     * @param players the initial players
     */
    public Simulation(World world, Map<String, Player> players) {
        this(new HashMap<>(), new ConcurrentHashMap<>(players), new AtomicReference<>(world));
    }

    /**
     * Spawns a player into the simulation as an entity.
     * <br>
     *
     * @param playerId the ID of the player to spawn, if it doesn't exist, a new player is created.
     * @return
     * @implNote if the player has not been registered in the {@link World},
     *           this method will create a new player instance.
     */
    public Entity spawnPlayer(String playerId) {
        Player player = players.get(playerId);
        if (player == null) {
            Player newPlayer = new Player(playerId);
            players.put(newPlayer.id(), newPlayer);
        }
        assert player != null;
        Entity entity = player.toEntity(world.get());
        entities.put(playerId, entity);
        return entity;
    }

    /**
     * Updates the last accessed date of the world to prevent it from being removed for staleness.
     */
    public void access() {
        world.set(world.get().access());
    }

    public World getWorld() {
        return world.get();
    }
}
