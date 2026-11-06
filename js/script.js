/* =========================================================
   JS DEL SITIO "IoT" — JavaScript puro (sin librerías)
   Autor: [Tu nombre] · Desarrollo de Software V

   Contenido:
     1. Menú adaptable (móvil)
     2. Laboratorio IoT: LED + lectura de sensor (arquitectura.html)
     3. Formulario de contacto con validación (creador.html)

   Nota sobre el error de la clase: en la solución.js original la función
   mostrarResultado recibía "idContenedor" pero usaba una variable
   "mensaje" que nunca existía (ReferenceError). Aquí la función correcta
   siempre hace getElementById(idContenedor) y opera sobre ese elemento.
   ========================================================= */

/* ---------- 1. Menú adaptable ---------- */
const botonMenu = document.querySelector('.nav-toggle');
const menuPrincipal = document.getElementById('menu-principal');

if (botonMenu && menuPrincipal) {
    botonMenu.addEventListener('click', () => {
        // classList.toggle devuelve true si el menú quedó abierto.
        const abierto = menuPrincipal.classList.toggle('abierto');
        // aria-expanded mantiene informado al lector de pantalla del estado.
        botonMenu.setAttribute('aria-expanded', String(abierto));
        botonMenu.setAttribute(
            'aria-label',
            abierto ? 'Ocultar el menú de navegación' : 'Mostrar u ocultar el menú de navegación'
        );
    });

    // Se cierra el menú al elegir una página o al pulsar Escape.
    menuPrincipal.addEventListener('click', (evento) => {
        if (evento.target.tagName === 'A') {
            menuPrincipal.classList.remove('abierto');
            botonMenu.setAttribute('aria-expanded', 'false');
        }
    });

    document.addEventListener('keydown', (evento) => {
        if (evento.key === 'Escape' && menuPrincipal.classList.contains('abierto')) {
            menuPrincipal.classList.remove('abierto');
            botonMenu.setAttribute('aria-expanded', 'false');
            botonMenu.focus();
        }
    });
}

/* ---------- 2. Laboratorio IoT (solo existe en arquitectura.html) ---------- */

/*
 * FUNCIÓN CORREGIDA (patrón de la clase).
 * @param {string} idContenedor - id del <div> donde se mostrará el texto.
 * @param {string} tipo - 'exito' | 'error' | 'alerta' | 'info'
 * @param {string} texto - mensaje para el usuario
 *
 * Error original: se escribía mensaje.className y mensaje.textContent sin
 * que "mensaje" existiera. Lo correcto es OBTENER el contenedor primero.
 */
function mostrarMensaje(idContenedor, tipo, texto) {
    const contenedor = document.getElementById(idContenedor); // <-- corrección
    if (!contenedor) return;                                  // defensa ante ids inexistentes
    contenedor.className = 'mensaje mensaje--' + tipo;
    contenedor.textContent = texto;
}

/* Agrega una línea al registro tipo consola (máximo 8 para no crecer sin límite). */
function registrar(tipo, texto) {
    const registro = document.getElementById('registro');
    if (!registro) return;

    const hora = new Date().toLocaleTimeString('es-ES', { hour12: false });
    const linea = document.createElement('li');
    linea.className = tipo;                       // 'ok' | 'aviso' | ''
    linea.textContent = '[' + hora + '] ' + texto;
    registro.appendChild(linea);

    while (registro.children.length > 8) {
        registro.removeChild(registro.firstElementChild);
    }
    registro.scrollTop = registro.scrollHeight;  // siempre se ve la línea más nueva
}

const btnLed = document.getElementById('btn-led');
const btnLeer = document.getElementById('btn-leer');

if (btnLed && btnLeer) {
    const led = document.getElementById('led');
    const estadoLed = document.getElementById('estado-led');
    let encendido = false;

    // --- Encender / apagar el LED (actuador) ---
    btnLed.addEventListener('click', () => {
        encendido = !encendido;

        led.classList.toggle('encendido', encendido);
        estadoLed.classList.toggle('encendido', encendido);
        estadoLed.textContent = encendido ? 'ENCENDIDO' : 'APAGADO';
        btnLed.textContent = encendido ? 'Apagar LED' : 'Encender LED';
        btnLed.setAttribute('aria-pressed', String(encendido));

        if (encendido) {
            mostrarMensaje('lab-mensaje', 'exito',
                'Comando enviado: el LED quedó encendido. Así se ve un actuador respondiendo a la nube.');
            registrar('ok', 'TX → casa/led = ON  (publicado por MQTT)');
        } else {
            mostrarMensaje('lab-mensaje', 'info',
                'LED apagado. El estado del dispositivo siempre es visible: heurística de visibilidad del estado.');
            registrar('', 'TX → casa/led = OFF (publicado por MQTT)');
        }
    });

    // --- Leer el sensor DHT11 (sensor) ---
    btnLeer.addEventListener('click', () => {
        const temperatura = (20 + Math.random() * 10).toFixed(1);   // 20.0 a 30.0 °C
        const humedad = Math.round(40 + Math.random() * 40);       // 40 a 80 %

        document.getElementById('valor-temp').textContent = temperatura + ' °C';
        document.getElementById('valor-humedad').textContent = humedad + ' %';

        mostrarMensaje('lab-mensaje', 'exito',
            'Lectura recibida del sensor DHT11: ' + temperatura + ' °C y ' + humedad +
            '% de humedad. Los datos ya viajaron a la nube.');
        registrar('ok', 'RX ← dht11/temp = ' + temperatura + ' °C · dht11/hum = ' + humedad + ' %');

        // Estado inicial del botón con aria-pressed coherente.
        btnLed.setAttribute('aria-pressed', String(encendido));
    });

    // Estado coherente desde el inicio (evita ambigüedad para el usuario).
    btnLed.setAttribute('aria-pressed', 'false');
    registrar('', 'Broker MQTT conectado · topic base: casa/');
}

/* ---------- 3. Formulario de contacto (solo existe en creador.html) ---------- */
const formulario = document.getElementById('form-contacto');

if (formulario) {
    const mensajeForm = document.getElementById('form-mensaje');
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;   // ejemplo@dominio.com

    /* Devuelve el texto de error o una cadena vacía si el valor es válido. */
    function validarCampo(campo) {
        const valor = campo.value.trim();

        if (campo.id === 'nombre') {
            if (valor.length < 3) return 'Escribe tu nombre completo (mínimo 3 caracteres).';
        }
        if (campo.id === 'correo') {
            if (!valor) return 'El correo es obligatorio.';
            if (!emailValido.test(valor)) return 'Revisa el correo: debe verse como ana@correo.com.';
        }
        if (campo.id === 'asunto') {
            if (!valor) return 'Elige un asunto para el mensaje.';
        }
        if (campo.id === 'mensaje') {
            if (valor.length < 10) return 'Cuéntame un poco más: al menos 10 caracteres.';
        }
        return '';   // sin errores
    }

    /* Marca o limpia el estado visual del campo y escribe la nota de error.
       Cada nota conserva su texto original en data-original para poder
       restaurarlo (evita decir "parece bien" en un campo vacío). */
    function aplicarEstado(campo, error) {
        const contenedor = campo.closest('.campo');
        const nota = contenedor.querySelector('.campo-nota');

        if (nota && nota.dataset.original === undefined) {
            nota.dataset.original = nota.textContent;
        }

        if (error) {
            contenedor.classList.add('invalido');
            campo.setAttribute('aria-invalid', 'true');
            nota.textContent = error;                 // mensaje específico, no genérico
        } else {
            contenedor.classList.remove('invalido');
            campo.removeAttribute('aria-invalid');
            nota.textContent = nota.dataset.original;
        }
    }

    const campos = ['nombre', 'correo', 'asunto', 'mensaje']
        .map((id) => document.getElementById(id))
        .filter(Boolean);

    // Feedback inmediato: se valida al salir del campo (una vez que el usuario
    // ya escribió algo, para no mostrar errores a destiempo).
    campos.forEach((campo) => {
        campo.addEventListener('blur', () => {
            if (campo.value.trim() !== '' || campo.getAttribute('aria-invalid') === 'true') {
                aplicarEstado(campo, validarCampo(campo));
            }
        });
    });

    formulario.addEventListener('submit', (evento) => {
        evento.preventDefault();               // no recarga la página

        let primerError = null;

        campos.forEach((campo) => {
            const error = validarCampo(campo);
            aplicarEstado(campo, error);
            if (error && !primerError) primerError = campo;
        });

        if (primerError) {
            mostrarMensaje('form-mensaje', 'error',
                'Faltan datos por corregir. Revisa los campos marcados en rojo.');
            primerError.focus();               // el foco va al problema: menos fricción
            return;
        }

        // Todo válido: se simula el envío (en un proyecto real aquí iría fetch()).
        mostrarMensaje('form-mensaje', 'exito',
            '¡Mensaje enviado! (simulado) Gracias por escribir; te responderé pronto.');
        formulario.reset();

        // Se limpian las marcas de error y las notas quedan listas para otra vez.
        campos.forEach((campo) => aplicarEstado(campo, ''));
    });
}
