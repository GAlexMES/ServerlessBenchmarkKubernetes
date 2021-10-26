export AWS_ACCESS_KEY_ID=$(aws configure get aws_access_key_id)
export AWS_SECRET_ACCESS_KEY=$(aws configure get aws_secret_access_key)
export CLUSTER_NAME=benchmarking.k8s.local
export STORAGE_NAME=benchmarking-storage
export KOPS_STATE_STORE=s3://${STORAGE_NAME}
export VPC_ID=vpc-13e1d47b
export NETWORK_CIDR=172.31.0.0/16
export SUBNET_IDS=subnet-04453e7e,subnet-8fc3fce6,subnet-9ded64d1
