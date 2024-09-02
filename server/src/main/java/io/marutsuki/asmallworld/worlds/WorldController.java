package io.marutsuki.asmallworld.worlds;

import io.marutsuki.asmallworld.games.GameService;
import io.marutsuki.asmallworld.players.Player;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public Player onPlayerJoin(@PathVariable String worldId) {
        log.info("Request: [Player Join], World ID: {}", worldId);
        return service.addPlayer(worldId);
    }

    @GetMapping
    public List<World> getAllWorlds() {
        log.info("Request: [Get All Worlds]");
        return repository.findAll();
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
