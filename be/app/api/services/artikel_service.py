"""Artikel service - Business logic for artikel"""
import re
import uuid
from sqlalchemy import or_

from app.config.extensions import db
from app.database.models import Artikel, StatusPublikasi
from app.utils.exceptions import NotFoundError, ForbiddenError

class ArtikelService:
    @staticmethod
    def get_all(page=1, per_page=20, search=None, sort_by='created_at', sort_order='desc'):
        query = Artikel.query

        if search:
            query = query.filter(
                or_(
                    Artikel.judul_artikel.ilike(f'%{search}%'),
                    Artikel.konten_teks.ilike(f'%{search}%'),
                )
            )

        # Sorting logic
        sort_column = getattr(Artikel, sort_by, Artikel.created_at)
        if sort_order == 'asc':
            query = query.order_by(sort_column.asc())
        else:
            query = query.order_by(sort_column.desc())

        # Pagination logic
        total = query.count()
        items = query.offset((page - 1) * per_page).limit(per_page).all()

        return items, total

    @staticmethod
    def get_by_id(item_id):
        item = db.session.get(Artikel, item_id)
        if not item:
            raise NotFoundError("Artikel tidak ditemukan")
        return item

    @staticmethod
    def create(user, data):
        # Auto-generate slug jika tidak ada
        if not data.get('slug'):
            base_slug = re.sub(r'[^a-zA-Z0-9]+', '-', data['judul_artikel'].lower()).strip('-')
            data['slug'] = f"{base_slug}-{str(uuid.uuid4())[:8]}"

        # Handle Enum conversion (String to Python Enum)
        if 'status_publikasi' in data and isinstance(data['status_publikasi'], str):
            try:
                data['status_publikasi'] = StatusPublikasi(data['status_publikasi'].lower())
            except ValueError:
                data['status_publikasi'] = StatusPublikasi.DRAFT

        item = Artikel(id_penulis=user.id, **data)
        db.session.add(item)
        db.session.commit()
        return item

    @staticmethod
    def update(item_id, user, data):
        item = db.session.get(Artikel, item_id)
        if not item:
            raise NotFoundError("Artikel tidak ditemukan")

        # Otorisasi: Hanya pemilik atau Admin yang bisa update
        if item.id_penulis != user.id and not getattr(user, 'is_admin', False):
            raise ForbiddenError("Tidak memiliki akses untuk mengubah artikel ini")

        for key, value in data.items():
            # Handle Enum conversion khusus status_publikasi
            if key == 'status_publikasi' and isinstance(value, str):
                try:
                    value = StatusPublikasi(value.lower())
                except ValueError:
                    continue
            setattr(item, key, value)

        db.session.commit()
        return item

    @staticmethod
    def delete(item_id, user):
        item = db.session.get(Artikel, item_id)
        if not item:
            raise NotFoundError("Artikel tidak ditemukan")

        # Otorisasi: Hanya pemilik atau Admin yang bisa hapus
        if item.id_penulis != user.id and not getattr(user, 'is_admin', False):
            raise ForbiddenError("Tidak memiliki akses untuk menghapus artikel ini")

        db.session.delete(item)
        db.session.commit()

    @staticmethod
    def get_my_artikel(user_id, page=1, per_page=20, search=None, sort_by='created_at', sort_order='desc'):
        query = Artikel.query.filter_by(id_penulis=user_id)

        if search:
            query = query.filter(
                or_(
                    Artikel.judul_artikel.ilike(f'%{search}%'),
                    Artikel.konten_teks.ilike(f'%{search}%'),
                )
            )

        sort_column = getattr(Artikel, sort_by, Artikel.created_at)
        query = query.order_by(sort_column.asc() if sort_order == 'asc' else sort_column.desc())

        total = query.count()
        items = query.offset((page - 1) * per_page).limit(per_page).all()

        return items, total