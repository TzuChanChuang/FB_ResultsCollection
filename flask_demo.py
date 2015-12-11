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
@app.route('/result/<ques_id>')
def result_view(ques_id=None):
    return render_template('results_content.html', ques_id=ques_id)
if __name__ == "__main__":
	app.run()

