from flask import Flask
from flask import render_template
app = Flask(__name__)

#app.route("/")
def index():
	return render_template('index.html')
app.add_url_rule('/', None, index)

if __name__ == "__main__":
	app.run()

