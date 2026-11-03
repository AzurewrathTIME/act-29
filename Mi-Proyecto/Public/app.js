'use strict';

const apiResultado = document.querySelector('#api-resultado');
const formAlumno = document.querySelector('#form-alumno');
const btnRegistrar = document.querySelector('#btn-registrar');


formAlumno.addEventListener('submit', async (e) => {
  e.preventDefault();

  
  const datos = {
    nombre:    document.querySelector('#nombre').value.trim(),
    edad:      Number(document.querySelector('#edad').value),
    matricula: document.querySelector('#matricula').value.trim(),
    correo:    document.querySelector('#correo').value.trim() 
  };

  
  if (!datos.nombre || !datos.edad || !datos.matricula || !datos.correo) {
    apiResultado.textContent = 'Completa todos los campos antes de enviar.';
    apiResultado.classList.add('error');
    return;
  }

  
  apiResultado.textContent = 'Enviando datos al servidor...';
  apiResultado.classList.remove('error');
  btnRegistrar.disabled = true;

  try {
    
    const res = await fetch('/api/alumnos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datos)
    });

    
    if (!res.ok) {
      throw new Error(`HTTP Error ${res.status}`);
    }

    
    const texto = await res.text();
    
    
    apiResultado.textContent = `Servidor respondió: ${texto}`;
    formAlumno.reset();

  } catch (err) {
    
    apiResultado.textContent = `Error al enviar: ${err.message}`;
    apiResultado.classList.add('error');
  } finally {
    
    btnRegistrar.disabled = false;
  }
});


const botonesApi = document.querySelectorAll('.btn-api');

async function consultarAPI(endpoint, boton) {
  apiResultado.textContent = 'Cargando...';
  apiResultado.classList.remove('error');
  boton.disabled = true;

  try {
    const res = await fetch(endpoint);
    if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
    const texto = await res.text();
    apiResultado.textContent = texto;
  } catch (err) {
    apiResultado.textContent = `Error: ${err.message}`;
    apiResultado.classList.add('error');
  } finally {
    boton.disabled = false;
  }
}

botonesApi.forEach((boton) => {
  boton.addEventListener('click', () => {
    consultarAPI(boton.dataset.endpoint, boton);
  });
});

let intervaloReloj = null;
const btnReloj = document.querySelector('#btn-reloj');

btnReloj.addEventListener('click', () => {
  if (intervaloReloj) {
    clearInterval(intervaloReloj);
    intervaloReloj = null;
    btnReloj.textContent = 'Iniciar Reloj (5s)';
    btnReloj.classList.replace('btn-peligro', 'btn-editar');
    apiResultado.textContent = 'Reloj detenido.';
  } else {
    btnReloj.textContent = 'Detener Reloj';
    btnReloj.classList.replace('btn-editar', 'btn-peligro');
    consultarAPI('/api/hora', btnReloj);
    intervaloReloj = setInterval(() => {
      consultarAPI('/api/hora', btnReloj);
    }, 5000);
  }
});