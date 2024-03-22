from flask import Flask, render_template, request, url_for, redirect, jsonify
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
            return priority_recalls()
        else:
            return index()

@app.route('/recalls', methods=['GET'])
def recalls():
    recalls_data = load_recalls()
    return render_template('recalls-table.html', data=recalls_data)

@app.route('/priority-recalls', methods=['GET'])
def priority_recalls():
    recalls_data = load_recalls(priority=True)
    return render_template('priority-recalls.html', data=recalls_data)

@app.route('/recalls/details')
def recall_details():
    return render_template('recall-details.html')

@app.route('/recalls/select-priority', methods=['POST'])
def select_priority():
    selected_recalls = request.json.get('ids')
    data = prioritize_recalls(selected_recalls)
    return jsonify(data)

@app.route('/recalls/load-table', methods=['GET'])
def recalls_load_table():
    recalls_data = load_recalls()
    return jsonify(recalls_data)

if __name__ == '__main__':
    app.run(debug=True)