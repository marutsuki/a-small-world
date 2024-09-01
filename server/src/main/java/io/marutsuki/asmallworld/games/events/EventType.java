package io.marutsuki.asmallworld.games.events;

import lombok.Getter;

@Getter
public enum EventType {

    UPSERT("upsert"),
    DELETION("delete");

    private final String key;

    EventType(String aKey) {
        key = aKey;
    }
}
