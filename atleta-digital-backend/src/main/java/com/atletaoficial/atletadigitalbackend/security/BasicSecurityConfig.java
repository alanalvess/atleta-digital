package com.atletaoficial.atletadigitalbackend.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class BasicSecurityConfig {

    private final JwtAuthFilter authFilter;

    public BasicSecurityConfig(JwtAuthFilter authFilter) {
        this.authFilter = authFilter;
    }

    @Bean
    UserDetailsService userDetailsService() {
        return new UserDetailsServiceImpl();
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationProvider authenticationProvider(UserDetailsService userDetailsService, PasswordEncoder passwordEncoder) {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider(userDetailsService);
        authenticationProvider.setPasswordEncoder(passwordEncoder);
        return authenticationProvider;
    }


    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
            throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, AuthenticationProvider authenticationProvider) throws Exception {
        http
                .sessionManagement(management -> management
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .csrf(AbstractHttpConfigurer::disable)
                .cors(withDefaults());

        http
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/rfid/**").permitAll()
                        .requestMatchers("/usuarios/logar").permitAll()
                        .requestMatchers(HttpMethod.POST, "/usuarios/cadastrar").hasAnyAuthority("ADMIN", "TECNICO")
                        .requestMatchers("/error/**").permitAll()
                        .requestMatchers(HttpMethod.OPTIONS).permitAll()
                        .requestMatchers(HttpMethod.GET, "/usuarios/all").hasAnyAuthority("ADMIN", "TECNICO")
                        .requestMatchers(HttpMethod.GET, "/presencas/turma/{id}").hasAuthority("PROFESSOR")
                        .requestMatchers(HttpMethod.PUT, "/usuarios/{id}").authenticated()
                        .requestMatchers(HttpMethod.PATCH, "/usuarios/{id}").authenticated()
                        .requestMatchers(HttpMethod.DELETE, "/usuarios/{id}").authenticated()
                        .anyRequest().authenticated())
                .authenticationProvider(authenticationProvider) // Injeta a instância recebida no parâmetro
                .addFilterBefore(authFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}

