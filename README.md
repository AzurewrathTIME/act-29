# 🏫 Sistema Escolar - Persistencia con Archivos

Implementación de almacenamiento permanente (persistencia) en el backend para que los datos de los alumnos sobrevivan al reinicio del servidor.

![C++](https://img.shields.io/badge/C++-00599C?style=flat&logo=c%2B%2B&logoColor=white)
![File I/O](https://img.shields.io/badge/File-I%2FO-blue)
![TXT](https://img.shields.io/badge/Format-TXT-lightgrey)
![Status](https://img.shields.io/badge/status-completado-success)

---

## 📌 Descripción

Hasta la actividad anterior, los alumnos registrados vivían únicamente en la memoria RAM del servidor y se perdían al apagarlo. En esta actividad se agregó la **persistencia**, permitiendo que el servidor guarde los datos en un archivo de texto (`data/usuarios.txt`) y los recupere automáticamente al volver a encenderse.

---

## ✨ Características

- 💾 **Guardado automático:** Cada vez que se registra un alumno vía POST, se escribe en el disco.
- 📂 **Carga al iniciar:** Al arrancar el servidor, se lee el archivo y se reconstruye la lista en memoria.
- 🔄 **Reescritura segura:** Se escribe el archivo completo desde el `vector` en memoria para evitar inconsistencias.
- 🛡️ **Validación de duplicados:** El servidor verifica en el archivo (cargado en memoria) que la matrícula no se repita antes de guardar.
- 🏗️ **Creación automática de carpeta:** Si la carpeta `data/` no existe, el servidor la crea.

---

## 🛠️ Tecnologías

| Tecnología | Uso |
|------------|-----|
| C++17 | Lógica del servidor y manejo de archivos (`<fstream>`) |
| Sockets TCP | Recepción de peticiones HTTP |
| Archivos TXT | Almacenamiento persistente de los datos |

---

## 🧠 Conceptos aplicados

### Formato del archivo
Se utiliza un archivo de texto plano (`usuarios.txt`) donde cada línea representa a un alumno. Los campos están separados por el carácter pipe (`|`).

**Ejemplo de `data/usuarios.txt`:**
```text
Ana|20|A001|ana@escuela.com
Luis|22|A002|luis@escuela.com
Sofia|21|A003|sofia@escuela.com
```

*Campos: `nombre | edad | matricula | correo`*

### Flujo de Persistencia
1. **Al iniciar:** `cargarAlumnos()` lee el archivo línea por línea, separa los campos usando `stringstream` y llena el `vector<Alumno>`.
2. **Al recibir un POST:** Se valida, se agrega al `vector` y se llama a `guardarAlumnos()`.
3. **Al guardar:** Se abre el archivo con `ofstream` (sobrescribiendo el anterior), se recorren todos los alumnos del `vector` y se escriben con el formato `nombre|edad|matricula|correo\n`.

---

## 🚀 Cómo probarlo

### 1. Compilar y ejecutar
```bash
g++ servidor.cpp -o servidor.exe -std=c++17 -lws2_32
.\servidor.exe
```
*Al arrancar por primera vez, verás en consola: `[DATA] No hay archivo previo. Arrancando vacio.`*

### 2. Probar el guardado
1. Abre `http://localhost:8080`.
2. Registra un alumno con el formulario.
3. Ve a la carpeta de tu proyecto y abre el archivo `data/usuarios.txt`. Verás la nueva línea con los datos del alumno.

### 3. Probar la carga (La prueba de fuego)
1. Detén el servidor en la terminal (`Ctrl + C`).
2. Vuelve a ejecutar el `.exe`.
3. La consola debería decir `[DATA] N alumnos cargados` (donde N es la cantidad que registraste).
4. Si intentas registrar un alumno con una **matrícula repetida**, el servidor lo rechazará gracias a la validación en memoria.

---

## 📁 Estructura del proyecto

```text
Sistema-Escolar/
├── servidor.cpp       <-- Código del servidor en C++
├── README.md
├── data/              <-- Carpeta de persistencia
│   └── usuarios.txt   <-- Archivo generado automáticamente
└── Public/            <-- Archivos estáticos
    ├── index.html
    ├── styless.css
    ├── app.js
    └── img/
```

---

## 📄 Licencia

MIT License
