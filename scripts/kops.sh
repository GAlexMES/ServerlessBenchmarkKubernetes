#!/bin/bash
source ./envs.sh

echo AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
echo AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
echo CLUSTER_NAME=${CLUSTER_NAME}
echo STORAGE_NAME=${STORAGE_NAME}
echo KOPS_STATE_STORE=${KOPS_STATE_STORE}


echo aws s3api create-bucket --bucket ${STORAGE_NAME} --region=eu-west-2 --create-bucket-configuration LocationConstraint=eu-west-2
aws s3api create-bucket --bucket ${STORAGE_NAME} --region=eu-west-2 --create-bucket-configuration LocationConstraint=eu-west-2

echo kops create cluster --node-count 2 --zones=eu-west-2a ${CLUSTER_NAME}
# --vpc=${VPC_ID} --subnets=${SUBNET_IDS}
kops create cluster --node-count 2 --zones=eu-west-2a ${CLUSTER_NAME}

echo Creating secret for docker registry
kops create secret --name ${CLUSTER_NAME} dockerconfig -f ~/.docker/config.json

echo kops update cluster ${CLUSTER_NAME} --yes
kops update cluster ${CLUSTER_NAME} --yes

echo kops export kubecfg --admin
kops export kubecfg --admin
kubectl get nodes

echo Maybe export the variables and then run kops export kubecfg --admin in your shell to init everything
# kops get ig --name ${CLUSTER_NAME} nodes-eu-west-2
