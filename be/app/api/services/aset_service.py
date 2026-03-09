"""Aset service - Business logic for aset"""
from sqlalchemy import or_

from app.config.extensions import db
from app.database.models import Aset, RefKategoriAset
from app.utils.exceptions import NotFoundError, ForbiddenError


class AsetService:

    @staticmethod
    def get_all(page=1, per_page=20, search=None, kategori_aset_id=None,
                kabupaten_kota=None, status_aktif=None, sort_by='created_at', sort_order='desc'):
        query = Aset.query

        if search:
            query = query.filter(
                or_(
                    Aset.nama_aset.ilike(f'%{search}%'),
                    Aset.alamat_lengkap.ilike(f'%{search}%'),
                )
            )

        if kategori_aset_id:
            query = query.filter_by(kategori_aset_id=kategori_aset_id)

        if kabupaten_kota:
            query = query.filter(Aset.kabupaten_kota.ilike(f'%{kabupaten_kota}%'))

        if status_aktif is not None:
            query = query.filter_by(status_aktif=status_aktif)

        # Sorting
        sort_column = getattr(Aset, sort_by, Aset.created_at)
        if sort_order == 'asc':
            query = query.order_by(sort_column.asc())
        else:
            query = query.order_by(sort_column.desc())

        total = query.count()
        items = query.offset((page - 1) * per_page).limit(per_page).all()

        return items, total

    @staticmethod
    def get_by_id(item_id):
        item = db.session.get(Aset, item_id)
        if not item:
            raise NotFoundError("Aset tidak ditemukan")
        return item

    @staticmethod
    def create(user, data):
        ref = db.session.get(RefKategoriAset, data['kategori_aset_id'])
        if not ref or not ref.is_active:
            raise NotFoundError("Kategori aset tidak valid")

        item = Aset(id_user=user.id, **data)
        db.session.add(item)
        db.session.commit()
        return item

    @staticmethod
    def update(item_id, user, data):
        item = db.session.get(Aset, item_id)
        if not item:
            raise NotFoundError("Aset tidak ditemukan")

        if item.id_user != user.id and not user.is_admin:
            raise ForbiddenError("Tidak memiliki akses untuk mengubah aset ini")

        if 'kategori_aset_id' in data:
            ref = db.session.get(RefKategoriAset, data['kategori_aset_id'])
            if not ref or not ref.is_active:
                raise NotFoundError("Kategori aset tidak valid")

        for key, value in data.items():
            setattr(item, key, value)

        db.session.commit()
        return item

    @staticmethod
    def delete(item_id, user):
        item = db.session.get(Aset, item_id)
        if not item:
            raise NotFoundError("Aset tidak ditemukan")

        if item.id_user != user.id and not user.is_admin:
            raise ForbiddenError("Tidak memiliki akses untuk menghapus aset ini")

        db.session.delete(item)
        db.session.commit()


    @staticmethod
    def get_my_aset(user_id, page=1, per_page=20, search=None, kategori_aset_id=None,
                kabupaten_kota=None, status_aktif=None, sort_by='created_at', sort_order='desc'):
        query = Aset.query.filter_by(id_user=user_id)

        if search:
            query = query.filter(
                or_(
                    Aset.nama_aset.ilike(f'%{search}%'),
                    Aset.alamat_lengkap.ilike(f'%{search}%'),
                )
            )

        if kategori_aset_id:
            query = query.filter_by(kategori_aset_id=kategori_aset_id)

        if kabupaten_kota:
            query = query.filter(Aset.kabupaten_kota.ilike(f'%{kabupaten_kota}%'))

        if status_aktif is not None:
            query = query.filter_by(status_aktif=status_aktif)

        # Sorting
        sort_column = getattr(Aset, sort_by, Aset.created_at)
        if sort_order == 'asc':
            query = query.order_by(sort_column.asc())
        else:
            query = query.order_by(sort_column.desc())

        total = query.count()
        items = query.offset((page - 1) * per_page).limit(per_page).all()

        return items, total
