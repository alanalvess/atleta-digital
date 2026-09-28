package com.atletaoficial.atletadigitalbackend.security;


import com.atletaoficial.atletadigitalbackend.enums.Role;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Component
public class JwtService {

    @Value("${jwt.secret}")
    private String secret;

    long EXPIRATION_TIME_MS = 1000 * 60 * 60 * 24; // 24 horas

//    private Key getSignKey() {
//        byte[] keyBytes = Decoders.BASE64.decode(secret);
//        return Keys.hmacShaKeyFor(keyBytes);
//    }

    private SecretKey getSignKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        return Keys.hmacShaKeyFor(keyBytes);
    }
//    private Claims extractAllClaims(String token) {
//        return Jwts.parserBuilder()
//                .setSigningKey(getSignKey()).build()
//                .parseClaimsJws(token).getBody();
//    }


//    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
//        Claims claims = extractAllClaims(token);
//        return claimsResolver.apply(claims);
//    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSignKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

//    public String extractUsername(String token) {
//        return Jwts.parserBuilder()
//                .setSigningKey(getSignKey()).build()
//                .parseClaimsJws(token).getBody().getSubject();
//    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

//    private Boolean isTokenExpired(String token) {
//        return Jwts.parserBuilder()
//                .setSigningKey(getSignKey()).build()
//                .parseClaimsJws(token).getBody().getExpiration()
//                .before(new Date());
//    }
//
//    public Boolean validateToken(String token, UserDetails userDetails) {
//        return extractUsername(token).equals(userDetails.getUsername()) && !isTokenExpired(token);
//    }

    private Boolean isTokenExpired(String token) {
        return extractClaim(token, Claims::getExpiration).before(new Date());
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        return extractUsername(token).equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

//    private String createToken(Map<String, Object> claims, String userName, List<Role> roles) {
//        claims.put("roles", roles.stream().map(Enum::name).collect(Collectors.toList()));
//
//        return Jwts.builder()
//                .setClaims(claims)
//                .setSubject(userName)
//                .setIssuedAt(new Date(System.currentTimeMillis()))
//                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME_MS))
//                .signWith(getSignKey(), SignatureAlgorithm.HS256)
//                .compact();
//    }
//
//    public String generateToken(String userName, List<Role> roles) {
//        Map<String, Object> claims = new HashMap<>();
//        return createToken(claims, userName, roles);
//    }

    private String createToken(Map<String, Object> claims, String userName, List<Role> roles) {
        List<String> rolesString = roles.stream()
                .map(Enum::name)
                .collect(Collectors.toList());

        return Jwts.builder()
                .claims(claims)                                      // Substitui setClaims()
                .subject(userName)                                   // Substitui setSubject()
                .issuedAt(new Date(System.currentTimeMillis()))      // Substitui setIssuedAt()
                .expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME_MS)) // Substitui setExpiration()
                .claim("roles", rolesString)                         // Adiciona a Claim customizada de forma limpa
                .signWith(getSignKey())                              // O algoritmo (HS256) agora é detectado automaticamente pela chave
                .compact();
    }

    public String generateToken(String userName, List<Role> roles) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, userName, roles);
    }
}