# Возможности
- Установка темы
- Смена текущей темы на альтернативную

# Установка

Используя npm: 
```sh
$ npm i @_themis/usescheme
```
Используя yarn: 
```sh
$ yarn add @_themis/usescheme
```

# Использование

## SchemeProvider
Для начала нужно обернуть приложение в ``SchemeProvider``.

```jsx
// index.js
import { SchemeProvider } from "@_themis/usescheme";

ReactDOM.render(
  <SchemeProvider>
    <App />
  </SchemeProvider>,
  document.getElementById("root")
);
```

Для установки начального значения темы можно передать проп ``initial``:
```jsx
// index.js
import { SchemeProvider } from "@_themis/usescheme";

ReactDOM.render(
  <SchemeProvider initial="space_gray">
    <App />
  </SchemeProvider>,
  document.getElementById("root")
);
```
Он принимает два значения: ``space_gray`` или ``bright_light``. По-умолчанию используется ``bright_light``.

### Важно
``SchemeProvider``  инкапсулирует внутри себя логику получения и установки темы от ``bridge``.

## useScheme
Хук ``useScheme`` возвращает объект. Описание его свойств: 

| Свойство | Описание |
| ------ | ------ |
| scheme | Содержит в себе текущую тему приложения (``space_gray`` или ``bright_light``) |
| setScheme | Устанавливает текущую тему приложения (``space_gray`` или ``bright_light``) |
| toggleScheme | Устанавливает альтернативную тему. |


Пример использования:
```jsx
// settings.js
import { useScheme } from "@_themis/usescheme";

export default function Settings() {
  const { scheme, toggleScheme } = useScheme();

  return (
    <Panel id="settings">
        <PanelHeader>Настройки</PanelHeader>
        
        <SimpleCell after={<Switch onClick={toggleScheme} checked={scheme === "space_gray"} />}>
            Тёмная тема
        </SimpleCell>
    </Panel>
  );
};
```