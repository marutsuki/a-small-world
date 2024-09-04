package io.marutsuki.asmallworld;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class ASmallWorldApplication {

	public static void main(String[] args) {
		SpringApplication.run(ASmallWorldApplication.class, args);
	}

}
