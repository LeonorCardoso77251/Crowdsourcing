package com.crowdwellbeing.backend.controller;

import com.crowdwellbeing.backend.model.Admin;
import com.crowdwellbeing.backend.repository.AdminRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    private final AdminRepository adminRepository;

    public AdminController(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    @PostMapping("/login")
    public boolean login(@RequestBody Admin admin) {
        Admin encontrado = adminRepository.findByUsername(admin.getUsername());

        if (encontrado == null) return false;

        return encontrado.getPassword().equals(admin.getPassword());
    }
}
