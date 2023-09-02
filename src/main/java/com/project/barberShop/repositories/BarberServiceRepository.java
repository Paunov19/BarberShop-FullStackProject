package com.project.barberShop.repositories;

import com.project.barberShop.models.BarberService;
import com.project.barberShop.models.EBarberService;
import com.project.barberShop.models.ERole;
import com.project.barberShop.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BarberServiceRepository extends JpaRepository<BarberService, Long> {
    Optional<BarberService> findByServiceName(EBarberService serviceName);
}
