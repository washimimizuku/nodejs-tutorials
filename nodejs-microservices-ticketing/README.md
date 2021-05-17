# nodejs-microservices-ticketing

## Setup

### Ingress Nginx

Activate ingress-nginx:

kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.41.2/deploy/static/provider/cloud/deploy.yaml

### Google Cloud:

gcloud auth login
gcloud init
gcloud container clusters get-credentials ticketing-dev

### JWT

kubectl create secret generic jwt-secret --from-literal=JWT_KEY=SOME_SECRET_KEY
kubectl create secret generic stripe-secret --from-literal=STRIPE_KEY=SOME_SECRET_KEY
