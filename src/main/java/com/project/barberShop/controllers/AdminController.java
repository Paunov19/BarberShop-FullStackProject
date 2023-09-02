package com.project.barberShop.controllers;

//import com.itextpdf.text.*;
//import com.itextpdf.text.pdf.*;

import com.project.barberShop.dto.DetailedAppointmentDto;
import com.project.barberShop.services.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import  com.project.barberShop.dto.AppointmentDto;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Stream;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/admin")
@Validated
public class AdminController {

    @Autowired
    private AppointmentService appointmentService;

    @GetMapping("/appointments/{date}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<DetailedAppointmentDto>> getAllAppointmentsForDate(@PathVariable("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        List<DetailedAppointmentDto > appointments = appointmentService.getAllAppointmentsForDate(date);
        return new ResponseEntity<>(appointments, HttpStatus.OK);
    }

    @DeleteMapping("/appointments/{appointmentId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> cancelAppointment(@PathVariable Long appointmentId) {
        try {
            appointmentService.cancelAppointmentByAdmin(appointmentId);
            return ResponseEntity.ok("Appointment cancelled successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

}



