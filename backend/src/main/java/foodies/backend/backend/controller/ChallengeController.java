package foodies.backend.backend.controller;

import foodies.backend.backend.model.Challenge;
import foodies.backend.backend.services.ChallengeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/challenges")
@CrossOrigin("*")
public class ChallengeController {

    @Autowired
    private ChallengeService challengeService;

    @GetMapping("/{userId}")
    public List<Challenge> getUserChallenges(@PathVariable String userId) {
        return challengeService.getChallengesByUser(userId);
    }

    @PostMapping
    public Challenge createChallenge(@RequestBody Challenge challenge) {
        return challengeService.createChallenge(challenge);
    }

    @DeleteMapping("/{id}")
    public void deleteChallenge(@PathVariable String id) {
        challengeService.deleteChallenge(id);
    }

    @PutMapping("/{id}/start")
    public Challenge startChallenge(@PathVariable String id) {
        return challengeService.startChallenge(id);
    }

    @PutMapping("/{id}/restart")
    public Challenge restartChallenge(@PathVariable String id) {
        return challengeService.restartChallenge(id);
    }

    @PutMapping("/{id}/finish")
    public Challenge finishChallenge(@PathVariable String id, @RequestBody List<String> images) {
        return challengeService.finishChallenge(id, images);
    }
}
