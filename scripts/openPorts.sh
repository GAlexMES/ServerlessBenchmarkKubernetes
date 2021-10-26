#!/bin/bash

portRange="30005-30015"

instanceIds=$(kops get instances | awk 'FNR > 2 {print $1}')

jqInstances='.Reservations[0].Instances[0]'
jqGroupId='.SecurityGroups[0].GroupId'
jqQuery="${jqInstances}${jqGroupId}"
echo ${instanceIds}
securityGroups=""
for instanceId in $instanceIds
do
	echo "opening ports for instance ${instanceId}"
	groupId=$(aws ec2 describe-instances --instance-ids ${instanceId} | jq ${jqQuery})
    groupIdCleaned=${groupId:1:${#groupId}-2}
	echo "found security group ${groupIdCleaned}"
	securityGroups="${securityGroups} ${groupIdCleaned}"
done

securityGroupsFiltered=$(echo $securityGroups | tr ' ' '\n' | sort -u | xargs )

for securityGroupId in $securityGroupsFiltered
do
	aws ec2 authorize-security-group-ingress --group-id ${securityGroupId} --protocol tcp --port ${portRange} --cidr 0.0.0.0/0
done
