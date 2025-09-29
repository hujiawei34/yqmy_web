package com.yqmy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import springfox.documentation.oas.annotations.EnableOpenApi;

@SpringBootApplication
@EnableOpenApi
public class YqmyWebApplication {
    public static void main(String[] args) {
        SpringApplication.run(YqmyWebApplication.class, args);
    }
}