from flask import Flask, render_template, request, jsonify
from flask_cors import cross_origin

app = Flask(__name__)

app = Flask(__name__,
            static_folder="../network-assessor-fe/dist/assets",
            template_folder="../network-assessor-fe/dist")

@app.route('/', methods=['GET'], defaults={'path': ''})
@app.route('/<path:path>', methods=['GET'])
def spa_index(path):
    return render_template('index.html')


@app.route('/api/submit-genes', methods=['POST'])
@cross_origin()
def submit_genes():
    """
    input: json data object
        {
            "genes": [
                "sdsdf"
            ]
        }

    output: json of nodes and edges
        const fixtureNodes = [
            {
                id: 1,
                label: 'Node 1',
                shape: 'circle',
                pathways: ['A-1', 'A-5', 'A-3'],
                color: '#2B7CE9' 
            }, 
            {
                id: 2,
                label: 'Node 2',
                shape: 'circle',
                pathways: ['A-2', 'A-3'],
                color: '#2B7CE9',
            },
            {
                id: 3,
                label: 'Node 3',
                shape: 'circle',
                pathways: ['A-3'],
                color: '#2B7CE9',
            },
        ]

        const fixtureEdges = [
            { from: 1, to: 3 , color: '#848484'},
        ]
    """
    data = request.get_json()

    fixtureNodes = [
        {
            'id': 1,
            'label': 'Node 1',
            'shape': 'circle',
            'pathways': ['1'],
            'color': '#2B7CE9' 
        }, 
        {
            'id': 2,
            'label': 'Node 2',
            'shape': 'circle',
            'pathways': ['2', '3'],
            'color': '#2B7CE9',
        },
        {
            'id': 3,
            'label': 'Node 3',
            'shape': 'circle',
            'pathways': ['3'],
            'color': '#2B7CE9',
        },
    ]

    fixtureEdges = [
        { 'from': 1, 'to': 3 , 'color': '#848484'},
    ]

    return jsonify({'nodes': fixtureNodes, 'edges': fixtureEdges})
