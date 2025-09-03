package com.poll.api.controller;

import com.poll.api.service.VoteService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Map;

@RestController
@RequestMapping("/votes")
public class VoteController {

    private final VoteService voteService;

    public VoteController(VoteService voteService) {
        this.voteService = voteService;
    }

    @GetMapping(value = "/sse", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<Map<String, Integer>> streamVotes() {
        return voteService.getVotesStream();
    }

    @PostMapping(value = "/{option}")
    public Mono<Void> vote(@PathVariable String option, @RequestParam int checked) {
        voteService.emitVote(option, checked);
        return Mono.empty();
    }
}
