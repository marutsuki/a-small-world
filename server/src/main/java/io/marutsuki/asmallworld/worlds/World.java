package io.marutsuki.asmallworld.worlds;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

public record World(@Id String id, Instant createdAt, Set<String> players) {
    public World() {
        this(new ObjectId().toHexString(), Instant.now(), new HashSet<>());
    }
}
