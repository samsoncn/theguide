# This is the regular store database

from sqlalchemy import Column, Float, Integer, String, ForeignKey, create_engine
from sqlalchemy.orm import relationship, sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import os
from dotenv import find_dotenv, load_dotenv


Base = declarative_base()


# class Question(Base):
#     __tablename__ = 'questions'
#     id = Column(Integer, primary_key=True, autoincrement=True)
#     subject = Column(String(300))
#     queryAsked = Column(String(4000))
#     answers = relationship('Answer', back_populates='question')

#     def to_json(self):
#         return {
#             'id': self.id,
#             'subject': self.subject,
#             'queryAsked': self.queryAsked
#         }


# class Answer(Base):
#     __tablename__ = 'answers'
#     id = Column(Integer, primary_key=True, autoincrement=True)
#     question_id = Column(Integer, ForeignKey('questions.id'))
#     question = relationship('Question', back_populates='answers')

#     def to_json(self):
#         return {
#             'id': self.id,
#             'question': self.question.to_json()
#         }

class Subject(Base):
    __tablename__ = 'subject'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(50))
    questions = relationship('Question', back_populates='subject')
    print("Subject table created")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'questions': [question.to_dict() for question in self.questions]
        }

# class Question(Base):
#     __tablename__ = 'question'
#     id = Column(Integer, primary_key=True, autoincrement=True)
#     text = Column(String(1000))
#     subject_id = Column(Integer, ForeignKey('subject.id'))
#     subject = relationship('Subject', back_populates='questions')
#     answer = relationship('Answer', uselist=False, back_populates='question')
#     print("Question table created")

#     def to_dict(self):
#         return {
#             'id': self.id,
#             'text': self.text,
#             'subject_id': self.subject_id,
#             'answer': self.answer.to_dict() if self.answer else None
#         }

class Question(Base):
    __tablename__ = 'question'
    id = Column(Integer, primary_key=True, autoincrement=True)
    text = Column(String(1000))
    subject_id = Column(Integer, ForeignKey('subject.id'))
    subject = relationship('Subject', back_populates='questions')
    answer = relationship('Answer', uselist=False, back_populates='question')
    print("Question table created")

    def to_dict(self):
        return {
            'subject_id': self.subject_id,
            'text': self.text,
            'answer': self.answer.to_dict() if self.answer else None
        }

class Answer(Base):
    __tablename__ = 'answer'
    id = Column(Integer, primary_key=True, autoincrement=True)
    text = Column(String(5000))
    question_id = Column(Integer, ForeignKey('question.id'))
    question = relationship('Question', back_populates='answer')
    print("Answer table created")

    def to_dict(self):
        return {
            'id': self.id,
            'text': self.text,
            'question_id': self.question_id
        }

class Review(Base):
    __tablename__ = 'reviews'
    id = Column(Integer, primary_key=True)
    review = Column(String(2000))

    def to_json(self):
        return {
            'id': self.id,
            'review': self.review
        }


# engine = create_engine("sqlite:///questions.db")
# Session = sessionmaker(bind=engine)

load_dotenv()

host = os.environ.get('HOST')
password = os.environ.get('PASSWORD')
user='9kPJNC5oSUSWkkK.root'
port=4000
database="test"

ssl={"ca": "./cacert.pem"}
ssl_mode="VERIFY_IDENTITY"

engine = create_engine(f'mysql://{user}:{password}@{host}:{port}/{database}', connect_args={
    "ssl_mode": ssl_mode,
    "ssl": ssl
})


Base.metadata.create_all(engine)


Session = sessionmaker(bind=engine)