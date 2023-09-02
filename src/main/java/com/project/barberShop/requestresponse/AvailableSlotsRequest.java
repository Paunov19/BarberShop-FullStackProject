package com.project.barberShop.requestresponse;

import com.project.barberShop.models.EBarberService;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.Date;

public class AvailableSlotsRequest {

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;
    private EBarberService eBarberService;

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public EBarberService geteBarberService() {
        return eBarberService;
    }

    public void seteBarberService(EBarberService eBarberService) {
        this.eBarberService = eBarberService;
    }
}
