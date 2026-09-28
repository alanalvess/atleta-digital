# -------- STAGE 1 - BUILD --------
FROM eclipse-temurin:25-jdk-alpine AS build

WORKDIR /app

# Copia apenas arquivos necessários para baixar dependências
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

RUN chmod +x mvnw
RUN ./mvnw dependency:go-offline

# Agora copia o código
COPY src src

# Gera o jar
RUN ./mvnw clean package -DskipTests


# -------- STAGE 2 - RUNTIME --------
FROM eclipse-temurin:25-jre-alpine
WORKDIR /app

# Copia o jar gerado
COPY --from=build /app/target/*.jar app.jar

# Porta padrão (Render sobrescreve via variável PORT)
EXPOSE 8080

ENTRYPOINT ["java","-jar","app.jar"]