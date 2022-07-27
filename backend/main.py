from platform import architecture
from flask import Flask
from flask_restful import Api, Resource, reqparse
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
api = Api(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db = SQLAlchemy(app)
db.create_all()

event_put_args = reqparse.RequestParser()
event_put_args.add_argument("name", type=str, help="Name of the event")
event_put_args.add_argument("description", type=str, help="Description of the event")
events = {}

class Event(Resource):
    def get(self, event_id):
        return events[event_id]
    
    def put(self, event_id):
        args = event_put_args.parse_args()
        events[event_id] = args
        return events[event_id], 201
    
    def delete(self, event_id):
        del events[event_id]
        return '', 204

api.add_resource(Event, "/event/<int:event_id>")

if __name__ == "__main__":
    app.run(debug=True)