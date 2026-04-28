package com.sprinthub.user;

import com.sprinthub.auth.exception.InvalidCredentialsException;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User createUser(String fullName, String email, String password) {
        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("Email is already registered");
        }

        User user = User.create(fullName, email, password);

        return userRepository.save(user);
    }

    public User login(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new InvalidCredentialsException("Invalid email or password"));

        if (!user.getPassword().equals(password)) {
            throw new InvalidCredentialsException("Invalid email or password");
        }

        return user;
    }
}