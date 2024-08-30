package io.marutsuki.asmallworld.worlds;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.lang.NonNull;

import java.util.List;

public interface WorldRepository extends MongoRepository<World, String> {
    @NonNull
    List<World> findAll();

    @NonNull
    <T extends World> T save(@NonNull T world);

    void deleteById(@NonNull String id);
}
