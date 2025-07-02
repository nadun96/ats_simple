from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

@app.route('/jobs')
def jobs():
    return render_template('jobs.html')

@app.route('/candidates')
def candidates():
    return render_template('candidates.html')

if __name__ == '__main__':
    app.run(debug=True)