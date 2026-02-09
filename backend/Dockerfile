# Use official Java 21 image (matches pom.xml)
FROM eclipse-temurin:21-jdk

# Set working directory
WORKDIR /app

# Copy maven wrapper and pom
COPY .mvn .mvn
COPY mvnw pom.xml ./

# Download dependencies
RUN chmod +x mvnw && ./mvnw dependency:go-offline

# Copy source code
COPY src src

# Build the application
RUN ./mvnw clean package -DskipTests

# Expose port (Render uses this)
EXPOSE 10000

# Run the application
CMD ["java", "-jar", "target/foodappbackend-0.0.1-SNAPSHOT.jar"]
