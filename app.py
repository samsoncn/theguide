# from flask import Flask, request, jsonify
# from langchain.llms import OpenAI
# import os
# from dotenv import load_dotenv
# from flask_cors import CORS

# load_dotenv()  # take environment variables from .env.

# app = Flask(__name__)
# CORS(app)

# # Set up the OpenAI API key
# OPENAI_API_KEY = os.environ["OPENAI_API_KEY"]
# llm = OpenAI(api_key=OPENAI_API_KEY, model="gpt-3.5-turbo", temperature=0.8)

# @app.route('/api/index', methods=['POST'])
# def chat():
#     data = request.get_json()
#     message = data.get('message')
#     response = llm.generate(message)
#     return jsonify({"choices": [{"message": {"content": response['choices'][0]['text']}}]})

# if __name__ == '__main__':
#     app.run(port=5000)

# import os
# from langchain.llms import OpenAI
# from dotenv import load_dotenv

# # Load environment variables from .env file
# load_dotenv()

# # Set up the OpenAI API key
# OPENAI_API_KEY = os.environ["OPENAI_API_KEY"]
# llm = OpenAI(api_key=OPENAI_API_KEY, model="gpt-3.5-turbo", temperature="0.8")


# # Define the router function
# def router(request):
#     # Get the input from the request
#     input_text = request["input_text"]

#     prompts = ["What is the capital of France?", "Who painted the Mona Lisa?"]

#     # Use the LLM to generate a response
#     response = llm.generate(prompts)



#     # Return the response
#     return {"output_text": response}

# # Run the router function
# if __name__ == "__main__":
#     request = {"input_text": "what is 1+1?"} 
#     output = router(request)
#     print(output)


from flask import Flask, jsonify, request
import pandas as pd
from langchain.agents import create_pandas_dataframe_agent
from langchain.llms import OpenAI
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>I’m building something cool today!</p>"

@app.route("http://localhost:5000/api/chat", methods=['POST'])
def queryJson():
    req = request.get_json()
    data = req['data']
    query = req['query']
    df = pd.DataFrame.from_dict(data)
    agent = create_pandas_dataframe_agent(OpenAI(temperature=0), df, verbose=True)
    result = agent.run(query)
    return jsonify(result)

if __name__ == '__main__':
    app.run(port=5000, debug=True)
