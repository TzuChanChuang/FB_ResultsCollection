from flask import Flask
from flask import render_template
app = Flask(__name__)

@app.route("/")
def index():
	return render_template('index.html')
@app.route("/publish/")
def publish():
	return render_template('publish.html')
@app.route("/results/")
def results():
	return render_template('results.html')
if __name__ == "__main__":
	app.run()

