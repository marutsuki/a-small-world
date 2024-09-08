package io.marutsuki.asmallworld.worlds;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.lang.NonNull;

import java.util.List;
import java.util.Optional;

public interface WorldRepository extends MongoRepository<World, ObjectId> {
    @NonNull
    Optional<World> findById(@NonNull String id);

    @NonNull
    List<World> findAll();

    @NonNull
    <T extends World> T save(@NonNull T world);

    void deleteById(@NonNull String id);
}
