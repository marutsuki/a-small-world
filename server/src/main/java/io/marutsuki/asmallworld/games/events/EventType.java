package io.marutsuki.asmallworld.games.events;

import lombok.Getter;

@Getter
public enum EventType {

    SPAWN("spawn"),
    DESPAWN("despawn"),
    INPUT("input"),
    LOCATE("locate");

    private final String key;

    EventType(String aKey) {
        key = aKey;
    }
}
