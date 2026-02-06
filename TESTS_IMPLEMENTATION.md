# Реализация тестов (пошагово)

Ниже — последовательность шагов и какие файлы создать, чтобы получить полный набор тестов для механик.

## Шаг 1. Выбрать инфраструктуру тестов
- Рекомендуемый вариант: `jest` + `ts-jest`.
- Альтернатива: встроенный `ts-node` + minimal harness.

**Файлы:**
- `package.json` (скрипты test)
- `jest.config.js`
- `tests/` (папка для тестов)

---

## Шаг 2. Подготовить вспомогательные утилиты
Создать утилиты в `tests/utils/`:
1. `FakeRng.ts` — детерминированный RNG.
2. `TestBoard.ts` — builder для тестовой доски (set/get по координатам).
3. `TestContext.ts` — реализация `BoardContext` для юнит‑тестов.

---

## Шаг 3. Тесты для GroupFinder
**Файл:** `tests/GroupFinder.test.ts`
- Группа 1 (single)
- Группа 2 (L‑shape)
- Группа 3 (diagonal)
- Группа 4 (mixed colors)

---

## Шаг 4. Тесты для MoveAvailability
**Файл:** `tests/MoveAvailability.test.ts`
- no moves
- has group
- has special

---

## Шаг 5. Тесты для EffectHandlers
**Файл:** `tests/EffectHandlers.test.ts`
- ClearRow
- ClearColumn
- BombRadius (center + edge)
- ClearBoard

---

## Шаг 6. Тесты для SpecialSpawnPolicy
**Файл:** `tests/SpecialSpawnPolicy.test.ts`
- tiers
- выбор эффекта из списка
- null при маленькой группе

---

## Шаг 7. Тесты для GravitySystem
**Файл:** `tests/GravitySystem.test.ts`
- падение вниз
- спавн новых
- создание спец‑тайла

---

## Шаг 8. Тесты для MoveResolver
**Файл:** `tests/MoveResolver.test.ts`
- клики normal/special
- корректные команды moves/spawns

---

## Шаг 9. Тесты для ShuffleSystem
**Файл:** `tests/ShuffleSystem.test.ts`
- сохранение числа тайлов
- изменения позиций

---

## Шаг 10. Тесты для BombSystem
**Файл:** `tests/BombSystem.test.ts`
- удаление по радиусу
- границы

---

## Шаг 11. Тесты для ScorePolicy + GameController
**Файл:** `tests/ScorePolicy.test.ts`
- mock policy
- проверка итоговых очков

---

## Шаг 12. Проверки и CI
- Добавить `npm test`.
- По возможности включить в CI (GitHub Actions/CI локально).

