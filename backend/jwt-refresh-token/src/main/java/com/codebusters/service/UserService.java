package com.codebusters.service;

import com.codebusters.dto.UserResponse;
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
        return UserResponse.builder().name(userById.getName())
                .email(userById.getEmail())
                .roles(userById.getRoles()).build();
    }


    public ResponseEntity<String> addUser(UserInfo userInfo) {
        userInfo.setPassword(passwordEncoder.encode(userInfo.getPassword()));
        repository.save(userInfo);
        return ResponseEntity.status(HttpStatus.CREATED).body("User Created");
    }
}
