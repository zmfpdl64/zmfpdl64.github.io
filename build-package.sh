#!/bin/bash

# Portfolio Template Build Script for Distribution
# This script creates a distributable package

echo "🔨 Building Portfolio Template Package"
echo "====================================="

# Check if Hugo is installed
if ! command -v hugo &> /dev/null; then
    echo "❌ Hugo is not installed."
    exit 1
fi

# Create build directory
BUILD_DIR="dist"
rm -rf $BUILD_DIR
mkdir -p $BUILD_DIR

echo "📦 Building Hugo site..."
hugo --minify --destination $BUILD_DIR/public

# Copy necessary files for source distribution
echo "📋 Copying source files..."
mkdir -p $BUILD_DIR/source

# Copy data template
cp data/portfolio.yaml $BUILD_DIR/source/portfolio-template.yaml

# Copy partial templates
mkdir -p $BUILD_DIR/source/layouts/partials/portfolio
cp layouts/partials/portfolio/*.html $BUILD_DIR/source/layouts/partials/portfolio/

# Copy setup script and docs
cp setup.sh $BUILD_DIR/
cp README_TEMPLATE.md $BUILD_DIR/README.md
cp PACKAGING_GUIDE.md $BUILD_DIR/

# Create package archives
echo "📦 Creating distribution packages..."

# Source package (for developers)
zip -r portfolio-template-source.zip $BUILD_DIR/source/ setup.sh README.md -x "*.git*"
mv portfolio-template-source.zip $BUILD_DIR/

# Built package (for end users)
cd $BUILD_DIR/public
zip -r ../portfolio-template-built.zip ./*
cd ../..

echo "✅ Build complete!"
echo ""
echo "Generated files:"
echo "- dist/portfolio-template-source.zip (개발자용)"
echo "- dist/portfolio-template-built.zip (사용자용)"
echo ""
echo "📊 Package sizes:"
du -sh $BUILD_DIR/*.zip