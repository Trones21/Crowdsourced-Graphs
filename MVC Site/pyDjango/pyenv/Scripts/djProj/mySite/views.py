from django.shortcuts import render, get_object_or_404, get_list_or_404
from django.http import HttpResponse
from datetime import datetime as dt

#For the API called by chrome extension (bypass csrf)
from django.views.decorators.csrf import csrf_exempt
import json

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

def about(request):
    return render(request, "mySite/About.html")

def joinUs(request):
    return render(request, "mySite/JoinUs.html")


def userDetail(request, id):
    user = get_object_or_404(User, pk=id)
    return render(request, "mySite/User.html", {"User": user})


def endpointDetail(request):
    endpoint = Endpoint.objects.get(pk=id)
    return render(request, "mySite/Endpoint.html", {"endpoint":endpoint})


def domainsList(request):
    domains = get_list_or_404(Domain)
    for k, d in enumerate(domains):
        domains[k].endpointCount = Endpoint.objects.filter(domain_id=d.id).count()
    return render(request, "mySite/DomainList.html", {"domains": domains})


def domainDetail(request, id):
    domain = get_object_or_404(Domain, pk=id)
    endpoints = Endpoint.objects.filter(domain_id=id)
    for k, e in enumerate(endpoints):
        endpoints[k].discoveredByUser_id = User.objects.filter(name=e.discoveredBy)[0].id
    endpointCount = endpoints.count()
    return render(request, "mySite/Domain.html", {"domain":domain, "endpointCount": endpointCount, "endpoints": endpoints})



@csrf_exempt
def addOrUpdate(request):
    #Prep
    reqDT = dt.now()
    res = {}
    try:
        json_data = json.loads(request.body)
        jsonDict = validateBody(json_data)
    except KeyError:
        return ("Malformed data!")
    if type(jsonDict) != dict:
        return "Error in validation"
        #return jsonDict


    domainQuerySet = Domain.objects.filter(fullDomainName = jsonDict['fullDomainName'])

    #Check/Add Domain
    if domainQuerySet.count() > 1:
        return """Error - DB should have a unique constraint for domain-fullDomainName
        but multiple records were found"""
    chkDomain = Domain(fullDomainName = jsonDict['fullDomainName'], name = jsonDict['name'], extension = jsonDict['extension'], discoveryDate = reqDT)
    res = domainExistsOrAdd(res, chkDomain, domainQuerySet)  
    
    #Check/Add Endpooint -- Must be called after domain is checked/added
    res = endpointExistsOrAdd(res, jsonDict, reqDT)

    return HttpResponse(json.dumps(res))

def domainExistsOrAdd(res, chkDomain, domainQuerySet):
    if domainQuerySet.count() == 1:
        res['domainExists'] = True
    else:
        chkDomain.save()
        res['domainExists'] = chkDomain.name + chkDomain.extension + " added to db :) "
    
    return res

def endpointExistsOrAdd(res, jsonDict, reqDT):
    domain = Domain.objects.filter(fullDomainName = jsonDict['fullDomainName'])
    endpointQuerySet = Endpoint.objects.filter(domain = domain).filter(path = jsonDict['endpointPath'])
    
    if len(endpointQuerySet) != 0:
        res['endpointExists'] = True
        return res
    
    user = User.objects.filter(name = jsonDict['user'])
    # if len(user) != 1:
    #     userName = 

    newEndpoint = Endpoint(
        path = jsonDict['endpointPath'],
        discoveryDate = reqDT, 
        discoveredBy = "Learn after domain",
        lastUpdated = reqDT,
        lastUpdatedBy = "ToDo: Get User",
        domain = domain)
    newEndpoint.save()
    res['endpointExists'] = domain.name + domain.extension + newEndpoint.path + " now exists in db :) "
    return res
    
    
    # if Endpoint.objects.filter(domain = endpointPath).prefetch_related('domain').count() > 0 :
    #     res['endpointExists'] = True
    # else:
    #     domain = Domain.objects.filter(name = name).filter(extension = extension)
    #     newEp = Endpoint(path = endpointPath, discoveryDate = reqDT, lastUpdated = reqDT, domain = domain)
    #     newEp.save()
    #     res['endpointExists'] = name + extension + endpointPath + " now exists in db :) "

    # if Domain.objects.filter(name = request.body.domain).count() > 0:
    #     print("Domain exists")
    # return "Done"
    
def validateBody(json_data):
    try:
      tempDict = {}
      #fullDomainName excludes https://www. and the endpoint path
      tempDict['fullDomainName'] = json_data['fullDomainName']
      domainNamePieces = json_data['fullDomainName'].split('.')
      
      if(len(domainNamePieces) < 2):
          return HttpResponse("Malformed domainName: " +  json_data['fullDomainName'])
      
      tempDict['extension'] = "." + domainNamePieces[-1] 
      tempDict['name'] = domainNamePieces[0:domainNamePieces.rindex('.')]
      
      tempDict['endpointPath'] = json_data['endpoint']['path']
      tempDict['endpointIntrospcetionAllowed'] = json_data['endpoint']['introspectionAllowed']
      tempDict['user'] = json_data['user']
      return tempDict
    
    except Exception as e:
        print(e)
        return False;