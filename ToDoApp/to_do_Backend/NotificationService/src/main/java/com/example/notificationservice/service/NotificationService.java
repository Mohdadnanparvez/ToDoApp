/*
 * Author :Mohd adnan parvez
 * Date : 07-06-2023
 * Created with : intellig IDEA Communit EDITION
 */


package com.example.notificationservice.service;

import com.example.notificationservice.config.ToDoDTO;
import com.example.notificationservice.domain.Notification;
import com.example.notificationservice.exception.UserNotFoundException;

public interface NotificationService {
    Notification getAllNotification(String emailId) throws UserNotFoundException;
    void saveNotification(ToDoDTO toDoDTO) throws  UserNotFoundException;
}
