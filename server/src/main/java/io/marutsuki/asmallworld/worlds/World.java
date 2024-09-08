package io.marutsuki.asmallworld.worlds;

import io.marutsuki.asmallworld.games.misc.Dimension;
import io.marutsuki.asmallworld.players.Player;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.FieldType;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

import static java.time.Instant.EPOCH;
import static java.time.Instant.now;

public record World(@MongoId(FieldType.OBJECT_ID) String id,
                    Instant createdAt,
                    Instant lastAccess,
                    Map<String, Player> players,
                    Dimension dimension) {
    public static final Dimension DEFAULT_DIMENSIONS = new Dimension(10800, 19200);

    public World() {
        this(new ObjectId().toHexString(), now(), EPOCH, new HashMap<>(), DEFAULT_DIMENSIONS);
    }

    public World access() {
        return new World(id, createdAt, now(), players, dimension);
    }
}
