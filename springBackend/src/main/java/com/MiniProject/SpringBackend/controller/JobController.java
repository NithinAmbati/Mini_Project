package com.MiniProject.SpringBackend.controller;


import com.MiniProject.SpringBackend.model.Job;
import com.MiniProject.SpringBackend.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
public class JobController {

    @Autowired
    JobService service;

    @GetMapping("/jobs")
    public List<Job> getAllJobs() {
        return service.getAllJobs();
    }

    @PostMapping("/jobs")
    public String createJob(@RequestBody Job job) {
        service.createJob(job);
        return "Job created";
    }

    @GetMapping("/jobs/{id}")
    public Job getJobById(@PathVariable String id) {
        return service.getJobById(id);
    }

}
