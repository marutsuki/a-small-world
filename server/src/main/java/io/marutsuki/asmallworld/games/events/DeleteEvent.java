package io.marutsuki.asmallworld.games.events;

public record DeleteEvent(String entityId) implements EventDetails {
    @Override
    public EventType type() {
        return EventType.DELETION;
    }
}
