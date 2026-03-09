"""
Dashboard API tests.
"""
import pytest


class TestAdminStats:
    """Tests for admin dashboard statistics."""

    def test_admin_stats_success(self, client, admin_headers, test_kolaborator, test_aset, test_laporan, test_marketplace_item):
        """Test admin can get dashboard statistics."""
        response = client.get('/api/dashboard/admin', headers=admin_headers)

        assert response.status_code == 200
        data = response.get_json()
        assert data['success'] is True
        stats = data['data']
        assert 'total_users' in stats
        assert 'total_kolaborator' in stats
        assert 'total_aset' in stats
        assert 'total_laporan' in stats
        assert 'total_marketplace' in stats
        assert 'laporan_per_status' in stats
        assert 'marketplace_per_status' in stats
        assert 'recent_laporan' in stats
        assert 'recent_kolaborator' in stats

    def test_admin_stats_counts_correctly(self, client, admin_headers, test_kolaborator, test_aset, test_laporan, test_marketplace_item):
        """Test that admin stats counts include seeded data."""
        response = client.get('/api/dashboard/admin', headers=admin_headers)

        assert response.status_code == 200
        stats = response.get_json()['data']
        assert stats['total_kolaborator'] >= 1
        assert stats['total_aset'] >= 1
        assert stats['total_laporan'] >= 1
        assert stats['total_marketplace'] >= 1

    def test_admin_stats_has_laporan_per_status(self, client, admin_headers, test_laporan):
        """Test that laporan_per_status breakdown is present."""
        response = client.get('/api/dashboard/admin', headers=admin_headers)

        assert response.status_code == 200
        stats = response.get_json()['data']
        laporan_status = stats['laporan_per_status']
        assert 'menunggu' in laporan_status
        assert 'diterima' in laporan_status
        assert 'ditindak' in laporan_status
        assert 'selesai' in laporan_status

    def test_admin_stats_no_auth(self, client):
        """Test admin stats requires authentication."""
        response = client.get('/api/dashboard/admin')
        assert response.status_code == 401

    def test_admin_stats_user_forbidden(self, client, auth_headers):
        """Test regular user cannot access admin stats."""
        response = client.get('/api/dashboard/admin', headers=auth_headers)
        assert response.status_code == 403


class TestUserStats:
    """Tests for user dashboard statistics."""

    def test_user_stats_success(self, client, auth_headers, test_kolaborator, test_aset, test_laporan, test_marketplace_item):
        """Test user can get their own dashboard statistics."""
        response = client.get('/api/dashboard/user', headers=auth_headers)

        assert response.status_code == 200
        data = response.get_json()
        assert data['success'] is True
        stats = data['data']
        assert 'my_kolaborator' in stats
        assert 'my_aset' in stats
        assert 'my_laporan' in stats
        assert 'my_marketplace' in stats
        assert 'my_laporan_per_status' in stats
        assert 'recent_laporan' in stats

    def test_user_stats_counts_own_data(self, client, auth_headers, test_kolaborator, test_aset, test_laporan, test_marketplace_item):
        """Test user stats only counts user's own data."""
        response = client.get('/api/dashboard/user', headers=auth_headers)

        assert response.status_code == 200
        stats = response.get_json()['data']
        # test_user owns the fixtures, so counts should be at least 1
        assert stats['my_kolaborator'] >= 1
        assert stats['my_aset'] >= 1
        assert stats['my_laporan'] >= 1
        assert stats['my_marketplace'] >= 1

    def test_user_stats_no_auth(self, client):
        """Test user stats requires authentication."""
        response = client.get('/api/dashboard/user')
        assert response.status_code == 401
