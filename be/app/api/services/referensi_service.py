"""Referensi service - Generic business logic for all reference/lookup tables"""
from app.config.extensions import db
from app.utils.exceptions import NotFoundError, ConflictError


class ReferensiService:

    @staticmethod
    def get_all(model, include_inactive=False):
        query = model.query
        if not include_inactive:
            query = query.filter_by(is_active=True)
        return query.order_by(model.nama.asc()).all()

    @staticmethod
    def get_by_id(model, item_id):
        item = db.session.get(model, item_id)
        if not item:
            raise NotFoundError("Data referensi tidak ditemukan")
        return item

    @staticmethod
    def create(model, data):
        # Check duplicate name
        existing = model.query.filter(
            db.func.lower(model.nama) == data['nama'].strip().lower()
        ).first()
        if existing:
            raise ConflictError(f"'{data['nama']}' sudah ada")

        item = model(nama=data['nama'].strip())
        db.session.add(item)
        db.session.commit()
        return item

    @staticmethod
    def update(model, item_id, data):
        item = db.session.get(model, item_id)
        if not item:
            raise NotFoundError("Data referensi tidak ditemukan")

        if 'nama' in data and data['nama'] is not None:
            # Check duplicate name (exclude current item)
            existing = model.query.filter(
                db.func.lower(model.nama) == data['nama'].strip().lower(),
                model.id != item_id
            ).first()
            if existing:
                raise ConflictError(f"'{data['nama']}' sudah ada")
            item.nama = data['nama'].strip()

        if 'is_active' in data and data['is_active'] is not None:
            item.is_active = data['is_active']

        db.session.commit()
        return item

    @staticmethod
    def delete(model, item_id):
        """Soft delete - set is_active to False"""
        item = db.session.get(model, item_id)
        if not item:
            raise NotFoundError("Data referensi tidak ditemukan")

        item.is_active = False
        db.session.commit()
        return item
