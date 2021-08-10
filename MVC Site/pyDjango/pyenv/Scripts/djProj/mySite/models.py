from django.db import models
from django.db.models.deletion import SET_DEFAULT

# Create your models here.
class Domain(models.Model):
     name = models.CharField(max_length=253)
     extension = models.CharField(max_length=50)
     discoveryDate = models.DateTimeField()

     def __str__(self):
          return self.name + self.extension

class User(models.Model):
     name = models.CharField(max_length=50)
     accountCreatedOn = models.DateTimeField()
     endpointsContributed = models.IntegerField

     def __str__(self):
         return self.name

class Endpoint(models.Model):
    path = models.CharField(max_length=2000)
    discoveryDate = models.DateTimeField()
    discoveredBy = models.ForeignKey(User, on_delete=SET_DEFAULT, default='Anonymous')
    lastUpdated = models.DateTimeField()
    domain = models.ForeignKey(Domain, on_delete=models.CASCADE)

    def __str__(self):
        return self.path

