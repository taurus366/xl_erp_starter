# 🚀 AIOLDS Project Automation

This project uses an automated system for library management and translation extraction via scripts located in `xl-util`.

---

## 📦 1. Install/Update Repository

The system synchronizes local libraries with a global cache and supports automatic Git downloading.

- **Configuration:** In `tsconfig.base.json`, add the path and the Git link as a comment:
  `"xl-layout": ["libs/xl-layout/src/index.ts"] // git@github.com:user/repo.git`

- **Commands:**
    - `$ command -> npm run sync`
    - **Or directly:** `node libs/xl-util/src/lib/scripts/sync-libs.js`
    - **To update:** `npm run update` (clears cache and redownloads)

---

## 🌍 2. Extract All Translations

The script scans the project and automatically generates language files, appending new keys at the bottom and preserving existing translations.

- **Output Files:**
    - `$ files -> src/assets/i18n/*.json`

- **Commands:**
    - `$ command -> npm run intl`
    - **Or directly:** `node libs/xl-util/src/lib/scripts/extract-i18n.js en bg`
    - *(Note: `en` and `bg` are language parameters for the files you wish to generate)*

---

## 🛠️ Integration in package.json

To enable these commands, add the following scripts to your main `package.json`:

```json
"scripts": {
  "sync": "node ./libs/xl-util/src/lib/scripts/sync-libs.js",
  "update": "node ./libs/xl-util/src/lib/scripts/sync-libs.js update",
  "intl": "node ./libs/xl-util/src/lib/scripts/extract-i18n.js en bg"
}

-------------------------------
# 🚀 AIOLDS Project Automation

Този проект използва автоматизирана система за управление на библиотеки и извличане на преводи чрез скриптове в `xl-util`.

---

## 📦 1. Install/Update Repository

Системата синхронизира локалните библиотеки с глобалния кеш и поддържа автоматично изтегляне от Git.

- **Конфигурация:** В `tsconfig.base.json` добавете пътя и Git линка като коментар:
  `"xl-layout": ["libs/xl-layout/src/index.ts"] // git@github.com:user/repo.git`

- **Команди:**
    - `$ command -> npm run sync`
    - **Или директно:** `node libs/xl-util/src/lib/scripts/sync-libs.js`
    - **За ъпдейт:** `npm run update` (изтрива кеша и тегли наново)

---

## 🌍 2. Extract All Translations

Скриптът сканира проекта и автоматично генерира езикови файлове, като добавя новите ключове най-отдолу и запазва старите преводи.

- **Изходни файлове:**
    - `$ files -> src/assets/i18n/*.json`

- **Команди:**
    - `$ command -> npm run intl`
    - **Или директно:** `node libs/xl-util/src/lib/scripts/extract-i18n.js en bg`
    - *(Забележка: `en` и `bg` са параметри за езиците, които искате да генерирате)*

---

## 🛠️ Интеграция в package.json

За да работят командите, добавете следните скриптове в основния `package.json`:

```json
"scripts": {
  "sync": "node ./libs/xl-util/src/lib/scripts/sync-libs.js",
  "update": "node ./libs/xl-util/src/lib/scripts/sync-libs.js update",
  "intl": "node ./libs/xl-util/src/lib/scripts/extract-i18n.js en bg"
}
