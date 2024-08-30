package io.marutsuki.asmallworld.players;

import lombok.AllArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/players")
@AllArgsConstructor
public class PlayerController {
    private final PlayerRepository repository;

    @GetMapping
    public List<Player> getAllPlayers() {
        return repository.findAll();
    }

    @PostMapping
    public Player postPlayer() {
        return repository.save(new Player(new ObjectId().toHexString()));
    }

    @DeleteMapping("/{id}")
    public String deletePlayer(@PathVariable String id) {
        repository.deleteById(id);
        return id;
    }
}
