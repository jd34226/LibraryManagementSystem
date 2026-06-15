package mgt.library.member.repository;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import mgt.library.member.model.Member;
public interface MemberRepository extends JpaRepository<Member, Long> {

    // Find member by username (for login)
    Optional<Member> findByUsername(String username);
}
