# This it the vector store database

# It is used to serialise and deserialise vector store.
import pickle
''' 
Importing the FAISS class from the langchain.vectorstores.faiss module.
FAISS is a vector store that provides efficient similarity search and clustering of dense vectors.
Other vector stores like deeplake and supabase can also be imported. 
'''
from langchain.vectorstores.faiss import FAISS
import os
'''
Line 1: Loads the DocumentLoader class from the langchain.document_loaders module to the memory.
Line 2: Splits the text into chunks recursively which is used to create the embeddings (vectors).
Line 3: Embeds the text into vectors so they can be comapred via semantic/similarity search.
'''
from langchain.document_loaders import DirectoryLoader, TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings


# Data is loaded from the FAQ folder.


def create_store():
    # Loads FAQ directory from the current directory then glob takes all the .txt files from the directory.
    loader = DirectoryLoader(
        "./FAQ", glob="**/*.txt", loader_cls=TextLoader, show_progress=True
    )
    docs = loader.load()

    # Splits the text into chunks recursively which is used to create the embeddings (vectors).
    text_splitter = RecursiveCharacterTextSplitter(
        # If a document is longer than chunk_size, it will be split into multiple chunks.
        chunk_size=200,
        # overlap_size=50 # The overlap_size is the number of characters that will be shared between chunks.
        # The overlap_size is the number of characters that will be shared between chunks.
        chunk_overlap=50
    )

    documents = text_splitter.split_documents(docs)
    # embeddings would be responsible for embedding the text into vectors.
    embeddings = OpenAIEmbeddings(
        openai_api_key=os.environ.get("OPENAI_API_KEY"))

    # vectorstore is responsible for storing the vectors.
    vectorstore = FAISS.from_documents(documents, embeddings)

    # opens the vectorstore.pickle file in write binary mode and dumps the vectorstore object into it.
    with open("vectorstore.pkl", "wb") as f:
        pickle.dump(vectorstore, f)


def get_vectorstore():
    # opens the vectorstore.pickle file in read binary mode and loads the vectorstore object from it.
    with open("vectorstore.pkl", "rb") as f:
        vectorstore = pickle.load(f)
    return vectorstore
