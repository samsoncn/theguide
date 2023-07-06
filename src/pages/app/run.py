import subprocess
import os
from dotenv import load_dotenv

load_dotenv()

subprocess.run(
    [
        "docker",
        "run",
        "-e", # environment variable called below
        f"PORT=5567",
        "-e",
        f"OPEN_API_KEY={os.getenv('OPEN_API_KEY')}",
        "-p",
        "5567:5567", # port mapping, left is container, right is host
        "aiapp",
    ]
)