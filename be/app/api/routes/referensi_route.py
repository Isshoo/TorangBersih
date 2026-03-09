"""Referensi routes - Reference/lookup table endpoints"""
from flask import Blueprint
from app.api.controllers import referensi_controller

referensi_bp = Blueprint('referensi', __name__, url_prefix='/api/referensi')


@referensi_bp.route('/<tipe>', methods=['GET'])
def get_all(tipe):
    return referensi_controller.get_all(tipe)


@referensi_bp.route('/<tipe>', methods=['POST'])
def create(tipe):
    return referensi_controller.create(tipe)


@referensi_bp.route('/<tipe>/<item_id>', methods=['PUT', 'PATCH'])
def update(tipe, item_id):
    return referensi_controller.update(tipe, item_id)


@referensi_bp.route('/<tipe>/<item_id>', methods=['DELETE'])
def delete(tipe, item_id):
    return referensi_controller.delete(tipe, item_id)
