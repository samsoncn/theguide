from fastapi import FastAPI, Request, HTTPException
from langchain.llms import OpenAI 
from langchain.agents import AgentExecutor, AgentType, initialize_agent, load_tools
import os
from dotenv import load_dotenv
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

load_dotenv()

OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')

def create_chain() -> AgentExecutor:
    llm = OpenAI(modelName="gpt-3.5-turbo",openai_api_key=OPENAI_API_KEY,temperature=0.8,maxTokens=100)
    tools = load_tools(["serpapi"],["llm-math"], llm=llm)
    return initialize_agent(
        tools, llm, agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION, verbose=True
    )


app = FastAPI()
templates = Jinja2Templates(directory="templates")
chain = create_chain()


@app.get("/api/chat")
def hello_world():
    return {"message": "Hello World"}

@app.post("/api/agent")
async def handle_agent_request(request: Request):
    data = await request.json()
    
    # Extract the necessary information from the request data
    action = data.get("action")
    input_data = data.get("input")
    
    # Perform the action using the agent
    if action == "search":
        response = agent.search(input_data)
    elif action == "calculate":
        response = agent.calculate(input_data)
    else:
        response = {"error": "Invalid action"}
    
    # Return the response
    return response

@app.route("/api/agent", methods=["GET", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"])
async def handle_invalid_method():
    raise HTTPException(status_code=405, detail="Method not allowed")
