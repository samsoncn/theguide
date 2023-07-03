from flask import Flask
app = Flask(__name__)

@app.route('/api/chat', methods=['GET'])
def hello_world():
    return "Hello, World!"

if __name__ == '__main__':
    app.run(port=5000, debug=True)