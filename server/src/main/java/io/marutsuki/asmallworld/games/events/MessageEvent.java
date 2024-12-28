package io.marutsuki.asmallworld.games.events;

public record MessageEvent(String entityId, String message) implements EventDetails {
    @Override
    public EventType type() {
        return EventType.MESSAGE;
    }
}
