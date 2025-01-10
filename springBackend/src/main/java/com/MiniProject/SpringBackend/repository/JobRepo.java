package com.MiniProject.SpringBackend.repository;

import com.MiniProject.SpringBackend.model.Job;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface JobRepo extends MongoRepository<Job, String> {

}