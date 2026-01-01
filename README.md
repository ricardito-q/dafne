# Árbol de Amor - Demo

Página demo que reproduce una animación estilo "árbol de amor" con corazones que aparecen, un texto tipo máquina de escribir y contadores de días y tiempo hasta el aniversario.

Archivos importantes:
- `index.html` - maquetado principal
- `styles.css` - estilos y animaciones
- `script.js` - lógica de animaciones y contadores
- `avatar-placeholder.svg` - avatar de marcador

Cómo probarlo localmente (Windows + XAMPP):

1. Copia la carpeta en `c:\xampp\htdocs\diciembre` (ya está ahí si usas este workspace).
2. Abre en el navegador: `http://localhost/diciembre/index.html` o usa la Live Server en VS Code.


Personalizar la foto del avatar:
- Guarda tu foto con el nombre `avatar.jpg` en la carpeta del proyecto (`c:\xampp\htdocs\diciembre`). El archivo `index.html` intentará cargar `avatar.jpg` y usará `avatar-placeholder.svg` si no existe.

Personalizar la fecha del inicio de la relación:
- Edita la variable `relationshipStart` en `script.js` (formato ISO, p.ej. `2023-06-01T00:00:00`).

Si quieres que haga cambios (más corazones, distinto diseño, añadir audio o exportar vídeo), dime y lo implemento.
 
Publicar en GitHub Pages
------------------------

1. Crea un nuevo repositorio en GitHub (p.ej. `arbol-de-amor`).
2. En tu máquina, inicializa git y sube los archivos:

```bash
cd c:\xampp\htdocs\diciembre
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/<TU_USUARIO>/<TU_REPO>.git
git push -u origin main
```

3. El workflow `/.github/workflows/deploy.yml` desplegará automáticamente a GitHub Pages cuando hagas `push` a la rama `main`.

4. Tras la primera ejecución exitosa del workflow, tu sitio estará disponible en:

- `https://<TU_USUARIO>.github.io/<TU_REPO>/` (si el repositorio es público)

Notas:
- Asegúrate de usar el nombre correcto del repo y de que el repo exista antes de hacer `git push`.
- Si prefieres que yo prepare y haga el `git`/`push` por ti, tendrás que proporcionarme acceso al repositorio (o subir el zip). Puedo guiarte paso a paso si lo prefieres.
