package io.marutsuki.asmallworld.players;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.lang.NonNull;

import java.util.List;

public interface PlayerRepository extends MongoRepository<Player, String> {
    @NonNull
    List<Player> findAll();

    @NonNull
    <T extends Player> T save(@NonNull T world);

    void deleteById(@NonNull String id);
}
