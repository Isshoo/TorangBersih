"""Aset controller - Request handlers for aset endpoints"""
from flask import request
from marshmallow import ValidationError

from app.api.services.aset_service import AsetService
from app.schemas.aset_schema import AsetCreateSchema, AsetUpdateSchema, AsetQuerySchema, AsetVerifySchema
from app.middlewares.auth_middleware import jwt_required_custom, admin_required
from app.utils.response import success_response, error_response, paginated_response


def get_all():
    try:
        params = AsetQuerySchema().load(request.args)
    except ValidationError as err:
        return error_response(
            message="Validasi gagal",
            errors=[{"field": k, "message": v[0]} for k, v in err.messages.items()],
            status_code=422
        )

    items, total = AsetService.get_all(
        page=params.get('page', 1),
        per_page=params.get('per_page', 20),
        search=params.get('search'),
        kategori_aset_id=params.get('kategori_aset_id'),
        kabupaten_kota=params.get('kabupaten_kota'),
        status_aktif=params.get('status_aktif'),
        sort_by=params.get('sort_by', 'created_at'),
        sort_order=params.get('sort_order', 'desc'),
    )

    return paginated_response(
        data=[item.to_dict() for item in items],
        total=total,
        page=params.get('page', 1),
        per_page=params.get('per_page', 20),
        message="Daftar aset berhasil diambil"
    )


def get_one(item_id):
    item = AsetService.get_by_id(item_id)
    return success_response(data=item.to_dict(), message="Detail aset berhasil diambil")


@jwt_required_custom
def create():
    try:
        data = AsetCreateSchema().load(request.get_json() or {})
    except ValidationError as err:
        return error_response(
            message="Validasi gagal",
            errors=[{"field": k, "message": v[0]} for k, v in err.messages.items()],
            status_code=422
        )

    item = AsetService.create(request.current_user, data)
    return success_response(data=item.to_dict(), message="Aset berhasil didaftarkan", status_code=201)


@jwt_required_custom
def update(item_id):
    try:
        data = AsetUpdateSchema().load(request.get_json() or {})
    except ValidationError as err:
        return error_response(
            message="Validasi gagal",
            errors=[{"field": k, "message": v[0]} for k, v in err.messages.items()],
            status_code=422
        )

    update_data = {k: v for k, v in data.items() if v is not None}
    if not update_data:
        return error_response(message="Tidak ada data yang diubah", status_code=400)

    item = AsetService.update(item_id, request.current_user, update_data)
    return success_response(data=item.to_dict(), message="Aset berhasil diperbarui")


@jwt_required_custom
def delete(item_id):
    AsetService.delete(item_id, request.current_user)
    return success_response(message="Aset berhasil dihapus")


@admin_required
def verify(item_id):
    try:
        data = AsetVerifySchema().load(request.get_json() or {})
    except ValidationError as err:
        return error_response(
            message="Validasi gagal",
            errors=[{"field": k, "message": v[0]} for k, v in err.messages.items()],
            status_code=422
        )

    item = AsetService.verify(
        item_id,
        admin_user=request.current_user,
        status_str=data['status_verifikasi'],
        catatan=data.get('catatan_verifikasi'),
    )
    return success_response(data=item.to_dict(), message="Status verifikasi aset berhasil diperbarui")


@jwt_required_custom
def my_aset():
    try:
        params = AsetQuerySchema().load(request.args)
    except ValidationError as err:
        return error_response(
            message="Validasi gagal",
            errors=[{"field": k, "message": v[0]} for k, v in err.messages.items()],
            status_code=422
        )

    items, total = AsetService.get_my_aset(
        request.current_user.id,
        page=params.get('page', 1),
        per_page=params.get('per_page', 20),
        search=params.get('search'),
        kategori_aset_id=params.get('kategori_aset_id'),
        kabupaten_kota=params.get('kabupaten_kota'),
        status_aktif=params.get('status_aktif'),
        sort_by=params.get('sort_by', 'created_at'),
        sort_order=params.get('sort_order', 'desc'),
    )

    return paginated_response(
        data=[item.to_dict() for item in items],
        total=total,
        page=params.get('page', 1),
        per_page=params.get('per_page', 20),
        message="Daftar aset saya berhasil diambil"
    )