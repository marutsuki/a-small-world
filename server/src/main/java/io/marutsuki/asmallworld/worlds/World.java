package io.marutsuki.asmallworld.worlds;

import io.marutsuki.asmallworld.players.Player;
import org.springframework.data.annotation.Id;

import java.time.Instant;
import java.util.Map;

public record World(@Id String id, Instant createdAt, Map<String, Player> players) {
}
