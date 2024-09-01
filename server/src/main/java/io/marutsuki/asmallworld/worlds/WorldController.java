package io.marutsuki.asmallworld.worlds;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

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
        return repository.save(new World());
    }

    @DeleteMapping("/{id}")
    public String deleteWorld(@PathVariable String id) {
        repository.deleteById(id);
        return id;
    }
}
