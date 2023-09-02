package com.project.barberShop.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(uniqueConstraints = {
        @UniqueConstraint(columnNames = "email"),
        @UniqueConstraint(columnNames = "phoneNumber")})
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @Pattern(regexp = "^[a-zA-Zа-яА-Я]{3,255}$")
    @NotBlank(message = "First name is required")
    private String firstName;

    @Column(nullable = false)
    @Pattern(regexp = "^[a-zA-Zа-яА-Я]{3,255}$")
    @NotBlank(message = "Last name is required")
    private String lastName;

    @Column(nullable = false, unique = true)
    @Pattern(regexp = "^[\\w-]+(\\.[\\w-]+)*@[\\w-]+(\\.[\\w-]+)*(\\.[a-zA-Z]{2,})$", message = "Email should be valid")
    @NotBlank(message = "Email is required")
    @Email
    private String email;

    @Column(nullable = false)
    @Pattern(regexp = "^\\d{10}$")
    @NotBlank(message = "Phone number is required")
    private String phoneNumber;

    @Column(nullable = false)
    @Size(max = 20)
    @Pattern(regexp = "^[a-zA-Z0-9]{6,20}$", message = "Password should only contain numbers and letters")
    @NotBlank(message = "Password is required")
    private String password;

    @ManyToMany(fetch = FetchType.EAGER)
    @JsonManagedReference
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> role = new HashSet<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Appointment> appointments;

    public Set<Role> getRole() {
        return role;
    }

    public void setRole(Set<Role> role) {
        this.role = role;
    }

    public List<Appointment> getAppointments() {
        return appointments;
    }

    public void setAppointments(List<Appointment> appointments) {
        this.appointments = appointments;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


}
