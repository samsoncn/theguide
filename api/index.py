from fastapi import FastAPI, Request, HTTPException
from langchain.llms import OpenAI 
from langchain.agents import AgentType, initialize_agent, load_tools
import os
from dotenv import load_dotenv

load_dotenv()

OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')

app = FastAPI()
llm = OpenAI(modelName="gpt-3.5-turbo",openai_api_key=OPENAI_API_KEY,temperature=0.8,maxTokens=100)

tools = load_tools(["serpapi"], llm=llm)

agent = initialize_agent(tools, llm, agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION, verbose=True)

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
