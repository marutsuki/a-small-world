package io.marutsuki.asmallworld.games.events;

import io.marutsuki.asmallworld.games.misc.Location;

public record LocateEvent(String entityId, Location location) implements EventDetails {
    @Override
    public EventType type() {
        return EventType.LOCATE;
    }
}
