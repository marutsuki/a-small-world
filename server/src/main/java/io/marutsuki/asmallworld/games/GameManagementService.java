package io.marutsuki.asmallworld.games;

import io.marutsuki.asmallworld.games.entities.Entity;
import io.marutsuki.asmallworld.worlds.World;
import io.marutsuki.asmallworld.worlds.WorldRepository;
import lombok.AllArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.Map;

import static java.util.function.Predicate.not;

/**
 * Internal service for cleaning up the {@link SimulationManagement} cache.
 */
@AllArgsConstructor
@Component
public final class GameManagementService {

    /** The cache for storing active simulations. */
    private final SimulationManagement management;

    /** The repository for persisting world data. */
    private final WorldRepository repository;

    /**
     * Scheduled task that checks for any active simulations with no players, and unregisters them before saving them
     * to the repository.
     */
    @Scheduled(fixedRateString = "${simulation.cleanup.rate:30000}")
    void cleanup() {
        management.getAll().stream()
                .filter(not(GameManagementService::anyPlayerActive))
                .forEach(this::cleanupSimulation);
    }

    /**
     * Unregisters an active simulation instance from the server and stores the simulated world state at the time of
     * removal back to the repository.
     *
     * @param simulation the simulation to unregister and save
     */
    private void cleanupSimulation(Simulation simulation) {
        World world = management.unregister(simulation.getWorld().id());
        if (world != null) {
            repository.save(world);
        }
    }

    /**
     * Checks if a simulation has any players active/spawned.
     *
     * @param simulation the simulation to check
     * @return {@code true} if there's any players active, otherwise {@code false}
     */
    private static boolean anyPlayerActive(Simulation simulation) {
        Map<String, Entity> entities = simulation.getEntities();
        return simulation.getPlayers().keySet().stream().anyMatch(entities::containsKey);
    }
}
