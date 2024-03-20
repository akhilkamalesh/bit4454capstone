from flask import Flask, render_template, request
from dbconnection import authenticate

app = Flask(__name__, template_folder='pages')

@app.route('/')
def index():
    return render_template('login.html')

@app.route('/', methods=['POST'])
def submit():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        if authenticate(username, password) == 'Manager':
            return recalls()
        elif authenticate(username, password) == 'Inspector':
            return recalls()
        else:
            return index()

@app.route('/recalls')
def recalls():
    return render_template('total-recalls.html')

@app.route('/recalls/details')
def recall_details():
    return render_template('recall-details.html')

if __name__ == '__main__':
    app.run(debug=True)