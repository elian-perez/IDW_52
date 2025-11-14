 IDW-52
Repositorio programación de Introducción al Desarrollo Web

Integrantes del grupo: Ariel Alejandro Aragón, Luis Gutiérrez, Natalia Pellegrineschi, Elian Perez, Miriam Silvana Sánchez, Melina Arianna Scarabello.

Proyecto  Introduccion al Desarrolo Web – Primera Entrega
Descripción

*Este proyecto corresponde a la primera entrega del Trabajo Final Integrador. La finalidad fue definir la estructura inicial de la aplicación web que servirá como base para el desarrollo completo del trabajo final.

La estructura establecida incluye como mínimo las siguientes páginas:

Inicio / Portada: Página principal con la bienvenida y resumen del sitio.

Información Institucional: Contenido acerca de la institución, misión, visión y datos relevantes.

Contacto: Formulario y datos de contacto para que los usuarios puedan comunicarse.

Estilo y Diseño

Se estableció un estilo visual consistente para toda la aplicación, utilizando colores, tipografía y diseño responsivo, de manera que todas las páginas mantengan coherencia estética. El diseño buscó ser claro, moderno y accesible para todos los usuarios.

Trabajo Colaborativo

El equipo esta compuesto por seis integrantes, distribuidos de la siguiente manera:

Index / Portada: 2 integrantes

Información Institucional: 2 integrantes

Contacto: 2 integrantes

Si bien cada grupo tenía responsabilidades específicas, el trabajo se realizó de manera colaborativa, compartiendo ideas, revisando código y asegurando que la integración de todas las páginas fuera fluida y coherente.


*Segunda entrega del proyecto del Trabajo Final  Integrador 

En esta etapa trabajamos en la integración de Bootstrap  al proyecto, reemplazando el CSS personalizado.  
El objetivo fue lograr un diseño responsivo, más limpio y estandarizado, aprovechando las utilidades y componentes de Bootstrap.  

 Cambios:
 Se implementó Bootstrap en el proyecto.  
 Se reorganizó la estructura del header, main y footer con clases de Bootstrap.  
 La navegación ahora utiliza botones con estilos de Bootstrap para mayor claridad visual.  
 El formulario de contacto se adaptó a un diseño responsivo y más armónico.  
 Se mejoró la distribución de columnas (información de contacto, imagen ilustrativa y formulario).  
 Se aplicaron colores y fondos con clases nativas de Bootstrap, evitando CSS adicional.  


Ahora el sitio:
 Se adapta mejor a distintos tamaños de pantalla.  
 Tiene un diseño más consistente.  
 Mantiene una estructura clara y simple, respetando la consigna de trabajar sin CSS externo. 

# Proyecto de Desarrollo Web – Etapa 3

En esta tercera etapa del proyecto se implementaron las siguientes mejoras y funcionalidades:

## Sección de Administración
- Se incorporó una **sección de administración** protegida mediante **usuario y contraseña**, de modo que solo el personal autorizado de la clínica pueda acceder.  
  - **Usuario:** `acme`  
  - **Contraseña:** `saraza`

## Sistema de Inicio de Sesión
- Se integraron los archivos **.js** necesarios para el correcto funcionamiento del sistema basado en **LocalStorage**.  
- El **inicio de sesión** se desarrolla completamente en el navegador, utilizando **LocalStorage** para almacenar y validar las credenciales.

## Diseño Responsive
- Se realizaron ajustes en el diseño para lograr una **adaptación total a distintos tamaños de pantalla**, mejorando la experiencia en dispositivos móviles, tablets y escritorio.

## Nuevos Archivos
- Se añadieron los archivos:
  - `admin.html`
  - `iniciosesion.html`

## Actualización del Catálogo Médico
- Se implementó un sistema dinámico que permite que, **a medida que se cargan nuevos médicos**, estos se **actualicen automáticamente** en el catálogo principal del sitio (`index.html`).

---

**Estado actual:** Proyecto en desarrollo, con sistema de administración funcional y diseño responsive mejorado.

---
# Proyecto de desarrolo web - Trabajo Final Integrador ETAPA 4

- video explicativo con las características requeridas en la consigna general: https://www.youtube.com/watch?v=mwlp_Uqd3SI

En esta etapa del proyecto se implementaron las siguientes mejoras y funcionalidades:

## Inicio de sesion
- Se incorporó una *sección de administración* protegida mediante *usuario y contraseña*, de modo que solo el personal autorizado de la clínica pueda acceder.
- La autenticación ahora utiliza la API de **https://dummyjson.com/auth/login**.
- Luego del login se obtiene el usuario de https://dummyjson.com/users/{id}.
- *Solo los usuarios cuyo rol sea admin pueden ingresar al panel de administración*. Si el rol no es admin, el acceso es bloqueado.
  Usuarios autorizados:
  - *Usuarios:* emilys - michaelw - sophiab - jamesd - emmaj - ``
  - *Contraseñas:* emilyspass - michaelwpass - sophiabpass - jamesdpass - emmajpass - ``

## Sistema de Inicio de Sesión
- Se integraron los archivos *.js* necesarios para el correcto funcionamiento del sistema basado en *LocalStorage* y *SessionStorage*.
- El *inicio de sesión* valida credenciales con DummyJSON y guarda el *accessToken* en sessionStorage.
- Todas las páginas del panel administrativo verifican el token antes de cargar.
- Inicio de sesión totalmente manejado desde el navegador.

## Diseño Responsive
- Se realizaron ajustes en el diseño para lograr una *adaptación total a distintos tamaños de pantalla*, mejorando la experiencia en dispositivos móviles, tablets y escritorio.
- Se implementó un *menú tipo hamburguesa* para navegación mobile.

## Actualización del Catálogo Médico
- Se implementó un sistema dinámico que permite que, *a medida que se cargan nuevos médicos, estos se **actualicen automáticamente* en el catálogo principal del sitio (index.html).
- El catálogo se genera desde los datos almacenados en *localStorage*.

## Base64
- Se implementó un sistema completo de manejo de imágenes mediante *Base64*.
- Las imágenes de *médicos* y *obras sociales* se almacenan directamente en localStorage en formato Base64.
- Funcionalidades incluidas:
  - Conversión automática al seleccionar una imagen.
  - Previsualización en tiempo real.
  - Actualización de imágenes al modificar un registro.
  - Archivo centralizado imagenes_base64.json.
  - Cargador automático base64-loader.js.

## Panel de Administración – CRUD Completo

### Médicos
- Alta, baja y modificación.
- Imagen en Base64.
- Relación con una especialidad.
- Relación múltiple con obras sociales.
- Al eliminar una obra social se actualizan los médicos y se elimina esa obra del listado de cada uno.
- Validaciones completas.
- Actualización automática en index.html.

### Obras Sociales
- CRUD completo.
- Imágenes Base64.
- Integración con médicos.
- Al borrar una obra social:
  - Se actualizan todos los médicos eliminando dicha obra.

### Especialidades
- CRUD completo.

## Turnos y Reservas

### Administración de Turnos (turnosadmin.html)
- Crear turnos seleccionando:
  - Médico
  - Día (ciclo semanal automático lunes–viernes)
  - Hora
- Tabla dinámica con:
  - ID
  - Médico
  - Día
  - Hora
  - Disponibilidad (Sí/No)
- Funciones de modificar disponibilidad.
- Eliminación de turnos.
- Persistencia en localStorage.

### Administración de Reservas (reservasadmin.html)
- Listado completo de todas las reservas:
  - Paciente
  - Documento
  - Médico
  - Especialidad
  - Valor consulta
  - Fecha y hora
  - Obra social
- Eliminación con confirmación.
- Integración total con turnos:
  - Las reservas marcan el turno como ocupado.

### Turnero del Usuario (turnero.html)
- Filtros avanzados:
  - Especialidad
  - Obra social
  - Profesional
- Compatible con Base64 para fotos de médicos.
- Calendario de días disponible según turnos creados por administración.
- Selección de horario dinámico.
- Cálculo automático del valor:
  - Atención particular.
  - Con obra social (40% de descuento).
- Resumen final antes de confirmar.
- Generación del turno en localStorage.
- Popup de confirmación.
- Actualización de disponibilidad en turnos.
- Integración directa con el panel administrativo.

## Listado de Usuarios (API DummyJSON)
- Se agregó un módulo para mostrar usuarios desde la API:  
  https://dummyjson.com/users
- Solo se muestran los usuarios cuyo *role sea user*.
- Se omiten datos sensibles.

