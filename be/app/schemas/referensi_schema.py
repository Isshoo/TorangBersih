"""Referensi validation schemas"""
from marshmallow import Schema, fields, validate


class ReferensiCreateSchema(Schema):
    nama = fields.String(required=True, validate=validate.Length(min=1, max=100))


class ReferensiUpdateSchema(Schema):
    nama = fields.String(validate=validate.Length(min=1, max=100))
    is_active = fields.Boolean()
