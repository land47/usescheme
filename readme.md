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

### Важно
``SchemeProvider`` инкапсулирует внутри себя логику получения и установки темы от ``bridge``. Он так же внутри себя работает с компонентом ``VKUI`` ``ConfigProvider``, и принимает в себя все валидные для него свойства. Если ваше приложение уже обёрнуто в ``ConfigProvider``, повторите эти шаги:
- Замените ``ConfigProvider`` на ``SchemeProvider``
- Передайте ему пропсы, которые были до этого, исключая ``scheme`` и ``appearance``

Было:
```jsx
// index.js
ReactDOM.render(
  <ConfigProvider isWebView={true} scheme={...}>
    <App />
  </ConfigProvider>,
  document.getElementById("root")
);
```
Стало:
```jsx
// index.js
import { SchemeProvider } from "@_themis/usescheme";

ReactDOM.render(
  <SchemeProvider isWebView={true}>
    <App />
  </SchemeProvider>,
  document.getElementById("root")
);
```

## useScheme
Хук ``useScheme`` возвращает объект. Описание его свойств: 

| Свойство | Описание |
| ------ | ------ |
| scheme | Содержит в себе текущую тему приложения (``space_gray`` или ``bright_light``) |
| setScheme | Устанавливает текущую тему приложения (``space_gray`` или ``bright_light``) |
| toggleScheme | Устанавливает альтернативную тему. |


### Пример
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