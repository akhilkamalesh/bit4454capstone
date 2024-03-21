from flask import Flask, render_template, request, url_for, redirect
from dbconnection import authenticate, load_recalls, prioritize_recalls

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

@app.route('/recalls', methods=['GET'])
def recalls():
    recalls_data = load_recalls()
    return render_template('total-recalls.html', data=recalls_data)

@app.route('/recalls/details')
def recall_details():
    return render_template('recall-details.html')

@app.route('/recalls/details', methods=['POST', 'GET'])
def prior_recalls():
    selected_recalls = request.form.getlist('checkedRecallIDs')
    prioritize_recalls(selected_recalls)
    return redirect(url_for('recalls'))

if __name__ == '__main__':
    app.run(debug=True)