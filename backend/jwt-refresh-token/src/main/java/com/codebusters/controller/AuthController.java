package com.codebusters.controller;

import com.codebusters.exception.UserAlreadyExists;
import com.codebusters.dto.AuthRequest;
import com.codebusters.dto.JwtResponse;
import com.codebusters.dto.RefreshTokenRequest;
import com.codebusters.dto.UserResponse;
import com.codebusters.entity.RefreshToken;
import com.codebusters.entity.UserInfo;
import com.codebusters.service.JwtService;
import com.codebusters.service.UserService;
import com.codebusters.service.RefreshTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService service;
    @Autowired
    private JwtService jwtService;

    @Autowired
    private RefreshTokenService refreshTokenService;

    @Autowired
    private AuthenticationManager authenticationManager;


    @PostMapping("/signup")
    public ResponseEntity<String> addNewUser(@RequestBody UserInfo userInfo) {
        if( service.checkIfPresent(userInfo.getEmail()) || userInfo.getName().isEmpty()){
            throw new UserAlreadyExists("User with below Email Already Exists");
        }
        if(userInfo.getRoles() == null || !userInfo.getRoles().equals("ROLE_ADMIN"))
            userInfo.setRoles("ROLE_USER");
        return service.addUser(userInfo);
    }


    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public UserResponse getProductById(@PathVariable int id) {
        return service.getUser(id);
    }


    @PostMapping("/login")
    public JwtResponse authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
        if (authentication.isAuthenticated()) {
            RefreshToken refreshToken = refreshTokenService.createRefreshToken(authRequest.getUsername());
            return JwtResponse.builder()
                    .accessToken(jwtService.generateToken(authRequest.getUsername()))
                    .token(refreshToken.getToken()).build();
        } else {
            throw new UsernameNotFoundException("invalid user request !");
        }
    }

    @PostMapping("/refreshtoken")
    public JwtResponse refreshToken(@RequestBody RefreshTokenRequest refreshTokenRequest) {
        return refreshTokenService.findByToken(refreshTokenRequest.getToken())
                .map(refreshTokenService::verifyExpiration)
                .map(RefreshToken::getUserInfo)
                .map(userInfo -> {
                    String accessToken = jwtService.generateToken(userInfo.getName());
                    return JwtResponse.builder()
                            .accessToken(accessToken)
                            .token(refreshTokenRequest.getToken())
                            .build();
                }).orElseThrow(() -> new RuntimeException(
                        "Refresh token is not in database!"));
    }


}
