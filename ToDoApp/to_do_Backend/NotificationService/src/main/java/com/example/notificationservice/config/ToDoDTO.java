/*
 * Author :Mohd adnan parvez
 * Date : 07-06-2023
 * Created with : intellig IDEA Communit EDITION
 */


package com.example.notificationservice.config;


import org.json.simple.JSONObject;

public class ToDoDTO {
    private JSONObject jsonObject;

    public ToDoDTO(JSONObject jsonObject) {
        this.jsonObject = jsonObject;
    }

    public ToDoDTO() {
    }

    public JSONObject getJsonObject() {
        return jsonObject;
    }

    public void setJsonObject(JSONObject jsonObject) {
        this.jsonObject = jsonObject;
    }

    @Override
    public String toString() {
        return "ToDoDTO{" +
                "jsonObject=" + jsonObject +
                '}';
    }
}
