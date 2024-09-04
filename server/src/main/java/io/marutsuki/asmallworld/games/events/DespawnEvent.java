package io.marutsuki.asmallworld.games.events;

public record DespawnEvent(String entityId) implements EventDetails {
    @Override
    public EventType type() {
        return EventType.DESPAWN;
    }
}
