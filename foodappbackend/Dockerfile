# Use an official OpenJDK runtime as a parent image
FROM openjdk:17

# Set the working directory inside the container
WORKDIR /app

# Copy the Maven wrapper and project files
COPY . /app

# Grant execute permission to mvnw
RUN chmod +x mvnw

# Build the application
RUN ./mvnw clean package

# Expose the application port (change if needed)
EXPOSE 8080

# Start the application
CMD ["java", "-jar", "target/*.jar"]