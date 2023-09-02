package com.project.barberShop.models;


import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class BarberService {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @JsonBackReference
    @Column(nullable = false, unique = true)
    private EBarberService serviceName;

//    @ManyToMany(mappedBy = "service")
//    private List<Appointment> appointments = new ArrayList<>();

    public BarberService() {}
    public BarberService(EBarberService serviceName) {
        this.serviceName = serviceName;
    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public EBarberService getServiceName() {
        return serviceName;
    }

    public void setServiceName(EBarberService serviceName) {
        this.serviceName = serviceName;
    }

//    public List<Appointment> getAppointments() {
//        return appointments;
//    }
//
//    public void setAppointments(List<Appointment> appointments) {
//        this.appointments = appointments;
//    }
}
