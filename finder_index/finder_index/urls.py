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
from django.urls import path
from user import views
from core.views import index
from user.views import users, accountCreate, login
from hotel.views import hotels

urlpatterns = [
    path('api/users/', users, name="users"),
    path('api/hotels', hotels, name="hotels"),
    path('api/signup/', accountCreate, name="accountCreate"),
    path('api/login/', login, name="login"),
    path("", index, name="index")
]