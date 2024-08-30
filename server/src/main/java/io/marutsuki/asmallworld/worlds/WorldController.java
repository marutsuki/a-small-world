package io.marutsuki.asmallworld.worlds;

import lombok.AllArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.HashMap;
import java.util.List;

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

    @DeleteMapping("/{id}")
    public String deleteWorld(@PathVariable(value = "id") String id) {
        repository.deleteById(id);
        return id;
    }
}
