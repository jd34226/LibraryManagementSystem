package mgt.library.application;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
@ComponentScan(basePackages = { "mgt.library.transaction", "mgt.library.member", "mgt.library.book" })
@EnableJpaRepositories(basePackages = {"mgt.library.transaction.repository", "mgt.library.member.repository","mgt.library.book.repository"})
@EntityScan(basePackages = {"mgt.library.transaction.model", "mgt.library.member.model","mgt.library.book.model" })
public class LibraryApplication {

	public static void main(String[] args) {
		SpringApplication.run(LibraryApplication.class, args);
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
	    return new WebMvcConfigurer() {
	        @Override
	        public void addCorsMappings(CorsRegistry registry) {
	            registry.addMapping("/**")
	                .allowedOrigins(
	                    "http://<frontend-domain>",
						"http://<frontend-domain>:<port>"
	                )
	                .allowedMethods("GET", "POST", "PUT", "DELETE")
	                .allowCredentials(false);
	        }
	    };
	}
}
