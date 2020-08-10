#!/bin/bash

echo "### Generate Code Owners"
echo ""

CODEOWNERS_PATH=$1
export CODEOWNERS_PATH

node scripts/generate_code_owners.js --verbose

echo ""
echo "### Generate Code Owners - Complete"
echo ""
