from django.db import models
from django.db.models.deletion import SET_DEFAULT

# Create your models here.
class Domain(models.Model):
    #include sub domains but not www
     fullDomainName = models.CharField(max_length=303, unique= True)
     name = models.CharField(max_length=253)
     extension = models.CharField(max_length=50)
     discoveryDate = models.DateTimeField()

     def __str__(self):
          return self.name + self.extension

class User(models.Model):
     name = models.CharField(max_length=50, unique=True)
     accountCreatedOn = models.DateTimeField()
     endpointsContributed = models.IntegerField

     def __str__(self):
         return self.name

class Endpoint(models.Model):
    fullDomainAndPath = models.CharField(max_length=2500, unique= True) 
    domain = models.ForeignKey(Domain, on_delete=models.CASCADE)
    path = models.CharField(max_length=2000)
    discoveryDate = models.DateTimeField()
    discoveredBy = models.ForeignKey(User, on_delete=SET_DEFAULT, default='Anonymous')
    lastUpdated = models.DateTimeField()
    # reverse accessor issue -- add attribute later when the site is actually functional
    # lastUpdatedBy = models.ForeignKey(User, on_delete=SET_DEFAULT, default='Default')
    

    def __str__(self):
        return self.path

