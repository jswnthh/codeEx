from django.urls import path
from .views import index, process_code  # Ensure process_code is imported

urlpatterns = [
    path('', index, name='index'),
    path('process_code/', process_code, name='process_code'),
]