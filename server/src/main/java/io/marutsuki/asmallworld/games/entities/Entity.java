package io.marutsuki.asmallworld.games.entities;

import io.marutsuki.asmallworld.games.misc.Location;

public record Entity(String id, Location location, double velocity) {

    private static final double STARTING_VELOCITY = 5;

    public Entity(String id, Location location) {
        this(id, location, STARTING_VELOCITY);
    }
}
