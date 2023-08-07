# Replicate the project locally

- **Step 1**: Clone the [repo](https://github.com/samsoncn/theguide)
- **Step 2**: Add dev branch using `git branch dev` and then switch to dev branch using `git checkout dev`
- **Step 3**: Pull the latest information from dev branch using `git pull origin dev`
- **Step 4**: install dependencies using `npm i` 
- **Step 5**: install python dependencies using `pip install -r ./requirements.txt` saved inside `/api` directory 

## For older version (works with both frontend and backend)
- **Step 6**: run the program using `npm run dev` in the root folder - runs both frontend and server 
- **Step 7**: go to `localhost:3000` to view the website 

## For newer version (works with backend only)
- **Step 6**: got to `api/app` in your terminal.
- **Step 7**: run the program using `uvicorn app:app --reload` in the `api/app` directory - runs only the backend
- **Step 8**: go to `http://127.0.0.1:8000/docs` to view the server side.

# Questions to test out the bot

## With older version:
- What tasks can you perform?
- can you help me with physics doubt?
- explain 3 laws of motion with suitable examples

## With newer (server-side) version:
- Topic: `Statistics`
- What tasks can you perform?
- What is hypothesis testing?
- How do I calculate the median of a data set? (from `statistics.txt`)

## Important Note
**The bot is only able to answers based on statistics for now, Subject tab in sidebar is a placeholder for now. We are working on adding the features to pick subjects and choose response based on that.**
