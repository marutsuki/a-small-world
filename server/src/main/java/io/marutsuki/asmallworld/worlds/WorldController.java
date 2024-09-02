package io.marutsuki.asmallworld.worlds;

import io.marutsuki.asmallworld.games.GameService;
import io.marutsuki.asmallworld.games.WorldNotFoundException;
import io.marutsuki.asmallworld.games.misc.Dimension;
import io.marutsuki.asmallworld.players.Player;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping(path = "/worlds")
@AllArgsConstructor
public final class WorldController {

    private final WorldRepository repository;

    private final GameService service;

    @GetMapping("/{worldId}/start")
    public String startWorld(@PathVariable String worldId) {
        log.info("Request: [Start World], World ID: {}", worldId);
        service.startWorld(worldId);
        return worldId;
    }

    @GetMapping("/{worldId}/stop")
    public String stopWorld(@PathVariable String worldId) {
        log.info("Request: [Stop World], World ID: {}", worldId);
        service.stopWorld(worldId);
        return worldId;
    }

    @GetMapping("/{worldId}/join")
    public Player joinWorld(@PathVariable String worldId) {
        log.info("Request: [Player Join], World ID: {}", worldId);
        return service.addPlayer(worldId);
    }

    @GetMapping
    public List<World> getAllWorlds() {
        log.info("Request: [Get All Worlds]");
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public World getWorld(@PathVariable String id) {
        log.info("Request: [Get World], World ID: {}", id);
        return repository.findById(new ObjectId(id)).orElseThrow(WorldNotFoundException::new);
    }

    @PostMapping
    public World postWorld() {
        World world = new World();
        log.info("Request: [Create World], World ID: {}", world);
        return repository.save(world);
    }

    @DeleteMapping("/{id}")
    public String deleteWorld(@PathVariable String id) {
        log.info("Request: [Delete World], World ID: {}", id);
        repository.deleteById(new ObjectId(id));
        return id;
    }
}
