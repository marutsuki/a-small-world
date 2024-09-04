package io.marutsuki.asmallworld.games.events;

import io.marutsuki.asmallworld.games.misc.Input;

public record InputEvent(String entityId, Input input) implements EventDetails {
    @Override
    public EventType type() {
        return EventType.INPUT;
    }
}
