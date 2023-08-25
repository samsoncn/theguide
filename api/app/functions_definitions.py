functions = [
    {
        "name": "get_subject_info",
        "description": "Name of the subject", 
        "parameters": {
            "type": "object", 
            "properties": {
                "subject_name": {
                    "type": "string",
                    "description": "Name of the subject, e.g. Mathematics, English, etc.",
                },
            },
            "required": ["subject_name"],
        },
    },
    {
        "name": "asked_question",
        "description": "Question asked by the user and the answer to that question",
        "parameters": {
            "type": "object",
            "properties": {
                "subject_name": {
                    "type": "string",
                    "description": "Name of the subject to add the question and answer to, e.g. Mathematics, English, etc.",
                },
                "question_text": {
                    "type": "string",
                    "description": "Text of the question to add, e.g. What is the Pythagorean theorem?",
                },
                "answer_text": {
                    "type": "string",
                    "description": "Text of the answer to the question, e.g. The Pythagorean theorem states that in a right triangle, the square of the length of the hypotenuse is equal to the sum of the squares of the lengths of the other two sides.",
                },
            },
            "required": ["subject_name", "question_text", "answer_text"],
        },
    },
    {
        "name": "create_review",
        "description": "Create a review for the response",
        "parameters": {
            "type": "object",
            "properties": {
                "review_text": {
                    "type": "string",
                    "description": "The text of the review, e.g. That was great explanation!",
                },
            },
            "required": ["review_text"],
        },
    },
{
        "name": "ask_vector_db",
        "description": "Ask any question to the subject that you have picked. This can include queries about the topics related to the subject, definitions, formulas, derivation of equation, explanation of concepts etc.",
        "parameters": {
            "type": "object",
            "properties": {
                "question_text": {
                    "type": "string",
                    "description": "The question to ask, e.g. 'What is a Type I error'",
                },
            },
            "required": ["question_text"],
        },
    },
]

# Older code

# functions = [
#     {
#         "name": "get_subject_info",
#         "description": "Get the subject name and the question asked by the user", 
#         "parameters": {
#             "type": "object", 
#             "properties": {
#                 "subject_name": {
#                     "type": "string",
#                     "description": "Name of the subject on which the questions will be asked, e.g. Engineering, Statistics, etc.",
#                 },
#             },
#             "required": ["subject_name"],
#         },
#     },
#     {
#         "name": "asked_question",
#         "description": "Get the queston asked by the user and the answer to that question",
#         "parameters": {
#             "type": "object",
#             "properties": {
#                 "subject_name": {
#                     "type": "string",
#                     "description": "The question asked and its response, e.g. What is standard deviation?",
#                 },
#             },
#             "required": ["subject_name"],
#         },
#     },
#     {
#         "name": "create_review",
#         "description": "Create a review for the response",
#         "parameters": {
#             "type": "object",
#             "properties": {
#                 "review_text": {
#                     "type": "string",
#                     "description": "The text of the review, e.g. That was great explanation!",
#                 },
#             },
#             "required": ["review_text"],
#         },
#     },
# {
#         "name": "ask_vector_db",
#         "description": "Ask any question to the subject that you have picked. This can include queries about the topics related to the subject, definitions, formulas, derivation of equation, explanation of concepts etc.",
#         "parameters": {
#             "type": "object",
#             "properties": {
#                 "question": {
#                     "type": "string",
#                     "description": "The question to ask, e.g. 'What is a Type I error'",
#                 },
#             },
#             "required": ["question"],
#         },
#     },
# ]