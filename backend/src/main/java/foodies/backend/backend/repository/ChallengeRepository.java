package foodies.backend.backend.repository;

import foodies.backend.backend.model.Challenge;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface ChallengeRepository extends MongoRepository<Challenge, String> {
    List<Challenge> findByUserId(String userId);
}

