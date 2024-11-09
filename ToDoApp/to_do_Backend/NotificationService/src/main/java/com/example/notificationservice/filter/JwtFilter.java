/*
 * Author :Mohd adnan parvez
 * Date : 07-06-2023
 * Created with : intellig IDEA Communit EDITION
 */


package com.example.notificationservice.filter;

import io.jsonwebtoken.Jwts;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtFilter extends GenericFilterBean {

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest httpServletRequest = (HttpServletRequest) servletRequest;
        HttpServletResponse httpServletResponse = (HttpServletResponse) servletResponse;
        String authenticationHeader = httpServletRequest.getHeader("authorization");
        ServletOutputStream servletOutputStream = httpServletResponse.getOutputStream();
        if (authenticationHeader == null || !authenticationHeader.startsWith("Bearer")) {
            servletOutputStream.print("Token is missing");
            servletOutputStream.close();
        } else {
            String jwtToken = authenticationHeader.substring("Bearer".length());
            System.out.println("====================================================================");
            System.out.println("jwtToken = " + jwtToken);

            String emailId = Jwts.parser().setSigningKey("todo").parseClaimsJws(jwtToken)
                    .getBody().getSubject();
            System.out.println("=============================================================");
            System.out.println("=============================================================");
            System.out.println("emailId = " + emailId);
            httpServletRequest.setAttribute("emailId", emailId);
        }
        filterChain.doFilter(servletRequest,servletResponse);
    }
}
