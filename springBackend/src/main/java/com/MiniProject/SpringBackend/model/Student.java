package com.MiniProject.SpringBackend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "student-logins")
public class Student {
    private String username;
    private String password;
    @Id
    private String email;
    private List<String> skills;
    private String resume;
    private String education;
    private String experience;
    private String address;
    private String contactNumber;
    private List<String> qualifications;
    private List<String> jobsApplied;


    public Student() {}

    public Student(String username, String password, String email, List<String> skills, String education, String resume, String experience, String address, String contactNumber, List<String> qualifications, List<String> jobsApplied) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.skills = skills;
        this.education = education;
        this.resume = resume;
        this.experience = experience;
        this.address = address;
        this.contactNumber = contactNumber;
        this.qualifications = qualifications;
        this.jobsApplied = jobsApplied;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setSkills(List<String> skills) {
        this.skills = skills;
    }

    public void setResume(String resume) {
        this.resume = resume;
    }

    public void setEducation(String education) {
        this.education = education;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setExperience(String experience) {
        this.experience = experience;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public void setQualifications(List<String> qualifications) {
        this.qualifications = qualifications;
    }

    public void setJobsApplied(List<String> jobsApplied) {
        this.jobsApplied = jobsApplied;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getEmail() {
        return email;
    }

    public List<String> getSkills() {
        return skills;
    }

    public String getResume() {
        return resume;
    }

    public String getEducation() {
        return education;
    }

    public String getExperience() {
        return experience;
    }

    public String getAddress() {
        return address;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public List<String> getQualifications() {
        return qualifications;
    }

    public List<String> getJobsApplied() {
        return jobsApplied;
    }
}
