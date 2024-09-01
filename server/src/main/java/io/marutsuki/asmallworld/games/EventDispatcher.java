package io.marutsuki.asmallworld.games;

import io.marutsuki.asmallworld.games.events.Event;
import lombok.AllArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@AllArgsConstructor
@Component
public final class EventDispatcher {

    private final SimpMessagingTemplate template;

    @EventListener
    public void onEvent(Event event) {
        template.convertAndSend("/topic/{worldId}/" + event.details().type(), event.details());
    }
}
