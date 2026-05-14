# Simplified Kanban - Angular 21

Este proyecto es una aplicación de tablero Kanban moderna, construida con Angular 21, enfocada en la reactividad basada en **Signals** y una arquitectura **Zoneless**.

## 🚀 Instalación y Ejecución

Sigue estos pasos para poner en marcha el proyecto localmente:

1. **Clonar el repositorio** `https://github.com/josewebfreelance/simplified-kanban`.
2. **Instalar dependencias**:
   ```bash
   npm install
   ```
3. **Iniciar el servidor de desarrollo**:
   ```bash
   npm run start
   ```
4. **Abrir en el navegador**:
   Navega a `http://localhost:4200/`. La aplicación se recargará automáticamente al detectar cambios.

---

## 🛠️ Decisiones Técnicas

- **Angular 21 (Zoneless)**: Se prescindió de `zone.js` utilizando `provideZonelessChangeDetection()`. Esto mejora el rendimiento y reduce el tamaño del bundle, delegando la detección de cambios a la reactividad nativa.
- **Angular Signals**: Se utiliza como el motor principal de estado. A diferencia de RxJS, los Signals permiten una reactividad granular y un acceso síncrono al estado, lo que simplifica la lógica de los componentes.
- **Angular Material**: Se emplearon componentes de Material para una interfaz profesional y el CDK (Component Dev Kit) específicamente para la funcionalidad de **Drag and Drop**.
- **Vitest**: Se configuró Vitest como corredor de pruebas por su velocidad y compatibilidad con el ecosistema moderno de herramientas de construcción.
- **Persistencia en LocalStorage**: Se implementó un efecto (`effect`) en el servicio de tareas para sincronizar automáticamente el estado con el almacenamiento local del navegador.

---

## ⚖️ Trade-offs

- **Signals vs RxJS**: Se decidió priorizar Signals para el estado de la UI por su simplicidad. Signals reduce la verbosidad y el riesgo de fugas de memoria.
- **Diseño Standalone**: Se optó por componentes Standalone para eliminar la necesidad de `NgModules`, facilitando una estructura más plana y fácil de mantener.
- **LocalStorage vs Backend**: Para mantener el enfoque en la "simplicidad", se utilizó LocalStorage.

---

## 📝 Lo que no se alcanzó a hacer (y por qué)

1. **Integración con Backend Real**: No se implementó una API REST para centrar el esfuerzo en demostrar la reactividad con Signals y Zoneless en el frontend.
2. **Autenticación de Usuarios**: NO era requerido.

---

## 🧪 Pruebas Unitarias

Para ejecutar las pruebas:
```bash
npm run test
```

## 🏗️ Construcción para Producción

Para compilar el proyecto:
```bash
npm run build
```
Los archivos finales se generarán en la carpeta `dist/`.
