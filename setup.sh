#!/bin/bash

# Portfolio Template Setup Script
# This script initializes a new portfolio site from the template

echo "🚀 Portfolio Template Setup"
echo "=========================="

# Check if Hugo is installed
if ! command -v hugo &> /dev/null; then
    echo "❌ Hugo is not installed. Please install Hugo first:"
    echo "   - Download from: https://gohugo.io/getting-started/installing/"
    exit 1
fi

# Create data directory if it doesn't exist
if [ ! -d "data" ]; then
    mkdir -p data
    echo "✅ Created data directory"
fi

# Copy template data file
if [ ! -f "data/portfolio.yaml" ]; then
    cp data/portfolio-template.yaml data/portfolio.yaml 2>/dev/null || echo "⚠️  Template data file not found. Please create data/portfolio.yaml manually."
    echo "✅ Copied portfolio data template"
fi

# Create layouts directory structure
if [ ! -d "layouts/partials/portfolio" ]; then
    mkdir -p layouts/partials/portfolio
    echo "✅ Created layouts structure"
fi

# Copy partial templates
for partial in hero tech-stack certifications projects-overview access-form currently study-learning; do
    if [ ! -f "layouts/partials/portfolio/${partial}.html" ]; then
        cp layouts/partials/portfolio-template/${partial}.html layouts/partials/portfolio/${partial}.html 2>/dev/null || echo "⚠️  Template partial ${partial}.html not found."
    fi
done
echo "✅ Copied partial templates"

# Create static directories
mkdir -p static/js static/css assets/css
echo "✅ Created static directories"

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit data/portfolio.yaml with your personal information"
echo "2. Customize layouts/partials/portfolio/*.html if needed"
echo "3. Run 'hugo server' to preview"
echo "4. Run 'hugo' to build for production"
echo ""
echo "Happy coding! 🎨"