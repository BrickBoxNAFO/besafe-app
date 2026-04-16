#!/bin/bash
# Send a test certificate via the API
# Usage: ./scripts/send-test-certificate.sh
# (or run from production): curl against your live site

SITE_URL="${NEXT_PUBLIC_SITE_URL:-https://homesafeeducation.com}"

echo "Sending test certificate to Jonathanmichaellees@outlook.com..."
echo "Endpoint: ${SITE_URL}/api/generate-certificate"

curl -X POST "${SITE_URL}/api/generate-certificate" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "Jonathanmichaellees@outlook.com",
    "name": "Brick",
    "courseName": "Street Smart",
    "date": "7 April 2026"
  }'

echo ""
echo "Done! Check your inbox."
