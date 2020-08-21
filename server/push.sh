#!/bin/bash

serviceVersion=$(date +%s)
graph=testgraph-v1

apollo service:push \
    --graph=$graph \
    --key=$APOLLO_KEY \
    --variant=current \
    --serviceName=BaseService \
    --serviceURL=http://localhost:6001/ \
    --endpoint http://localhost:6001 \
    --serviceRevision=$serviceVersion


apollo service:push \
    --graph=$graph \
    --key=$APOLLO_KEY \
    --variant=current \
    --serviceName=ExtendingService \
    --serviceURL=http://localhost:6002/ \
    --endpoint http://localhost:6002 \
    --serviceRevision=$serviceVersion



