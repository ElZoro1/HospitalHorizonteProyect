document.addEventListener('DOMContentLoaded', function () {
    const documentacionSelect = document.getElementById('documentacion');
    const rutInput = document.getElementById('rut');
    const passportInput = document.getElementById('pasaporte');
    const errorMessageRut = document.getElementById('error-message-rut');
    const errorMessagePasaporte = document.getElementById('error-message-pasaporte');
    const continuarButton = document.getElementById('continuar-button');

    // Maneja el cambio en el select de documentación
    documentacionSelect.addEventListener('change', function () {
        const selectedValue = this.value;
        handleDocumentTypeChange(selectedValue);
    });

    // Valida el RUT al escribir
    rutInput.addEventListener('input', function () {
        validateRUT(rutInput.value);
    });

    // Valida el pasaporte al escribir
    passportInput.addEventListener('input', function () {
        validatePassport(passportInput.value);
    });

    // Maneja el click del botón continuar
    continuarButton.addEventListener('click', function (event) {
        event.preventDefault(); // Previene el comportamiento por defecto
        const documentType = documentacionSelect.value;
        const rutOrPassport = documentType === 'rut' ? rutInput.value : passportInput.value;
        sendDataToServer(rutOrPassport);
    });

    // Función para manejar el cambio de tipo de documentación
    function handleDocumentTypeChange(documentType) {
        if (documentType === 'rut') {
            displayRutInput();
        } else if (documentType === 'pasaporte') {
            displayPassportInput();
        }
    }

    function displayRutInput() {
        rutInput.style.display = 'block';
        rutInput.disabled = false;
        rutInput.placeholder = "Ingrese RUT sin puntos y con guion";
        rutInput.value = '';
        errorMessageRut.textContent = '';
        errorMessageRut.style.display = 'none';
        passportInput.style.display = 'none';
        continuarButton.style.display = 'none';
        errorMessagePasaporte.style.display = 'none';
    }

    function displayPassportInput() {
        passportInput.style.display = 'block';
        passportInput.disabled = false;
        passportInput.value = '';
        errorMessagePasaporte.textContent = '';
        errorMessagePasaporte.style.display = 'none';
        rutInput.style.display = 'none';
        continuarButton.style.display = 'none';
        errorMessageRut.style.display = 'none';
    }

    // Función para validar el RUT
    function validateRUT(rutValue) {
        const rutPattern = /^\d{1,8}-[\dkK]{1}$/; // Patrón simple para RUT

        if (rutPattern.test(rutValue)) {
            errorMessageRut.textContent = '';
            errorMessageRut.style.display = 'none';
            continuarButton.style.display = 'block';
        } else {
            errorMessageRut.textContent = 'RUT inválido. Formato: 12345678-9';
            errorMessageRut.style.display = 'block';
            continuarButton.style.display = 'none';
        }
    }

    // Función para validar el pasaporte
    function validatePassport(passportValue) {
        if (passportValue) {
            errorMessagePasaporte.textContent = '';
            errorMessagePasaporte.style.display = 'none';
            continuarButton.style.display = 'block';
        } else {
            errorMessagePasaporte.textContent = 'Por favor, ingrese el número de pasaporte.';
            errorMessagePasaporte.style.display = 'block';
            continuarButton.style.display = 'none';
        }
    }

    function sendDataToServer(rutOrPassport) {
        fetch('register.php', { // Asegúrate de que el nombre del archivo sea correcto
            method: 'POST', // Debe ser POST
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                'rut_or_passport': rutOrPassport,
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                alert("Datos enviados exitosamente.");
                // Redirigir a la página de reserva si es necesario
                window.location.href = 'Reserva.html';
            } else {
                alert("Error: " + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
});
