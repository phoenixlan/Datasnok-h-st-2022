from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello_geek():
    return '<h1>Hello from Flask & Docker</h2>'

@app.route('/', methods = ['POST'])
def update_text():
    return 'PHEONIX{h77p_m370d32_32_5745}'



if __name__ == "__main__":
    app.run(debug=True)
