# This is the regular store database

from sqlalchemy import Column, Float, Integer, String, ForeignKey, create_engine
from sqlalchemy.orm import relationship, sessionmaker
from sqlalchemy.ext.declarative import declarative_base

import mysql.connector

Base = declarative_base()


class Question(Base):
    __tablename__ = 'questions'
    id = Column(Integer, primary_key=True)
    subject = Column(String)
    queryAsked = Column(String)
    answers = relationship('Answer', back_populates='question')
    
    def to_json(self):
        return {
            'id': self.id,
            'subject': self.subject,
            'queryAsked': self.queryAsked
        }


class Answer(Base):
    __tablename__ = 'answers'
    id = Column(Integer, primary_key=True)
    question_id = Column(Integer, ForeignKey('questions.id'))
    question = relationship('Question', back_populates='answers')
    
    def to_json(self):
        return {
            'id': self.id,
            'question': self.question.to_json()
        }


class Review(Base):
    __tablename__ = 'reviews'
    id = Column(Integer, primary_key=True)
    review = Column(String)
    
    def to_json(self):
        return {
            'id': self.id,
            'review': self.review
        }
        

engine = create_engine("sqlite:///questions.db")
Session = sessionmaker(bind=engine)


