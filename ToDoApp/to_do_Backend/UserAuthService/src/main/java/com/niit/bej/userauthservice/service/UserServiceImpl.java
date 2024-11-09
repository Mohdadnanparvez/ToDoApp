/*
 * Author :Mohd adnan parvez
 * Date : 02-06-2023
 * Created with : intellig IDEA Communit EDITION
 */


package com.niit.bej.userauthservice.service;

import com.fasterxml.jackson.databind.util.JSONPObject;
import com.niit.bej.userauthservice.domain.User;
import com.niit.bej.userauthservice.exception.UserAlreadyExistException;
import com.niit.bej.userauthservice.exception.UserNotFoundException;
import com.niit.bej.userauthservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;

@Service
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;
    private JavaMailSender mailSender;
    @Autowired
    public UserServiceImpl(UserRepository userRepository, JavaMailSender mailSender) {
        this.userRepository = userRepository;
        this.mailSender = mailSender;
    }



    @Override
    public User registerUser(User user) throws UserAlreadyExistException {
        if (userRepository.findById(user.getEmailId()).isPresent()) {
            throw new UserAlreadyExistException();
        } else {
            return userRepository.save(user);
        }
    }

    @Override
    public User findByEmailAndPassword(String emailId, String password) throws UserNotFoundException {
        User user = userRepository.findByEmailIdAndPassword(emailId, password);
        if (user != null) {
            return user;
        } else {
            throw new UserNotFoundException();
        }

    }

    @Override
    public String sendEmail(String emailId)  {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setFrom("todonotification8@gmail.com");
        mailMessage.setTo(emailId);
        mailMessage.setSubject("You have successfully logged in !!!");
        mailMessage.setText("Congratulations! You have successfully logged in. Welcome to your account");
        mailSender.send(mailMessage);
            return "";
    }


}
