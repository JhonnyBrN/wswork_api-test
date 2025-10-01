package com.wswork.wswork_api.repository;

import com.wswork.wswork_api.entity.Carro;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarroRepository extends JpaRepository<Carro, Long> {
}