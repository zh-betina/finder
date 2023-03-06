"""finder_index URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path, include
from rest_framework import routers
from user import views
from core.views import index
from user.views import users, account
from hotel.views import hotels

#router = routers.DefaultRouter()
#router.register(r'users', views.UserView, 'user')

urlpatterns = [
    #path('api/', include(router.urls)),
    path('api/users/', users, name="users"),
    path('api/hotels', hotels, name="hotels"),
    path('api/account/', account, name="account"),
    path("", index, name="index")
]