package io.marutsuki.asmallworld.games.entities;

import io.marutsuki.asmallworld.games.misc.Location;
import io.marutsuki.asmallworld.games.misc.Vector;

public record Entity(Location location) {
    public Entity displace(Vector displacement) {
        return new Entity(new Location(location.x() + displacement.x(), location.y() + displacement.y()));
    }
}
