package com.codebusters.service;

import com.codebusters.dto.UserResponse;
import com.codebusters.entity.Role;
import com.codebusters.entity.UserInfo;
import com.codebusters.repository.UserInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserInfoRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    public UserResponse getUser(int id) {
        UserInfo userById = repository.findById(id).get();
        return UserResponse.builder().username(userById.getUsername())
                .email(userById.getEmail())
                .roles(userById.getRoles().toString()).build();
    }


    public ResponseEntity<String> addUser(UserInfo userInfo) {
        userInfo.setPassword(passwordEncoder.encode(userInfo.getPassword()));
        repository.save(userInfo);
        return ResponseEntity.status(HttpStatus.CREATED).body("User Created");
    }

    public boolean checkIfPresent(String email) {
       return repository.findByEmail(email).isPresent();
    }

    public UserResponse findUser(String username) {
        UserInfo userInfo = repository.findByUsername(username).get();
        UserResponse user = UserResponse.builder()
                .email(userInfo.getEmail())
                .username(userInfo.getUsername())
                .roles(userInfo.getRoles().toString()).build();
        return user;
    }
}
