package io.marutsuki.asmallworld.games;

import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Component
public final class ActiveWorlds {
    private final Map<String, Simulation> activeWorlds = new HashMap<>();

    public Optional<Simulation> get(String id) {
        return Optional.ofNullable(activeWorlds.get(id));
    }

    public void put(String id, Simulation simulation) {
        activeWorlds.put(id, simulation);
    }

    public void remove(String id) {
        activeWorlds.remove(id);
    }
}
