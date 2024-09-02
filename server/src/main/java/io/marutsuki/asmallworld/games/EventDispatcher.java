package io.marutsuki.asmallworld.games;

import io.marutsuki.asmallworld.games.events.Event;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Slf4j
@AllArgsConstructor
@Component
public final class EventDispatcher {

    private final SimpMessagingTemplate template;

    @EventListener
    public void onEvent(Event event) {
        String endpoint = "/topic/" + event.worldId() +
                "/" + event.details().type().name().toLowerCase();
        log.info("Broadcasting event [{}] to {}", event.details().type().name(), endpoint);
        template.convertAndSend(endpoint, event.details());
    }
}
