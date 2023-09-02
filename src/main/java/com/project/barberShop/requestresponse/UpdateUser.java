package com.project.barberShop.requestresponse;


import javax.persistence.Column;
import javax.validation.constraints.Email;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

public class UpdateUser {
    @Pattern(regexp = "^[a-zA-Zа-яА-Я]{3,255}$")
    private String firstName;
    @Pattern(regexp = "^[a-zA-Zа-яА-Я]{3,255}$")
    private String lastName;
    @Pattern(regexp = "^\\d{10}$")
    private String phoneNumber;
    @Email
    private String email;
    private String currentPassword;
    //@Size(max = 20)
    @Pattern(regexp = "^[a-zA-Z0-9]{6,20}$", message = "Password should only contain numbers and letters")
    private String newPassword;

    public UpdateUser() {

    }

    public UpdateUser(String firstName, String lastName, String phoneNumber,String email, String currentPassword, String newPassword) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber= phoneNumber;
        this.email = email;
        this.currentPassword = currentPassword;
        this.newPassword = newPassword;
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

    public String getCurrentPassword() {
        return currentPassword;
    }

    public void setCurrentPassword(String currentPassword) {
        this.currentPassword = currentPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
}
