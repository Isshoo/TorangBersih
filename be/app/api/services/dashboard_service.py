"""Dashboard service - Statistics for admin and user dashboards"""
from sqlalchemy import func

from app.config.extensions import db
from app.database.models import (
    Kolaborator, Aset, LaporanSampahIlegal, StatusLaporan,
    MarketplaceDaurUlang, StatusKetersediaan
)
from app.database.models.user import User


class DashboardService:

    @staticmethod
    def get_admin_stats():
        total_users = db.session.query(func.count(User.id)).scalar()
        total_kolaborator = db.session.query(func.count(Kolaborator.id)).scalar()
        total_aset = db.session.query(func.count(Aset.id)).scalar()
        total_laporan = db.session.query(func.count(LaporanSampahIlegal.id)).scalar()
        total_marketplace = db.session.query(func.count(MarketplaceDaurUlang.id)).scalar()

        # Laporan per status
        laporan_per_status = {}
        for status in StatusLaporan:
            count = db.session.query(func.count(LaporanSampahIlegal.id)).filter(
                LaporanSampahIlegal.status_laporan == status
            ).scalar()
            laporan_per_status[status.value] = count

        # Marketplace per status
        marketplace_per_status = {}
        for status in StatusKetersediaan:
            count = db.session.query(func.count(MarketplaceDaurUlang.id)).filter(
                MarketplaceDaurUlang.status_ketersediaan == status
            ).scalar()
            marketplace_per_status[status.value] = count

        # Recent items
        recent_laporan = LaporanSampahIlegal.query.order_by(
            LaporanSampahIlegal.created_at.desc()
        ).limit(5).all()

        recent_kolaborator = Kolaborator.query.order_by(
            Kolaborator.created_at.desc()
        ).limit(5).all()

        return {
            'total_users': total_users,
            'total_kolaborator': total_kolaborator,
            'total_aset': total_aset,
            'total_laporan': total_laporan,
            'total_marketplace': total_marketplace,
            'laporan_per_status': laporan_per_status,
            'marketplace_per_status': marketplace_per_status,
            'recent_laporan': [item.to_dict() for item in recent_laporan],
            'recent_kolaborator': [item.to_dict() for item in recent_kolaborator],
        }

    @staticmethod
    def get_user_stats(user_id):
        my_kolaborator = db.session.query(func.count(Kolaborator.id)).filter(
            Kolaborator.id_user == user_id
        ).scalar()
        my_aset = db.session.query(func.count(Aset.id)).filter(
            Aset.id_user == user_id
        ).scalar()
        my_laporan = db.session.query(func.count(LaporanSampahIlegal.id)).filter(
            LaporanSampahIlegal.id_warga == user_id
        ).scalar()
        my_marketplace = db.session.query(func.count(MarketplaceDaurUlang.id)).filter(
            MarketplaceDaurUlang.id_penjual == user_id
        ).scalar()

        # My laporan per status
        my_laporan_per_status = {}
        for status in StatusLaporan:
            count = db.session.query(func.count(LaporanSampahIlegal.id)).filter(
                LaporanSampahIlegal.id_warga == user_id,
                LaporanSampahIlegal.status_laporan == status
            ).scalar()
            my_laporan_per_status[status.value] = count

        # Recent activity
        recent_laporan = LaporanSampahIlegal.query.filter_by(
            id_warga=user_id
        ).order_by(
            LaporanSampahIlegal.created_at.desc()
        ).limit(5).all()

        return {
            'my_kolaborator': my_kolaborator,
            'my_aset': my_aset,
            'my_laporan': my_laporan,
            'my_marketplace': my_marketplace,
            'my_laporan_per_status': my_laporan_per_status,
            'recent_laporan': [item.to_dict() for item in recent_laporan],
        }
