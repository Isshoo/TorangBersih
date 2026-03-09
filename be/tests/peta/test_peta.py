"""
Peta API tests.
"""
import pytest

from app.config.extensions import db
from app.database.models import Kolaborator, Aset, LaporanSampahIlegal, MarketplaceDaurUlang


class TestGetMarkers:
    """Tests for peta markers endpoint."""

    def test_get_all_markers(self, client, test_kolaborator, test_aset, test_laporan, test_marketplace_item, app):
        """Test getting all markers (no filter)."""
        # Ensure test data has coordinates
        with app.app_context():
            kolaborator = db.session.get(Kolaborator, test_kolaborator.id)
            kolaborator.latitude = -6.9175
            kolaborator.longitude = 107.6191

            aset = db.session.get(Aset, test_aset.id)
            aset.latitude = -6.8973
            aset.longitude = 107.6059

            marketplace = db.session.get(MarketplaceDaurUlang, test_marketplace_item.id)
            marketplace.latitude = -6.9200
            marketplace.longitude = 107.6100

            db.session.commit()

        response = client.get('/api/peta/markers')

        assert response.status_code == 200
        data = response.get_json()
        assert data['success'] is True
        markers = data['data']
        assert isinstance(markers, list)

        # Should have at least markers from our fixtures
        types_found = set(m['type'] for m in markers)
        # Kolaborator, Aset, Laporan all have lat/lng in fixtures
        assert 'Laporan Sampah' in types_found  # test_laporan fixture has lat/lng

    def test_markers_response_format(self, client, test_laporan):
        """Test that each marker has the expected fields."""
        response = client.get('/api/peta/markers')

        assert response.status_code == 200
        markers = response.get_json()['data']
        if markers:
            marker = markers[0]
            assert 'id' in marker
            assert 'name' in marker
            assert 'lat' in marker
            assert 'lng' in marker
            assert 'type' in marker
            assert 'status' in marker
            assert 'detail' in marker

    def test_markers_filter_by_type(self, client, test_laporan):
        """Test filtering markers by type."""
        response = client.get('/api/peta/markers?types=Laporan Sampah')

        assert response.status_code == 200
        markers = response.get_json()['data']
        for marker in markers:
            assert marker['type'] == 'Laporan Sampah'

    def test_markers_no_data_returns_empty(self, client):
        """Test markers returns empty list when no data with coords exists."""
        response = client.get('/api/peta/markers?types=NonExistentType')

        assert response.status_code == 200
        markers = response.get_json()['data']
        assert markers == []

    def test_markers_is_public(self, client, test_laporan):
        """Test that peta markers endpoint is public (no auth required)."""
        response = client.get('/api/peta/markers')
        assert response.status_code == 200
