"""djProj URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
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
from django.contrib import admin
from django.urls import path

from mySite.views import welcome, summaryStats, domainDetail, userDetail , domainsList, about, joinUs, addOrUpdate

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', summaryStats),
    path('about', about),
    path('joinUs', joinUs),
    path('domains/<int:id>', domainDetail),
    path('users/<int:id>', userDetail),
    path('domainList', domainsList),
    path('addOrUpdate', addOrUpdate)

]
