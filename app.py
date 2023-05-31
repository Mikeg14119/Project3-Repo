import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, Table
from flask import Flask, jsonify
import os


#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///ReplayReview.db")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(autoload_with=engine)

print(Base.classes.keys())

# Save reference to the table
metadata = Base.metadata

definitive_angles_table = Table('definitive_angles', metadata, autoload=True, autoload_with=engine)
play_information_table = Table('play_information', metadata, autoload=True, autoload_with=engine)
replay_review_information_table = Table('replay_review_information', metadata, autoload=True, autoload_with=engine)
review_outcome_information_table = Table('review_outcome_information', metadata, autoload=True, autoload_with=engine)
umpire_time_information_table = Table('umpire_time_information', metadata, autoload=True, autoload_with=engine)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Flask Routes
#################################################

@app.route('/definitive_angles', methods=['GET'])
def get_definitive_angles():
    session = Session(engine)
    results = session.query(definitive_angles_table).all()
    session.close()
    
    # Convert the results to a list of dictionaries
    definitive_angles_list = [row._asdict() for row in results]
    
    return jsonify(definitive_angles_list)


@app.route('/play_information', methods=['GET'])
def get_play_information():
    session = Session(engine)
    results = session.query(play_information_table).all()
    session.close()
    
    # Convert the results to a list of dictionaries
    play_information_list = [row._asdict() for row in results]
    
    return jsonify(play_information_list)


@app.route('/replay_review_information', methods=['GET'])
def get_replay_review_information():
    session = Session(engine)
    results = session.query(replay_review_information_table).all()
    session.close()

    # Convert the results to a list of dictionaries
    replay_review_information_list = [row._asdict() for row in results]
    
    return jsonify(replay_review_information_list)


@app.route('/review_outcome_information', methods=['GET'])
def get_review_outcome_information():
    session = Session(engine)
    results = session.query(review_outcome_information_table).all()
    session.close()
    
    # Convert the results to a list of dictionaries
    review_outcome_information_list = [row._asdict() for row in results]
    
    return jsonify(review_outcome_information_list)


@app.route('/umpire_time_information', methods=['GET'])
def get_umpire_time_information():
    session = Session(engine)
    results = session.query(umpire_time_information_table).all()
    session.close()
    
    # Convert the results to a list of dictionaries
    umpire_time_information_list = [row._asdict() for row in results]
    
    return jsonify(umpire_time_information_list)

if __name__ == '__main__':
    app.run()