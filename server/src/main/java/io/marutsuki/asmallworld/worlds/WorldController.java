package io.marutsuki.asmallworld.worlds;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
        return repository.save(new World());
    }

    @PatchMapping("/{id}")
    public World patchWorld(@PathVariable String id, @RequestBody WorldPatch patch) {
        World world = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to find resource"));

        Set<String> players = new HashSet<>(world.players());
        players.add(patch.playerId());
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
