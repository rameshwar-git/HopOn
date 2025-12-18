package com.admin.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity(name="currentLocation")
public class CurrentLocation {

    @Id
    private int id;
}
