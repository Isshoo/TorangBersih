"""Marketplace controller - Request handlers for marketplace endpoints"""
from flask import request
from marshmallow import ValidationError

from app.api.services.marketplace_service import MarketplaceService
from app.schemas.marketplace_schema import (
    MarketplaceCreateSchema, MarketplaceUpdateSchema, MarketplaceQuerySchema, MyMarketplaceQuerySchema
)
from app.middlewares.auth_middleware import jwt_required_custom
from app.utils.response import success_response, error_response, paginated_response


def get_all():
    try:
        params = MarketplaceQuerySchema().load(request.args)
    except ValidationError as err:
        return error_response(
            message="Validasi gagal",
            errors=[{"field": k, "message": v[0]} for k, v in err.messages.items()],
            status_code=422
        )

    items, total = MarketplaceService.get_all(**params)

    return paginated_response(
        data=[item.to_dict() for item in items],
        total=total,
        page=params.get('page', 1),
        per_page=params.get('per_page', 20),
        message="Daftar barang berhasil diambil"
    )


def get_one(item_id):
    item = MarketplaceService.get_by_id(item_id)
    return success_response(data=item.to_dict(), message="Detail barang berhasil diambil")


@jwt_required_custom
def create():
    try:
        data = MarketplaceCreateSchema().load(request.get_json() or {})
    except ValidationError as err:
        return error_response(
            message="Validasi gagal",
            errors=[{"field": k, "message": v[0]} for k, v in err.messages.items()],
            status_code=422
        )

    item = MarketplaceService.create(request.current_user, data)
    return success_response(data=item.to_dict(), message="Barang berhasil ditambahkan", status_code=201)


@jwt_required_custom
def update(item_id):
    try:
        data = MarketplaceUpdateSchema().load(request.get_json() or {})
    except ValidationError as err:
        return error_response(
            message="Validasi gagal",
            errors=[{"field": k, "message": v[0]} for k, v in err.messages.items()],
            status_code=422
        )

    update_data = {k: v for k, v in data.items() if v is not None}
    if not update_data:
        return error_response(message="Tidak ada data yang diubah", status_code=400)

    item = MarketplaceService.update(item_id, request.current_user, update_data)
    return success_response(data=item.to_dict(), message="Barang berhasil diperbarui")


@jwt_required_custom
def delete(item_id):
    MarketplaceService.delete(item_id, request.current_user)
    return success_response(message="Barang berhasil dihapus")


@jwt_required_custom
def my_marketplace():
    try:
        params = MyMarketplaceQuerySchema().load(request.args)
    except ValidationError as err:
        return error_response(
            message="Validasi gagal",
            errors=[{"field": k, "message": v[0]} for k, v in err.messages.items()],
            status_code=422
        )

    items, total = MarketplaceService.get_my_marketplace(request.current_user.id, **params)

    return paginated_response(
        data=[item.to_dict() for item in items],
        total=total,
        page=params.get('page', 1),
        per_page=params.get('per_page', 20),
        message="Daftar barang saya berhasil diambil"
    )