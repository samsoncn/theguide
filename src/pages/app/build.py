# Helper function for building the app on docker
import subprocess # allows you to call docker cli from python
import os
from dotenv import load_dotenv

load_dotenv()

# Build the Docker image with the tag aiapp and the current directory (".")
subprocess.run(["docker", "build", "-t", "aiapp", "."])