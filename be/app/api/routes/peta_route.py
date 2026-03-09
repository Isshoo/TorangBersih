"""Peta routes"""
from flask import Blueprint
from app.api.controllers import peta_controller

peta_bp = Blueprint('peta', __name__, url_prefix='/api/peta')

@peta_bp.route('/markers', methods=['GET'])
def get_markers():
    return peta_controller.get_markers()
