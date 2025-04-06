package foodies.backend.backend.services;

import foodies.backend.backend.model.Challenge;
import foodies.backend.backend.repository.ChallengeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
public class ChallengeService {

    @Autowired
    private ChallengeRepository challengeRepository;

    public List<Challenge> getAllChallenges() {
        return challengeRepository.findAll();
    }

    public List<Challenge> getChallengesByUser(String userId) {
        return challengeRepository.findByUserId(userId);
    }

    public Challenge createChallenge(Challenge challenge) {
        challenge.setStatus("Pending");
        return challengeRepository.save(challenge);
    }

    public void deleteChallenge(String id) {
        challengeRepository.deleteById(id);
    }

    public Optional<Challenge> getChallengeById(String id) {
        return challengeRepository.findById(id);
    }

    public Challenge startChallenge(String id) {
        Challenge challenge = getChallengeById(id).orElseThrow();
        if (!isExpired(challenge)) {
            challenge.setStatus("Ongoing");
            return challengeRepository.save(challenge);
        }
        throw new IllegalStateException("Cannot start expired challenge");
    }

    public Challenge restartChallenge(String id) {
        Challenge challenge = getChallengeById(id).orElseThrow();
        if (!isExpired(challenge)) {
            challenge.setStatus("Pending");
            return challengeRepository.save(challenge);
        }
        throw new IllegalStateException("Cannot restart expired challenge");
    }

    public Challenge finishChallenge(String id, List<String> imageUrls) {
        Challenge challenge = getChallengeById(id).orElseThrow();
        challenge.setStatus("Completed");
        challenge.setUploadedImages(imageUrls);
        return challengeRepository.save(challenge);
    }

    private boolean isExpired(Challenge challenge) {
        LocalDate today = LocalDate.now();
        LocalTime now = LocalTime.now();
        LocalDate challengeDate = LocalDate.parse(challenge.getStartDate());
        LocalTime end = LocalTime.parse(challenge.getEndTime());

        return challengeDate.isBefore(today) || (challengeDate.isEqual(today) && now.isAfter(end));
    }
}
