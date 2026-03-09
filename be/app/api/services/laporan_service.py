"""Laporan service - Business logic for laporan & tindak lanjut"""
from sqlalchemy import or_

from app.config.extensions import db
from app.database.models import (
    LaporanSampahIlegal, StatusLaporan, Karakteristik, BentukTimbulan,
    TindakLanjutLaporan, RefJenisSampah
)
from app.utils.exceptions import NotFoundError, ForbiddenError


class LaporanService:

    @staticmethod
    def get_all(page=1, per_page=20, search=None, status_laporan=None,
                jenis_sampah_id=None, id_warga=None, sort_by='tanggal_lapor', sort_order='desc'):
        query = LaporanSampahIlegal.query

        if search:
            query = query.filter(
                LaporanSampahIlegal.alamat_lokasi.ilike(f'%{search}%')
            )

        if status_laporan:
            query = query.filter_by(status_laporan=StatusLaporan(status_laporan))

        if jenis_sampah_id:
            query = query.filter_by(jenis_sampah_id=jenis_sampah_id)

        if id_warga:
            query = query.filter_by(id_warga=id_warga)

        sort_column = getattr(LaporanSampahIlegal, sort_by, LaporanSampahIlegal.tanggal_lapor)
        if sort_order == 'asc':
            query = query.order_by(sort_column.asc())
        else:
            query = query.order_by(sort_column.desc())

        total = query.count()
        items = query.offset((page - 1) * per_page).limit(per_page).all()
        return items, total

    @staticmethod
    def get_by_id(item_id):
        item = db.session.get(LaporanSampahIlegal, item_id)
        if not item:
            raise NotFoundError("Laporan tidak ditemukan")
        return item

    @staticmethod
    def create(user, data):
        ref = db.session.get(RefJenisSampah, data['jenis_sampah_id'])
        if not ref or not ref.is_active:
            raise NotFoundError("Jenis sampah tidak valid")

        # Convert string enum values
        if 'karakteristik' in data and data['karakteristik']:
            data['karakteristik'] = Karakteristik(data['karakteristik'])
        if 'bentuk_timbulan' in data and data['bentuk_timbulan']:
            data['bentuk_timbulan'] = BentukTimbulan(data['bentuk_timbulan'])

        item = LaporanSampahIlegal(id_warga=user.id, **data)
        db.session.add(item)
        db.session.commit()
        return item

    @staticmethod
    def update_status(item_id, status_str):
        item = db.session.get(LaporanSampahIlegal, item_id)
        if not item:
            raise NotFoundError("Laporan tidak ditemukan")

        item.status_laporan = StatusLaporan(status_str)
        db.session.commit()
        return item

    @staticmethod
    def delete(item_id, user):
        item = db.session.get(LaporanSampahIlegal, item_id)
        if not item:
            raise NotFoundError("Laporan tidak ditemukan")

        if item.id_warga != user.id and not user.is_admin:
            raise ForbiddenError("Tidak memiliki akses untuk menghapus laporan ini")

        db.session.delete(item)
        db.session.commit()


class TindakLanjutService:

    @staticmethod
    def get_by_laporan(laporan_id):
        laporan = db.session.get(LaporanSampahIlegal, laporan_id)
        if not laporan:
            raise NotFoundError("Laporan tidak ditemukan")
        return TindakLanjutLaporan.query.filter_by(id_laporan=laporan_id)\
            .order_by(TindakLanjutLaporan.waktu_tindak_lanjut.desc()).all()

    @staticmethod
    def create(user, laporan_id, data):
        laporan = db.session.get(LaporanSampahIlegal, laporan_id)
        if not laporan:
            raise NotFoundError("Laporan tidak ditemukan")

        item = TindakLanjutLaporan(
            id_laporan=laporan_id,
            id_user_penindak=user.id,
            **data
        )
        db.session.add(item)
        db.session.commit()
        return item
