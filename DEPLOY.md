# Инструкция по деплою на GitHub Pages

## Вариант 1: Ручной деплой (рекомендуется)

### Шаг 1: Сборка проекта

1. Откройте проект в Cocos Creator 2.4.x
2. Перейдите в меню: **Проект** -> **Сборка**
3. Выберите платформу: **Web Mobile**
4. Укажите путь сборки: `build/web-mobile`
5. Нажмите **Сборка**

### Шаг 2: Инициализация Git (если еще не сделано)

```bash
cd /Users/nikita/Test-blast
git init
git add .
git commit -m "Initial commit"
```

### Шаг 3: Создание репозитория на GitHub

1. Создайте новый репозиторий на GitHub
2. Добавьте remote:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### Шаг 4: Настройка GitHub Pages

1. Перейдите в настройки репозитория: Settings -> Pages
2. В разделе "Source" выберите:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
3. Нажмите Save

### Шаг 5: Создание ветки gh-pages с билдом

```bash
# После сборки проекта в Cocos Creator
git checkout --orphan gh-pages
git rm -rf .
cp -r build/web-mobile/* .
git add .
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages
git checkout main
```

## Вариант 2: Автоматический деплой через GitHub Actions

1. Убедитесь, что папка `build/web-mobile` существует после сборки
2. Закоммитьте и запушьте изменения:

```bash
git add .
git commit -m "Add GitHub Actions workflow"
git push origin main
```

3. GitHub Actions автоматически задеплоит проект при каждом push в main

**Примечание:** Для автоматического деплоя нужно, чтобы папка `build/web-mobile` была в репозитории. Либо настройте Cocos Creator CLI для автоматической сборки в CI/CD.

## Вариант 3: Использование отдельной ветки для билда

1. Соберите проект в Cocos Creator
2. Создайте ветку `gh-pages`:

```bash
git checkout -b gh-pages
git rm -rf .
cp -r build/web-mobile/* .
git add .
git commit -m "Deploy build"
git push origin gh-pages
```

3. В настройках GitHub Pages укажите ветку `gh-pages`

## Проверка деплоя

После деплоя ваш проект будет доступен по адресу:
`https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`
