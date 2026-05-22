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
