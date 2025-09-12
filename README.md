# 📲 Proyecto 2 - Red Social (MERN Stack)

Este proyecto consiste en el desarrollo de una **Red Social completa** utilizando la API creada previamente en el **Proyecto 2 Backend**.  
Se han integrado todas las funcionalidades básicas y extras, aplicando buenas prácticas de **desarrollo fullstack con React, Redux, Express y MongoDB**.

---

## 🚀 Tecnologías utilizadas

- **Frontend**: React + Redux Toolkit + React Router + SASS
- **Backend**: Node.js + Express + MongoDB (Mongoose)
- **Autenticación**: JWT
- **Multimedia**: Cloudinary + Multer
- **Despliegue**: Vercel (Frontend) y Render (Backend)

---

## 📌 Funcionalidades principales

✅ Registro de usuarios  
✅ Login de usuarios  
✅ Perfil con datos del usuario y sus posts  
✅ Crear, editar y eliminar posts (solo el usuario logueado puede hacerlo)  
✅ Dar y quitar **like** a publicaciones  
✅ Comentar en publicaciones (con avatar y nombre del usuario)  
✅ Buscador de posts y perfiles  
✅ Header y Footer en toda la app  
✅ Guards para proteger rutas privadas  
✅ Diseño responsive y moderno (estilo tipo Instagram)

---

## 📂 Estructura del proyecto

### Frontend

```
src/
 ├── components/
 │    ├── Auth/ (Login, Register)
 │    ├── Home/ (Home.jsx)
 │    ├── Posts/ (Post, Posts, PostDetail, CreatePost, EditPost, AddComment)
 │    ├── Profile/ (Profile.jsx)
 │    ├── Header/ (TheHeader.jsx)
 │    ├── Footer/ (Footer.jsx)
 │    └── Search/ (Search.jsx)
 │
 ├── redux/
 │    ├── auth/ (authSlice.js, authService.js)
 │    ├── post/ (postSlice.js, postService.js)
 │    └── store.js
 │
 ├── styles/ (SASS dividido en base/, layout/, components/, pages/)
 └── App.jsx / main.jsx
```

### Backend

```
backend/
 ├── controllers/ (UserController.js, PostController.js, CommentController.js)
 ├── models/ (User.js, Post.js, Comment.js)
 ├── routes/ (users.js, posts.js, comments.js)
 ├── middlewares/ (authentication.js, upload.js)
 ├── index.js
```

---

## 📖 Rutas principales (Frontend)

- `/home` → Feed con publicaciones
- `/login` → Iniciar sesión
- `/register` → Crear cuenta
- `/profile` → Perfil del usuario logueado
- `/add-post` → Crear post
- `/edit-post/:id` → Editar post
- `/post/:id` → Detalle del post con comentarios
- `/search/:postName` → Resultados de búsqueda

---

## 🔐 Rutas principales (Backend)

- `POST /users/register` → Registro
- `POST /users/login` → Login
- `GET /posts` → Obtener todos los posts
- `GET /posts/:id` → Obtener un post por ID
- `GET /posts/user/:id` → Posts de un usuario
- `POST /posts` → Crear post
- `PUT /posts/:id` → Editar post
- `DELETE /posts/:id` → Eliminar post
- `PUT /posts/like/:id` → Dar like
- `PUT /posts/unlike/:id` → Quitar like
- `POST /comments` → Crear comentario
- `PUT /comments/:id` → Editar comentario
- `DELETE /comments/:id` → Eliminar comentario

---

## 🖼️ Funcionalidades extras implementadas

- Subida de imágenes a Cloudinary (posts y avatar de usuario)
- Responsive Design (móvil, tablet y desktop)
- Guards (PrivateZone y AdminZone)
- Página de **404 Not Found**
- Validaciones en formularios (Register, Login, CreatePost)

---

## 📦 Instalación y ejecución local

### Backend

```bash
cd 2do-Proyecto-Backend
npm install
npm run dev
```

### Frontend

```bash
cd red-social
npm install
npm run dev
```

El frontend correrá en [http://localhost:5173](http://localhost:5173)  
El backend correrá en [http://localhost:3000](http://localhost:3000)

---

## 🚀 Despliegue en producción

- **Backend**: Render
- **Frontend**: Vercel

### Pasos:

1. Subir el backend a GitHub y conectar con Render.
2. Configurar variables de entorno (`MONGO_URI`, `JWT_SECRET`, `CLOUDINARY_*`).
3. Subir el frontend a GitHub y conectar con Vercel.
4. Configurar en el frontend la variable `VITE_API_URL` con la URL del backend en Render.

---

## ✨ Autor

👩‍💻 **Elida Rodriguez**  
Proyecto desarrollado en el Bootcamp Fullstack Web Development en **The Bridge**.
