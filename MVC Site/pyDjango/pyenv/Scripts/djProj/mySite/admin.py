from django.contrib import admin

from mySite.models import Domain, Endpoint, User

# Register your models here.
admin.site.register(Domain)
admin.site.register(Endpoint)
admin.site.register(User)