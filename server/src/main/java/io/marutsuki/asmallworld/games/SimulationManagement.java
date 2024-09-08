package io.marutsuki.asmallworld.games;

import io.marutsuki.asmallworld.worlds.World;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Cache for storing any active simulations managed by this server.
 */
@Component
public final class SimulationManagement {
    private final Map<String, Simulation> simulations = new ConcurrentHashMap<>();

    /**
     * Gets an active {@link Simulation} instance from this component.
     *
     * @param id the ID of the world the simulation belongs to
     * @return an {@link Optional} wrapped simulation instance
     */
    public Optional<Simulation> get(String id) {
        return Optional.ofNullable(simulations.get(id));
    }

    /**
     * Adds a simulation to the component, marking it as active.
     *
     * @param id the ID of the world the simulation belongs to
     * @param simulation the simulation instance for the world
     */
    public void register(String id, Simulation simulation) {
        simulations.put(id, simulation);
    }

    /**
     * Removes an active simulation from this component and return the world state at the time this method was called.
     *
     * @param id the ID of the world the simulation belongs to
     * @return the world the simulation was using
     */
    public World unregister(String id) {
        return simulations.remove(id).getWorld();
    }

    /**
     * Returns a view of all the active simulations managed by this component.
     *
     * @return a {@link Collection} of the active simulations
     */
    public Collection<Simulation> getAll() {
        return simulations.values();
    }
}
