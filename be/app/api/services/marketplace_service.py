"""Marketplace service - Business logic for marketplace daur ulang"""
from sqlalchemy import or_

from app.config.extensions import db
from app.database.models import (
    MarketplaceDaurUlang, KondisiBarang, StatusKetersediaan, RefKategoriBarang
)
from app.utils.exceptions import NotFoundError, ForbiddenError


class MarketplaceService:

    @staticmethod
    def get_all(page=1, per_page=20, search=None, kategori_barang_id=None,
                kondisi=None, status_ketersediaan=None, id_penjual=None,
                sort_by='created_at', sort_order='desc'):
        query = MarketplaceDaurUlang.query

        if search:
            query = query.filter(
                or_(
                    MarketplaceDaurUlang.nama_barang.ilike(f'%{search}%'),
                    MarketplaceDaurUlang.deskripsi_barang.ilike(f'%{search}%'),
                )
            )

        if kategori_barang_id:
            query = query.filter_by(kategori_barang_id=kategori_barang_id)

        if kondisi:
            query = query.filter_by(kondisi=KondisiBarang(kondisi))

        if status_ketersediaan:
            query = query.filter_by(status_ketersediaan=StatusKetersediaan(status_ketersediaan))

        if id_penjual:
            query = query.filter_by(id_penjual=id_penjual)

        sort_column = getattr(MarketplaceDaurUlang, sort_by, MarketplaceDaurUlang.created_at)
        if sort_order == 'asc':
            query = query.order_by(sort_column.asc())
        else:
            query = query.order_by(sort_column.desc())

        total = query.count()
        items = query.offset((page - 1) * per_page).limit(per_page).all()
        return items, total

    @staticmethod
    def get_by_id(item_id):
        item = db.session.get(MarketplaceDaurUlang, item_id)
        if not item:
            raise NotFoundError("Barang tidak ditemukan")
        return item

    @staticmethod
    def create(user, data):
        ref = db.session.get(RefKategoriBarang, data['kategori_barang_id'])
        if not ref or not ref.is_active:
            raise NotFoundError("Kategori barang tidak valid")

        data['kondisi'] = KondisiBarang(data['kondisi'])

        item = MarketplaceDaurUlang(id_penjual=user.id, **data)
        db.session.add(item)
        db.session.commit()
        return item

    @staticmethod
    def update(item_id, user, data):
        item = db.session.get(MarketplaceDaurUlang, item_id)
        if not item:
            raise NotFoundError("Barang tidak ditemukan")

        if item.id_penjual != user.id and not user.is_admin:
            raise ForbiddenError("Tidak memiliki akses untuk mengubah barang ini")

        if 'kategori_barang_id' in data:
            ref = db.session.get(RefKategoriBarang, data['kategori_barang_id'])
            if not ref or not ref.is_active:
                raise NotFoundError("Kategori barang tidak valid")

        if 'kondisi' in data:
            data['kondisi'] = KondisiBarang(data['kondisi'])

        if 'status_ketersediaan' in data:
            data['status_ketersediaan'] = StatusKetersediaan(data['status_ketersediaan'])

        for key, value in data.items():
            setattr(item, key, value)

        db.session.commit()
        return item

    @staticmethod
    def delete(item_id, user):
        item = db.session.get(MarketplaceDaurUlang, item_id)
        if not item:
            raise NotFoundError("Barang tidak ditemukan")

        if item.id_penjual != user.id and not user.is_admin:
            raise ForbiddenError("Tidak memiliki akses untuk menghapus barang ini")

        db.session.delete(item)
        db.session.commit()

    @staticmethod
    def get_my_marketplace(user_id, page=1, per_page=20, search=None, kategori_barang_id=None,
                kondisi=None, status_ketersediaan=None, sort_by='created_at', sort_order='desc'):
        query = MarketplaceDaurUlang.query.filter_by(id_penjual=user_id)

        if search:
            query = query.filter(
                or_(
                    MarketplaceDaurUlang.nama_barang.ilike(f'%{search}%'),
                    MarketplaceDaurUlang.deskripsi_barang.ilike(f'%{search}%'),
                )
            )

        if kategori_barang_id:
            query = query.filter_by(kategori_barang_id=kategori_barang_id)

        if kondisi:
            query = query.filter_by(kondisi=KondisiBarang(kondisi))

        if status_ketersediaan:
            query = query.filter_by(status_ketersediaan=StatusKetersediaan(status_ketersediaan))

        sort_column = getattr(MarketplaceDaurUlang, sort_by, MarketplaceDaurUlang.created_at)
        if sort_order == 'asc':
            query = query.order_by(sort_column.asc())
        else:
            query = query.order_by(sort_column.desc())

        total = query.count()
        items = query.offset((page - 1) * per_page).limit(per_page).all()
        return items, total