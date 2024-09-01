package io.marutsuki.asmallworld.worlds;

import io.marutsuki.asmallworld.games.entities.Entity;
import io.marutsuki.asmallworld.games.misc.Dimension;
import io.marutsuki.asmallworld.players.Player;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

public record World(@Id String id,
                    Instant createdAt,
                    Map<String, Player> players,
                    Map<String, Entity> entities,
                    Dimension dimension,
                    boolean active) {
    public static final Dimension DEFAULT_DIMENSIONS = new Dimension(10800, 19200);

    public static World active(World world, boolean isActive) {
        return new World(world.id(), world.createdAt(), world.players(), world.entities(), world.dimension(), isActive);
    }

    public static World withPlayer(World world, Player player) {
        Map<String, Player> players = new HashMap<>(world.players());
        players.put(player.id(), player);
        return new World(world.id(), world.createdAt(), players, world.entities(), world.dimension(), world.active());
    }

    public World() {
        this(new ObjectId().toHexString(), Instant.now(), new HashMap<>(), new HashMap<>(), DEFAULT_DIMENSIONS, false);
    }
}
