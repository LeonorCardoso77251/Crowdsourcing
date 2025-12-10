package com.crowdwellbeing.backend.service;

import com.crowdwellbeing.backend.model.Admin;
import com.crowdwellbeing.backend.repository.AdminRepository;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    private final AdminRepository repo;

    public AdminService(AdminRepository repo) {
        this.repo = repo;
    }

    public Admin login(String username, String password) {
        Admin admin = repo.findByUsername(username);
        if (admin != null && admin.getPassword().equals(password)) {
            return admin;
        }
        return null;
    }
}
