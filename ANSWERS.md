# Respuestas — Interactive Profile Card

**1. ¿Por qué escribimos `onPress={handlePress}` y no `onPress={handlePress()}`?**

Porque `onPress` espera recibir una función para ejecutarla después, cuando el usuario toque el botón. Si escribimos `handlePress()`, la función se ejecuta en ese mismo momento, durante el render, y a `onPress` le llega lo que regresa (normalmente `undefined`). Además, si esa función cambia el estado, provoca otro render y se puede formar un ciclo infinito.

**2. ¿Cuál es la diferencia entre `Button` y `Pressable`? ¿Cuándo usarías cada uno?**

`Button` es un componente sencillo y ya hecho: solo recibe `title`, `color` y `onPress`, no tiene prop `style` y se ve distinto en iOS y en Android. `Pressable` no trae ningún diseño, pero puede envolver cualquier contenido y se le puede dar el estilo que queramos, incluso uno que cambia al presionarlo. Usaría `Button` para algo rápido y simple (como "Compartir perfil") y `Pressable` cuando necesito un botón con un diseño propio (como Seguir, Mensaje o los tags).

**3. ¿Qué recibe y qué regresa la función `style` de `Pressable`? Da un ejemplo.**

Recibe un objeto con el estado de la interacción; el más usado es `pressed`, que vale `true` mientras el dedo está sobre el botón. Regresa el estilo que se debe aplicar, que puede ser un objeto o un arreglo de estilos. Por ejemplo:

```js
<Pressable style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
```

Mientras se presiona, se agrega `styles.pressed` (`opacity: 0.6`) y el botón se ve semitransparente.

**4. ¿Por qué no se puede cambiar una variable de estado directamente (`isFollowing = true`) y qué se hace en su lugar?**

Porque React no se da cuenta del cambio: la variable solo cambia localmente, el componente no se vuelve a renderizar y en el siguiente render el valor regresa al que guarda React. En su lugar se usa la función setter que regresa `useState`, por ejemplo `setIsFollowing(!isFollowing)`. Esa función guarda el nuevo valor y le avisa a React que vuelva a dibujar el componente.

**5. ¿Por qué `followers` no es un segundo `useState`? ¿Qué es un *valor derivado*?**

Porque el número de seguidores depende por completo de `isFollowing`: si ya tenemos ese estado, podemos calcularlo con `BASE_FOLLOWERS + (isFollowing ? 1 : 0)`. Si fuera otro estado tendríamos que mantener los dos sincronizados a mano y sería fácil que quedaran diferentes. Un valor derivado es un valor que se calcula en cada render a partir del estado o las props, en lugar de guardarlo por separado.

**6. ¿Qué significa *controlled input* en `TextInput`? ¿Qué dos props lo hacen controlado?**

Significa que el texto que se muestra en el input siempre viene del estado de React, y no del propio componente. Así el estado es la única fuente de verdad y podemos usar el texto en otras partes, como el contador o para borrarlo después de enviar. Las dos props son `value={message}`, que muestra el estado, y `onChangeText={(newText) => setMessage(newText)}`, que actualiza el estado cada vez que el usuario escribe.

**7. ¿Por qué `selectedSkills.push(skill)` está mal cuando `selectedSkills` es estado? Escribe el código correcto.**

Porque `push` modifica (muta) el mismo arreglo que ya tiene React. Como sigue siendo el mismo arreglo en memoria, React no detecta el cambio y no vuelve a renderizar; además, el estado nunca se debe modificar directamente. Lo correcto es crear un arreglo nuevo y pasarlo al setter:

```js
// agregar
setSelectedSkills([...selectedSkills, skill]);
// quitar
setSelectedSkills(selectedSkills.filter((item) => item !== skill));
```
