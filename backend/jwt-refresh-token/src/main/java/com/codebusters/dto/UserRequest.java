package com.codebusters.dto;

import com.codebusters.entity.Role;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserRequest {
    private String username;
    private String email;
    private String password;
    private Role role;
}
