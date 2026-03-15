"""Peta validation schemas"""
from marshmallow import Schema, fields, validate


class PetaQuerySchema(Schema):
    types = fields.String(required=False)