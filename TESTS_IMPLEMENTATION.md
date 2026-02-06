# Реализация тестов (пошагово)

Ниже — последовательность шагов, фактическая реализация и проверка после каждого шага.

## Шаг 1. Инфраструктура тестов (`jest` + `ts-jest`)
**Сделано:**
- Добавлены `package.json`, `jest.config.js`.
- Создана папка `tests/`.
- Установлены зависимости: `jest`, `ts-jest`, `@types/jest`.

**Статус:** ✅ выполнено.
**Проверка:** `ls package.json jest.config.js tests/`.

---

## Шаг 2. Вспомогательные утилиты
**Сделано:**
- `tests/utils/FakeRng.ts` — детерминированный RNG.
- `tests/utils/TestBoard.ts` — builder для сетки + helper‑тайлы.
- `tests/utils/TestContext.ts` — `BoardContext` для тестов.

**Статус:** ✅ выполнено.
**Проверка:** `ls tests/utils`.

---

## Шаг 3. Тесты для GroupFinder
**Файл:** `tests/GroupFinder.test.ts`
**Покрытие:** single, L‑shape, diagonal, mixed colors.

**Статус:** ✅ выполнено.
**Проверка:** `npm test` → PASS.

---

## Шаг 4. Тесты для MoveAvailability
**Файл:** `tests/MoveAvailability.test.ts`
**Покрытие:** no moves, has group, has special.

**Статус:** ✅ выполнено.
**Проверка:** `npm test` → PASS.

---

## Шаг 5. Тесты для EffectHandlers
**Файл:** `tests/EffectHandlers.test.ts`
**Покрытие:** ClearRow, ClearColumn, BombRadius (center/edge), ClearBoard.

**Статус:** ✅ выполнено.
**Проверка:** `npm test` → PASS.

---

## Шаг 6. Тесты для SpecialSpawnPolicy
**Файл:** `tests/SpecialSpawnPolicy.test.ts`
**Покрытие:** tiers, выбор эффекта, null при маленькой группе.

**Статус:** ✅ выполнено.
**Проверка:** `npm test` → PASS.

---

## Шаг 7. Тесты для GravitySystem
**Файл:** `tests/GravitySystem.test.ts`
**Покрытие:** падение вниз, спавн, спец‑тайл.

**Статус:** ✅ выполнено.
**Проверка:** `npm test` → PASS.

---

## Шаг 8. Тесты для MoveResolver
**Файл:** `tests/MoveResolver.test.ts`
**Покрытие:** normal/special клики, removed/spawns.

**Статус:** ✅ выполнено.
**Проверка:** `npm test` → PASS.

---

## Шаг 9. Тесты для ShuffleSystem
**Файл:** `tests/ShuffleSystem.test.ts`
**Покрытие:** сохранение числа тайлов, изменения позиций.

**Статус:** ✅ выполнено.
**Проверка:** `npm test` → PASS.

---

## Шаг 10. Тесты для BombSystem
**Файл:** `tests/BombSystem.test.ts`
**Покрытие:** радиус, границы.

**Статус:** ✅ выполнено.
**Проверка:** `npm test` → PASS.

---

## Шаг 11. Тесты для ScorePolicy + GameController
**Файл:** `tests/ScorePolicy.test.ts`
**Покрытие:** инъекция policy, корректный счет.

**Статус:** ✅ выполнено.
**Проверка:** `npm test` → PASS.

---

## Шаг 12. Проверки
**Сделано:**
- `npm test` запущен, все тесты проходят.
- Отключен watchman в `jest.config.js`.
- Конфиг `ts-jest` переведен на `transform` (без warnings).

**Статус:** ✅ выполнено.
**Проверка:** `npm test` → PASS (9 suites, 25 tests).

