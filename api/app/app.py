from fastapi import FastAPI, HTTPException
from fastapi.responses import PlainTextResponse
from fastapi.middleware.cors import CORSMiddleware
from functions_definitions import functions
from functions import api_functions, asked_questions
from handler import OpenAIHandler
from models import Interaction
from db import Base, engine, Session, Subject, Review, Question, Answer
from prompts import system_message
import os
from store import create_store
from dotenv import load_dotenv

app = FastAPI()
# app = FastAPI(middleware=[
#     Middleware(CORSMiddleware, allow_origins=["*"])
# ])
# , allow_credentials=True,allow_methods=["*"],allow_headers=["*"]
handler = OpenAIHandler(api_functions, functions, system_message)
load_dotenv()

origins = ['http://localhost:3000', 'https://theguidesai.vercel.app', 'theguides-h0f52zltc-wetheguide23-gmailcom.vercel.app', 'https://theguides-git-dev-wetheguide23-gmailcom.vercel.app', 'https://theguides-wetheguide23-gmailcom.vercel.app', 'https://temp-guides.vercel.app']

# origins=["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(HTTPException)
async def http_exception_handler(request, exception):
    return PlainTextResponse(str(exception.detail), status_code=exception.status_code)

@app.on_event("startup")
async def startup_event():
    Base.metadata.create_all(bind=engine)
    asked_questions()
    if not os.path.exists("vectorstore.pkl"):
        create_store()

# user input to prompt to langchain-openai
@app.post("/api/app/conversation/{subject}")
async def query_endpoint(subject: str, interaction: Interaction):
    subject = subject.lower()
    response = handler.send_response(subject, interaction.query)
    return {"response": response}

# @app.post("/api/app/conversation")
# async def query_endpoint(interaction: Interaction):
#     response = handler.send_response(interaction.query)
#     return {"response": response}


@app.get("/reviews")
async def get_all_reviews():
    session = Session()
    reviews = session.query(Review).all()
    session.close() 
    return reviews


@app.get("/askedQuestions")
async def get_all_askedQuestions():
    session = Session()
    answers = session.query(Question).all()
    session.close()
    return answers