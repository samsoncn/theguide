import os
from db import Session, Subject, Question, Answer, Review
import prompts
import json
from langchain.llms import OpenAI

from langchain.chains import RetrievalQA
from store import get_vectorstore

# def get_subject_info(subject_name: str):
#     session = Session()
#     question = session.query(Question).filter(Question.subject == subject_name).first()
#     session.close()
#     if question:
#         return json.dumps(question.to_json())
#     else:
#         return "Subject is not found"
    
# def asked_question(subject_name: str):
#     session = Session()
#     question = session.query(Question).filter(Question.subject == subject_name).first()
#     if question:
#         answer = Answer(question=question)
#         session.add(answer)
#         session.commit()
#         session.close()
#         return "Subject Found, solution processing"
#     else:
#         session.close()
#         return "Subject not found"

# def asked_questions():
#     session = Session()
    
#     subjects = {
#         "Maths": "Mathematics information",
#         "English": "English information",
#         "Statistics": "Statistics information",
#         "Physics": "Physics information",
#     }
    
#     for subject, queryAsked in subjects.items():
#         question = Question(subject=subject, queryAsked=queryAsked) 
#         session.add(question)
        
#     session.commit()
#     session.close()

# def asked_questions(subject_name: str, question_text: str, answer_text: str):


def get_subject_info(subject_name: str):
    session = Session()
    subject = session.query(Subject).filter(Subject.name == subject_name).first()
    session.close()
    print("get_subject_info was called")
    if subject:
        return json.dumps(subject.to_dict())
    else:
        return "Subject not found"

def asked_question(subject_name: str, question_text: str, answer_text: str):
    session = Session()
    subject = session.query(Subject).filter(Subject.name == subject_name).first()
    if subject:
        question = Question(text=question_text, subject=subject)
        answer = Answer(text=answer_text, question=question)
        session.add_all([question, answer])
        session.commit()
        session.close()
        print("asked_question was called")
        return "Question and answer added successfully"
    else:
        session.close()
        return "Subject not found"


def create_review(review_text: str):
    session = Session()
    review = Review(review=review_text)
    session.add(review)
    session.commit()
    session.close()
    return "Review created"

def ask_vector_db(question_text: str):
    llm = OpenAI(openai_api_key=os.environ.get("OPENAI_API_KEY"))
    qa = RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",
        retriever=get_vectorstore().as_retriever(),
        chain_type_kwargs={"prompt": prompts.QA_PROMPT, "system_message": prompts.system_message},
    )
    
    result = qa.run(question_text)
    return result


api_functions = {
    "get_subject_info": get_subject_info,
    "asked_question": asked_question,
    "create_review": create_review,
    "ask_vector_db": ask_vector_db,
}


def asked_questions():
    session = Session()
    
    subjects = {
        # subject_name: [question_text, answer_text],
        "Mathematics": "Mathematics information",
        "English": "English information",
        "Statistics": "Statistics information",
        "Physics": "Physics information",
    }
    
    for subject_name, question_text in subjects.items():
        subject = session.query(Subject).filter(Subject.name == subject_name).first()
        if not subject:
            subject = Subject(name=subject_name)
            session.add(subject)
        question = Question(text=question_text, subject=subject)
        session.add(question)
        
    session.commit()
    session.close()
