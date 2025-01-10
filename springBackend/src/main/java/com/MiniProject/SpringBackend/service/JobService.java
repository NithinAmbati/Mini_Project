package com.MiniProject.SpringBackend.service;

import com.MiniProject.SpringBackend.model.Job;
import com.MiniProject.SpringBackend.repository.JobRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class JobService {

    @Autowired
    JobRepo repo;

    public List<Job> getAllJobs() {
        return repo.findAll();
    }

    public void createJob(Job job) {
        repo.save(job);
    }


    public Job getJobById(String id) {
        return repo.findById(id).orElse(null);
    }
}
