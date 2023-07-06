# Package with python base libraries
FROM python:3.10-slim 

# Working directory
WORKDIR /app

# Copying all the files
ADD . /app

# Installing dependencies from requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Exposing port 5566
EXPOSE 5566

# Running the app. main.py is the entry point/server
CMD ["python", "main.py"] 

