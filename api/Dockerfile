# =========================
# 1. Build stage
# =========================
FROM eclipse-temurin:21-jdk-jammy AS builder

# Set working directory
WORKDIR /app

# Copy Maven/Gradle wrapper and config first (for caching deps)
COPY mvnw* pom.xml ./
COPY .mvn .mvn

# Download dependencies (caches for faster builds)
RUN ./mvnw dependency:go-offline -B

# Copy application source
COPY src src

# Build the app (skip tests for faster image build, optional)
RUN ./mvnw package -DskipTests

# =========================
# 2. Runtime stage
# =========================
FROM eclipse-temurin:21-jre-jammy AS runtime

# Set a non-root user for security
RUN useradd -m spring
USER spring

WORKDIR /app

# Copy only the fat jar from builder stage
COPY --from=builder /app/target/*.jar app.jar

# Expose port (default for WebFlux)
EXPOSE 8080

# JVM optimizations for containers
ENV JAVA_OPTS="\
  -XX:+UseContainerSupport \
  -XX:MaxRAMPercentage=75.0 \
  -XX:+UseG1GC \
  -XX:+AlwaysPreTouch \
  -Djava.security.egd=file:/dev/./urandom \
"

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
