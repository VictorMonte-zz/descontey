FROM openjdk:8-jdk-alpine

EXPOSE 8080

ADD /build/libs/catalog-1.0-SNAPSHOT.jar catalog.jar

ENTRYPOINT ["java", "-jar", "catalog.jar"]