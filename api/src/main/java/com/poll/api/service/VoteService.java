package com.poll.api.service;

import com.poll.api.repository.VoteRepository;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Sinks;

import java.util.Map;

@Service
public class VoteService {

    private final VoteRepository voteRepository;
    private final Sinks.Many<Map<String, Integer>> sink = Sinks.many().multicast().directAllOrNothing();

    public VoteService(VoteRepository voteRepository) {
        this.voteRepository = voteRepository;
    }

    public Flux<Map<String, Integer>> getVotesStream() {
        return Flux.concat(Flux.just(voteRepository.getVotes()), sink.asFlux());
    }

    public void emitVote(String option, int checked) {
        voteRepository.vote(option, checked);
        sink.tryEmitNext(voteRepository.getVotes());
    }
}
