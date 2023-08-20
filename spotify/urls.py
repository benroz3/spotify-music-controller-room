from django.urls import path
from .views import *


urlpatterns = [
    path('get-auth-url', AuthURL.as_view(), name='spotify'),
    path('redirect', spotify_callback, name='spotify'),
    path('is-authenticated', IsAuthenticated.as_view(), name='spotify'),
    path('current-song', CurrentSong.as_view(), name='spotify'),
    path('pause', PauseSong.as_view(), name='spotify'),
    path('play', PlaySong.as_view(), name='spotify'),
    path('skip', SkipSong.as_view(), name='spotify'),
]
