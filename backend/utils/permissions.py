from rest_framework import permissions
from rest_framework.generics import RetrieveAPIView, UpdateAPIView, ListAPIView, DestroyAPIView, CreateAPIView

class IsAdminOrSelf(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user and request.user.is_superuser:
            return True
        # Allow authenticated users for safe and modification methods
        if request.user.is_authenticated:
            if request.method in ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']:
                return True
        return False
    
    def has_object_permission(self, request, view, obj):
        if request.user and request.user.is_superuser:
            return True

        # Allow the user to access, update, and delete their own user object
        if request.user and request.user.is_authenticated:
            if obj == request.user:
                return True
            # If obj has a user attribute (e.g., Reservation), check ownership
            if hasattr(obj, 'user') and obj.user == request.user:
                return True
        return False