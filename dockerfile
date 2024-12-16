# Use an official Python runtime as a parent image
FROM python:3.10-slim

# Set the working directory in the container
WORKDIR /app

# Install system dependencies (for example, for Google Cloud)
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy the current directory contents into the container at /app
COPY . /app/

# Install Python dependencies from requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Expose the port the app runs on (default Django port is 8000)
EXPOSE 8000

# Set environment variable for Django settings
ENV DJANGO_SETTINGS_MODULE=myproject.settings

# Command to run on container start
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]