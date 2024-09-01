package io.marutsuki.asmallworld.games;

import io.marutsuki.asmallworld.worlds.World;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Component
public final class ActiveWorlds {
    private final Map<String, World> activeWorlds = new HashMap<>();

    public Optional<World> get(String id) {
        return Optional.ofNullable(activeWorlds.get(id));
    }

    public void put(World world) {
        activeWorlds.put(world.id(), world);
    }

    public void remove(String id) {
        activeWorlds.remove(id);
    }
}
