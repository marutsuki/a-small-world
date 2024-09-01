package io.marutsuki.asmallworld.games.events;

import io.marutsuki.asmallworld.games.entities.Entity;

public record UpsertEvent(Entity entity) implements EventDetails {
    @Override
    public EventType type() {
        return EventType.UPSERT;
    }
}
