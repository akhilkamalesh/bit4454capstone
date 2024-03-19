from flask import Flask, render_template

app = Flask(__name__, template_folder='pages')

@app.route('/')
def index():
    return render_template('login.html')

@app.route('/recalls')
def recalls():
    return render_template('total-recalls.html')

@app.route('/recalls/details')
def recall_details():
    return render_template('recall-details.html')

if __name__ == '__main__':
    app.run(debug=True)