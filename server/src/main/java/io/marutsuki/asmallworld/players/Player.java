package io.marutsuki.asmallworld.players;

import io.marutsuki.asmallworld.games.entities.Entity;
import io.marutsuki.asmallworld.games.misc.Location;
import io.marutsuki.asmallworld.worlds.World;
import org.bson.types.ObjectId;

public record Player(String id) {
    public Player() {
        this(new ObjectId().toHexString());
    }

    public Entity toEntity(World world) {
        return new Entity(Location.randomLocation(world.dimension()));
    }
}
