#!/usr/bin/env bash
# ==============================================================================
# AWS S3 Static Website Deployment Script for Yusuf Eryilmaz
# ==============================================================================

# Exit immediately if a command exits with a non-zero status
set -e

# Change this to your target S3 bucket name
BUCKET_NAME="yusuferyilmaz-software-developer"
# Optional: Set your CloudFront Distribution ID to invalidate cache upon upload
CLOUDFRONT_DIST_ID=""

echo "=========================================="
echo " Deploying Portfolio to AWS S3: $BUCKET_NAME"
echo "=========================================="

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "Error: AWS CLI is not installed or not in PATH."
    echo "Install it via 'brew install awscli' and configure with 'aws configure'."
    exit 1
fi

echo "Step 1: Syncing assets to S3..."
aws s3 sync . "s3://${BUCKET_NAME}" \
    --exclude ".git/*" \
    --exclude ".DS_Store" \
    --exclude "*.sh" \
    --exclude "README.md" \
    --delete

echo "Step 2: Setting cache control headers..."
# HTML files: no-cache to ensure instant updates
aws s3 cp index.html "s3://${BUCKET_NAME}/index.html" \
    --metadata-directive REPLACE \
    --cache-control "max-age=0, no-cache, no-store, must-revalidate" \
    --content-type "text/html"

# CSS and JS files: 1 day cache
aws s3 cp css/style.css "s3://${BUCKET_NAME}/css/style.css" \
    --metadata-directive REPLACE \
    --cache-control "max-age=86400, public" \
    --content-type "text/css"

aws s3 cp js/main.js "s3://${BUCKET_NAME}/js/main.js" \
    --metadata-directive REPLACE \
    --cache-control "max-age=86400, public" \
    --content-type "application/javascript"

# PDF resume: inline viewing friendly
aws s3 cp assets/Yusuf_Eryilmaz_Resume.pdf "s3://${BUCKET_NAME}/assets/Yusuf_Eryilmaz_Resume.pdf" \
    --metadata-directive REPLACE \
    --content-type "application/pdf"

if [ -n "$CLOUDFRONT_DIST_ID" ]; then
    echo "Step 3: Invalidating CloudFront distribution $CLOUDFRONT_DIST_ID..."
    aws cloudfront create-invalidation --distribution-id "$CLOUDFRONT_DIST_ID" --paths "/*"
fi

echo "=========================================="
echo " Deployment successful!"
echo " URL: http://${BUCKET_NAME}.s3-website-us-east-1.amazonaws.com"
echo "=========================================="
