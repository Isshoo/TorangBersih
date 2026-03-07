"""Tindak Lanjut Laporan database model"""
import uuid
from datetime import datetime, timezone

from app.config.extensions import db


class TindakLanjutLaporan(db.Model):
    __tablename__ = 'tindak_lanjut_laporan'

    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    id_laporan = db.Column(db.String(36), db.ForeignKey('laporan_sampah_ilegal.id'), nullable=False, index=True)

    tindak_lanjut_penanganan = db.Column(db.String(200), nullable=False)
    tim_penindak = db.Column(db.String(200))
    foto_tindakan_urls = db.Column(db.JSON)

    id_user_penindak = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False, index=True)

    catatan = db.Column(db.Text)

    waktu_tindak_lanjut = db.Column(db.DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)

    def __repr__(self):
        return f'<TindakLanjutLaporan {self.id}>'

    def to_dict(self):
        return {
            'id': self.id,
            'id_laporan': self.id_laporan,
            'tindak_lanjut_penanganan': self.tindak_lanjut_penanganan,
            'tim_penindak': self.tim_penindak,
            'foto_tindakan_urls': self.foto_tindakan_urls,
            'id_user_penindak': self.id_user_penindak,
            'catatan': self.catatan,
            'waktu_tindak_lanjut': self.waktu_tindak_lanjut.isoformat() if self.waktu_tindak_lanjut else None,
        }
