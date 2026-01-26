#!/bin/bash

echo "🚀 Deploying to GitHub Pages..."

if [ ! -d "build/web-mobile" ]; then
    echo "❌ Error: build/web-mobile directory not found!"
    echo "Please build the project in Cocos Creator first:"
    echo "  Project -> Build -> Web Mobile"
    exit 1
fi

if [ ! -f "build/web-mobile/index.html" ]; then
    echo "❌ Error: index.html not found in build/web-mobile!"
    echo "The build seems incomplete. Please rebuild the project in Cocos Creator."
    exit 1
fi

CURRENT_BRANCH=$(git branch --show-current)

if [ "$CURRENT_BRANCH" != "main" ] && [ "$CURRENT_BRANCH" != "master" ]; then
    echo "⚠️  Warning: You are not on main/master branch"
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

echo "📦 Creating gh-pages branch..."

git checkout --orphan gh-pages 2>/dev/null || git checkout gh-pages
git rm -rf . 2>/dev/null || true

echo "📂 Copying build files..."
cp -r build/web-mobile/* . 2>/dev/null || true
if [ -d "build/web-mobile/src" ]; then
  cp -r build/web-mobile/src . 2>/dev/null || true
fi

echo "📝 Creating .nojekyll file..."
touch .nojekyll

echo "💾 Committing changes..."
git add .
git commit -m "Deploy to GitHub Pages - $(date +%Y-%m-%d\ %H:%M:%S)"

echo "🚀 Pushing to GitHub..."
git push origin gh-pages --force

echo "🔄 Switching back to main branch..."
git checkout $CURRENT_BRANCH 2>/dev/null || git checkout main

echo "✅ Deployment complete!"
echo "🌐 Your game should be available at:"
echo "   https://$(git config user.name).github.io/$(basename $(git rev-parse --show-toplevel))"
