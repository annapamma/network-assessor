from flask import Flask, render_template, request, jsonify
from flask_cors import cross_origin

app = Flask(__name__)

app = Flask(__name__,
            static_folder="../network-assessor-fe/dist/assets",
            template_folder="../network-assessor-fe/dist")


@app.route('/', methods=['GET'])
def landing_page():
    return render_template('index.html')


@app.route('/api/submit-genes', methods=['POST'])
@cross_origin()
def submit_genes():
    data = request.get_json()
    return jsonify({'genes': data['genes']})
