from rest_framework import permissions

class IsAdminOrSelf(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user and request.user.is_superuser:
            return True
        
        return request.user.is_authenticated and view.action in ['retrieve', 'update', 'partial_update', 'destroy', 'create']
    
    def has_object_permission(self, request, view, obj):
    
        if request.user and request.user.is_superuser:
            return True

        # Allow the user to access, update, and delete their own object
        if request.user and request.user.is_authenticated and obj == request.user:
            return True
            
        return False