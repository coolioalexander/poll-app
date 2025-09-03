package com.poll.api.repository;

import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class VoteRepository {

    private final Map<String, Integer> votes = new ConcurrentHashMap<>(
            Map.of("React", 0, "Angular", 0, "Vue", 0, "Other", 0)
    );

    public Map<String, Integer> getVotes() {
        return votes;
    }

    public void vote(String option, int checked) {
        votes.computeIfPresent(option, (k, v) -> v + checked);
    }
}
