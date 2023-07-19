import json
import os
import openai
from dotenv import find_dotenv, load_dotenv


class OpenAIHandler:
    
    def __init__(
        self,
        api_functions,
        function_definitions,
        # This is the message that will give the bot some identity.
        system_message,
        # 0613 is the version of gpt that can take function definitions as input.
        model="gpt-3.5-turbo-0613",
    ):
        load_dotenv(find_dotenv())
        openai.api_key = os.environ.get("OPENAI_API_KEY")
        if openai.api_key is None:
            raise ValueError(
                "OPENAI_API_KEY not found in environment variables.")

        # This is a dictionary of functions that the bot can call.
        self.api_functions = api_functions
        # This is a dictionary of function_definitions that the bot can use to call functions.
        self.function_definitions = function_definitions
        # This is the model that the bot will use to generate responses.
        self.model = model
        # This is the message that will give the bot some identity.
        self.system_message = system_message

    '''
    This function is used to send a message to the bot.
    This is the inital call to the llm.
    '''

    def send_message(self, query):
        response = openai.ChatCompletion.create(
            model=self.model,
            messages=[
                {
                    "role": "system",
                    # System message is used to give the bot some identity.
                    "content": self.system_message,
                },
                {
                    "role": "user", "content": query
                }
            ],
            # This is the dictionary of function_definitions that the bot can use to call functions.
            # This is also the place where llm decides whether to call a function or not.
            functions=self.function_definitions,
        )
        # The message is retrieved from the response.
        message = response["choices"][0]["message"]
        return message

    def process_function_call(self, message):
        # this if statement checks if the message contains a function call.
        if message.get("function_call"):
            print(message.get("function_call"))
            # The name of the function is retrieved from the message.
            function_name = message["function_call"]["name"]
            # The arguments of the function are retrieved from the message.
            function_args_json = message["function_call"].get("arguments", {})
            # The arguments are converted from json to a python dictionary.
            function_args = json.loads(function_args_json)

            # The api function is retrieved from the api_functions dictionary.
            api_function = self.api_functions.get(function_name)

            # This if statement checks if the api_function exists.
            if api_function:
                # The api function is called with the arguments and the result is converted to a string.
                result = str(api_function(**function_args))
                return function_name, result
            else:
                print(f"Function {function_name} not found.")
        return None, None

    # Final response
    # Same query as was in send_message function.
    def send_response(self, query):
        message = self.send_message(query)
        # The function_name and result are retrieved from the message.
        function_name, result = self.process_function_call(message)

        # If statement checks if the function_name and result exist that is function was called and result was returned.
        if function_name and result:
            print("Function call necessary to fulfill users request")
            # Additional request to llm to get the response.
            second_response = openai.ChatCompletion.create(
                model=self.model,
                messages=[
                    {
                        "role": "system",
                        "content": self.system_message,
                    },
                    {
                        "role": "user",
                        "content": query,
                    },
                    message,
                    {
                        "role": "function",
                        "name": function_name,
                        "content": result,
                    }
                ],
            )
            return second_response["choices"][0]["message"]["content"]
        else:
            # If function was not called then the message is returned.
            return message["content"]