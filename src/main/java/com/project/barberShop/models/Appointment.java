package com.project.barberShop.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.*;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;
    @NotNull
    @DateTimeFormat(pattern = "HH:mm")
    private LocalTime time;
    @ManyToMany(fetch = FetchType.LAZY)
    @JsonManagedReference
//    @JoinTable(name = "appointment_services",
//            joinColumns = @JoinColumn(name = "appointment_id"),
//            inverseJoinColumns = @JoinColumn(name = "service_id"))
    @JoinColumn(name = "service_id")
    private Set<BarberService> service = new HashSet<>();
    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference  // Add this annotation here.
//    @JoinTable(name = "user_appointment",
//            joinColumns = @JoinColumn(name = "appointment_id"),
//            inverseJoinColumns = @JoinColumn(name = "user_id"))
    @JoinColumn(name = "user_id")
    private User user;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<BarberService> getService() {
        return service;
    }

    public void setService(Set<BarberService> service) {
        this.service = service;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalTime getTime() {
        return time;
    }

    public void setTime(LocalTime time) {
        this.time = time;
    }
}
