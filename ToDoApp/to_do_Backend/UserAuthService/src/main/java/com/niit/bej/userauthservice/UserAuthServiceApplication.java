package com.niit.bej.userauthservice;

import com.niit.bej.userauthservice.filter.JwtFilter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EnableEurekaClient
public class UserAuthServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(UserAuthServiceApplication.class, args);
	}
	@Bean
	public FilterRegistrationBean<JwtFilter> registerFilterBean() {
		FilterRegistrationBean<JwtFilter> jwtFilterBean = new FilterRegistrationBean<>();
		jwtFilterBean.setFilter(new JwtFilter());
		jwtFilterBean.addUrlPatterns("/user/sendSimpleEmail");
		return jwtFilterBean;
	}
}

