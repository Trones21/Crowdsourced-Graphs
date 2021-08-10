from django.shortcuts import render, get_object_or_404, get_list_or_404
from django.http import HttpResponse
# Create your views here.
from mySite.models import Endpoint, Domain, User

def welcome(request):
    return render(request, "mySite/example.html", {"blahblah": "This is my message"})

def summaryStats(request):
    return render(request, "mySite/summaryStats.html", {
        "endpointCount": Endpoint.objects.count(),
        "domainCount": Domain.objects.count(),
        "userCount": "Placeholder",
        "graphQLCount":"Placeholder",
        "graphQLIntrospectionTrueCount": "Placeholder"
    })

def userDetail(request, id):
    user = get_object_or_404(User, pk=id)
    return render(request, "mySite/User.html", {"user": user})

def endpointDetail(request):
    endpoint = Endpoint.objects.get(pk=id)
    return render(request, "mySite/Endpoint.html", {"endpoint":endpoint})

def domainsList(request):
    domains = get_list_or_404(Domain)
    for k, d in enumerate(domains):
        domains[k].endpointCount = Endpoint.objects.filter(domain_id=d.id).count()
       #print(domain.endpointCount)
    for k, d in enumerate(domains):
        print(d.endpointCount)
    return render(request, "mySite/DomainList.html", {"domains": domains})

def domainDetail(request, id):
    domain = get_object_or_404(Domain, pk=id)
    endpointCount = "Placeholder"
    return render(request, "mySite/Domain.html", {"domain":domain, "endpointCount": endpointCount})