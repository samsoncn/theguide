from fastapi import FastAPI
from fastapi.responses import PlainTextResponse
from functions_definitions import functions
from functions_definitions import functions
from functions import api_functions, asked_questions
from handler import OpenAIHandler
from models import Interaction
from db import Base, engine
from prompts import system_message
import os
from store import create_store
from db import Session, Review, Answer
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
from starlette.exceptions import HTTPException as StarletteHTTPException
import uvicorn

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



@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(request, excecption):
    print(f"{repr(excecption)}")
    return PlainTextResponse(str(excecption.detail), status_code=excecption.status_code)


@app.on_event("startup")
async def startup_event():
    Base.metadata.create_all(bind=engine)
    asked_questions()
    if not os.path.exists("vectorstore.pkl"):
        create_store()


@app.on_event("shutdown")
async def shutdown_event():
    os.remove("questions.db")


@app.post("/api/app/conversation")
async def query_endpoint(interaction: Interaction):
    response = handler.send_response(interaction.query)
    return {"response": response}


@app.get("/reviews")
async def get_all_reviews():
    session = Session()
    reviews = session.query(Review).all()
    session.close() 
    return reviews


@app.get("/askedQuestions")
async def get_all_askedQuestions():
    session = Session()
    answers = session.query(Answer).all()
    session.close()
    return answers
