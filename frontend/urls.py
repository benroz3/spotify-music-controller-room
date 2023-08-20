from django.urls import path
from .views import index

app_name = 'frontend'

urlpatterns = [
    path('', index, name=''),
    path('join', index, name=''),
    path('create', index, name=''),
    path('room/<str:code>', index, name=''),
]
