package io.marutsuki.asmallworld.players;

import org.bson.types.ObjectId;

public record Player(String id) {
    public Player() {
        this(new ObjectId().toHexString());
    }
}
