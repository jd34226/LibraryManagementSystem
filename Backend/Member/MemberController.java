package mgt.library.member.controller;

import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import mgt.library.member.model.Member;
import mgt.library.member.service.MemberService;

@RestController
@RequestMapping("/api/member")
public class MemberController {

    private final MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @PostMapping("/register")
    public ResponseEntity<Member> registerMember(@RequestBody Member member) {
        // Only allow password to be saved if role is ADMIN
        if (!"ADMIN".equalsIgnoreCase(member.getRole())) {
            member.setPassword(null);
        }

        Member savedMember = memberService.addMember(member);
        return ResponseEntity.ok(savedMember);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Member loginRequest) {
        Optional<Member> memberOpt = memberService.login(loginRequest.getUsername(), loginRequest.getPassword());
        if (memberOpt.isPresent()) {
            Member member = memberOpt.get();
            member.setPassword(null);
            if ("ADMIN".equalsIgnoreCase(member.getRole())) {
                return ResponseEntity.ok(member);
            } else {
                return ResponseEntity.status(403).body("Only admin can log in");
            }
        }
        return ResponseEntity.status(401).body("Invalid username or password");
    }

    @GetMapping("/{id}")
    public ResponseEntity<Member> getMemberById(@PathVariable("id") Long id) {
        Optional<Member> member = memberService.findById(id);
        return member.map(ResponseEntity::ok)
                     .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Member> updateMember(@PathVariable("id") Long id, @RequestBody Member updatedMember) {
        Member existingMember = memberService.findById(id)
            .orElseThrow(() -> new RuntimeException("Member not found"));

        // Only update fields that are not null
        if (updatedMember.getName() != null) {
            existingMember.setName(updatedMember.getName());
        }
        if (updatedMember.getUsername() != null) {
            existingMember.setUsername(updatedMember.getUsername());
        }
        if (updatedMember.getRole() != null) {
            existingMember.setRole(updatedMember.getRole());
        }
        if ("ADMIN".equalsIgnoreCase(existingMember.getRole())) {
            if (updatedMember.getPassword() != null) {
                existingMember.setPassword(updatedMember.getPassword());
            }
        } else {
            existingMember.setPassword(null);
        }

        Member savedMember = memberService.updateMember(existingMember);
        return ResponseEntity.ok(savedMember);
    }

/*
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateMember(@RequestParam("adminUsername") String adminUsername,
                                          @RequestParam("adminPassword") String adminPassword,
                                          @PathVariable("id") Long id,
                                          @RequestBody Member updatedMember) {
        Optional<Member> admin = memberService.login(adminUsername, adminPassword);
        if (admin.isPresent() && "ADMIN".equals(admin.get().getRole())) {
            Optional<Member> memberOpt = memberService.findById(id);
            if (memberOpt.isPresent()) {
                Member member = memberOpt.get();
                member.setName(updatedMember.getName());
                member.setUsername(updatedMember.getUsername());
                member.setPassword(updatedMember.getPassword());
                member.setRole(updatedMember.getRole());
                memberService.updateMember(member);

                member.setPassword(null); // hide password in response
                return ResponseEntity.ok(member);
            } else {
                return ResponseEntity.status(404).body("Member not found");
            }
        }
        return ResponseEntity.status(403).body("Only admin can update members");
    }
 */

    @GetMapping("/all")
    public ResponseEntity<?> getAllMembers(){
           // @RequestParam("adminUsername") String adminUsername, @RequestParam("adminPassword") String adminPassword) {

        //Optional<Member> admin = memberService.login(adminUsername, adminPassword);
        //if (admin.isPresent() && "ADMIN".equals(admin.get().getRole())) {
            return ResponseEntity.ok(memberService.findAll());
        //}
        //return ResponseEntity.status(403).body("Only admin can view members");
    }



 // DELETE MEMBER
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteMember(@PathVariable("id") Long id)
    	//@RequestParam("adminUsername") String adminUsername,@RequestParam("adminPassword") String adminPassword)
       {
        //Optional<Member> admin = memberService.login(adminUsername, adminPassword);
        //if (admin.isPresent() && "ADMIN".equals(admin.get().getRole())) {
            Optional<Member> memberOpt = memberService.findById(id);
            if (memberOpt.isPresent()) {
                memberService.deleteMember(id);
                return ResponseEntity.ok("Member deleted successfully");
            } else {
                return ResponseEntity.status(404).body("Member not found");
            }
        //}
        //return ResponseEntity.status(403).body("Only admin can delete members");
    }
}
