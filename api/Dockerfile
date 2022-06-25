FROM maven:3.6.0-jdk-11-slim AS build
WORKDIR /app

COPY pom.xml .
COPY src ./src
RUN --mount=type=cache,target=/root/.m2 mvn clean package -Dmaven.test.skip

FROM adoptopenjdk/openjdk11:alpine-jre
WORKDIR /opt/app

COPY --from=build /app/target/blog-0.0.1-SNAPSHOT.jar /opt/app
CMD ["java", "-jar", "blog-0.0.1-SNAPSHOT.jar"]