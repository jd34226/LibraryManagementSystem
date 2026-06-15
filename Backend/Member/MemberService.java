package mgt.library.member.service;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;
import mgt.library.member.model.Member;
import mgt.library.member.repository.MemberRepository;

@Service
public class MemberService {

    private final MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    // TODO: Encode passwords before saving (PasswordEncoder.encode). Current demo stores raw values for simplicity.
    // Add/Register member
    public Member addMember(Member member) {
        return memberRepository.save(member);
    }

    // Update member
    public Member updateMember(Member member) {
        return memberRepository.save(member);
    }

    // Delete member
    public boolean deleteMember(Long id) {
        if (memberRepository.existsById(id)) {
            memberRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // Find by ID
    public Optional<Member> findById(Long id) {
        return memberRepository.findById(id);
    }

    // TODO: Use PasswordEncoder.matches(rawPassword, encodedPassword) for authentication instead of raw string comparison. Current code is used for simplicity.
    // Login with username
    public Optional<Member> login(String username, String password) {
        Optional<Member> member = memberRepository.findByUsername(username);
        if (member.isPresent() && member.get().getPassword().equals(password)) {
            return member;
        }
        return Optional.empty();
    }
    public List<Member> findAll() {
        return memberRepository.findAll();
    }

}
