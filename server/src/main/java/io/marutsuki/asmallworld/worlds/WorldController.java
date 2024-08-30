package io.marutsuki.asmallworld.worlds;

import io.marutsuki.asmallworld.players.Player;
import lombok.AllArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "/worlds")
@AllArgsConstructor
public final class WorldController {

    private final WorldRepository repository;

    @GetMapping
    public List<World> getAllWorlds() {
        return repository.findAll();
    }

    @PostMapping
    public World postWorld() {
        return repository.save(new World(new ObjectId().toHexString(), Instant.now(), new HashMap<>()));
    }

    @PatchMapping("/{id}")
    public World putWorld(@PathVariable String id, @RequestBody WorldPatch patch) {
        World world = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to find resource"));

        Map<String, String> players = new HashMap<>(world.players());
        players.put(patch.playerId(), patch.playerId());
        World updated = new World(world.id(), world.createdAt(), players);
        repository.save(updated);
        return updated;
    }

    @DeleteMapping("/{id}")
    public String deleteWorld(@PathVariable String id) {
        repository.deleteById(id);
        return id;
    }
}
