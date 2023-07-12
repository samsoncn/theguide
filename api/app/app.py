# Sever side

from fastapi import FastAPI
from fastapi.responses import PlainTextResponse
# from app.functions_definitions import functions
# from app.functions_definitions import functions
# from app.functions import api_functions, create_pizzas
# from app.handler import OpenAIHandler
# from app.models import Interaction
# from app.db import Base, engine
# from app.prompts import system_message
# from app.store import create_store
# from app.db import Session, Review, Order
# from dotenv import load_dotenv
from functions_definitions import functions
from functions_definitions import functions
from functions import api_functions, create_pizzas
from handler import OpenAIHandler
from models import Interaction
from db import Base, engine
from prompts import system_message
import os
from store import create_store
from db import Session, Review, Order
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
from starlette.exceptions import HTTPException as StarletteHTTPException


app = FastAPI()
handler = OpenAIHandler(api_functions, functions, system_message)
load_dotenv()

origins = ['http://localhost:3000']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# handle any exceptions from our controller
@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(request, excecption):
    print(f"{repr(excecption)}")
    return PlainTextResponse(str(excecption.detail), status_code=excecption.status_code)

# Life cycle events/hook. It will be called when the server starts, before the first request is processed.
@app.on_event("startup")
async def startup_event():
    Base.metadata.create_all(bind=engine) # Create the database connection.
    create_pizzas() # Create the pizzas in the database.
    if not os.path.exists("vectorstore.pickle"): # Check if the vectorstore.pickle file exists.
        create_store() # Create the vectorstore.pickle file if it does not exist.
        
# Life cycle events/hook. It will be called when the server stops, after the last request is processed.
# Doing this will ensure that the database connection is closed when the server stops.
@app.on_event("shutdown")
async def shutdown_event():
    os.remove("pizza.db") # Remove the database connection.

@app.post("/api/app/conversation") # This is the first endpoint for the rest api.    
# This is the first endpoint for the rest api.
async def query_endpoint(interaction: Interaction):
    # The interaction is passed to the handler.
    # response = handler.send_response(interaction.query)
    # query takes input from the user from the frontend.
    response = handler.send_response(interaction.query)
    return {"response": response}

# Endpoint for the reviews.
# Additional
@app.get("/reviews")
async def get_all_reviews():
    session = Session() # Create a session in database.
    reviews = session.query(Review).all() # Get all the reviews from the database.
    session.close() # Close the session.
    return reviews

# Endpoint for the orders to see if OpenAI was able to review if asked to do so.
# Additional
@app.get("/orders")
async def get_all_orders():
    session = Session() # Create a session in database.
    orders = session.query(Order).all() # Get all the orders from the database.
    session.close() # Close the session.
    return orders


