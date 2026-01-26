# Быстрый деплой

## Процесс деплоя (3 шага):

### 1. Соберите проект в Cocos Creator
- **Проект** → **Сборка** → **Web Mobile**
- Дождитесь завершения сборки

### 2. Запустите скрипт деплоя
```bash
./deploy.sh
```

### 3. Настройте GitHub Pages (только один раз)
- Откройте: https://github.com/Nlof72/blast-game/settings/pages
- **Source**: Branch `gh-pages`, Folder `/ (root)`
- **Save**

## Готово! 🎉

Игра будет доступна: **https://Nlof72.github.io/blast-game/**

---

**Примечание:** GitHub Actions workflow удален, так как требует дополнительных настроек токенов. Используйте ручной деплой через `./deploy.sh` - это проще и надежнее.
