# Front-end README

1. Clonar el proyecto
2. Ejecutar `npm install`
3. Clonar el archivo `.env.template` y renombrarlo `.env.local`
4. Para correr el Front-end ejecutar: `npm run dev`

NOTA: Vite por defecto ejecuta el proyecto en el puerto `5173`, verifica que sea el mismo que se esté ejecutando, de lo contrario deberá proporcionar el puerto correspondiente al front-end en la variable de entorno en el back-end, ya que la API tiene validación de CORS.

NOTA 2: La variable de entorno en `.env.local` es la ruta del Back-end, si se decide cambiar el puerto en el que se ejecutará el back-end esta variable deberá ser actualizada con la nueva ruta del back-end.

# DEFAULT VITE README

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

-  [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
-  [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

-  Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
   languageOptions: {
      // other options...
      parserOptions: {
         project: ['./tsconfig.node.json', './tsconfig.app.json'],
         tsconfigRootDir: import.meta.dirname,
      },
   },
});
```

-  Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
-  Optionally add `...tseslint.configs.stylisticTypeChecked`
-  Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react';

export default tseslint.config({
   // Set the react version
   settings: { react: { version: '18.3' } },
   plugins: {
      // Add the react plugin
      react,
   },
   rules: {
      // other rules...
      // Enable its recommended rules
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
   },
});
```
