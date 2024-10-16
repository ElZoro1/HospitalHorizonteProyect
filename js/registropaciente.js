document.addEventListener("DOMContentLoaded", function() {
    const appointmentHtml = `
        <div class="for">
            <div class="container">
                <h1>Agendar Cita Médica</h1>
                <form id="appointment-form">
                    <label for="name">Nombre del Paciente:</label>
                    <input type="text" id="name" name="name" required>
                    
                    <label for="date">Fecha de la Cita:</label>
                    <input type="date" id="date" name="date" required>
                    
                    <label for="time">Hora de la Cita:</label>
                    <input type="time" id="time" name="time" required>
                    
                    <label for="exam-type">Tipo de Examen:</label>
                    <select id="exam-type" name="exam-type" required>
                        <option value="" disabled selected>Seleccione un examen</option>
                        <option value="examen-sangre">Examen de Sangre</option>
                        <option value="radiografia">Radiografía</option>
                        <option value="ecografia">Ecografía</option>
                        <option value="tomografia">Tomografía</option>
                        <option value="resonancia-magnetica">Resonancia Magnética</option>
                        <option value="electrocardiograma">Electrocardiograma</option>
                    </select>
                    
                    <label for="reason">Motivo de la Cita:</label>
                    <textarea id="reason" name="reason" rows="4" required></textarea>
                    
                    <button type="submit">
                        <div class="svg-wrapper-1">
                            <div class="svg-wrapper">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                    <path fill="none" d="M0 0h24v24H0z"></path>
                                    <path fill="currentColor" d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path>
                                </svg>
                            </div>
                        </div>
                        <span>Enviar</span>
                    </button>
                </form>
            </div>                            
        </div>
    `;
    
    const newsletterHtml = `
        <div class="newsletter">
            <div class="container">
                <div class="row">
                    <div class="col text-lg-center text-left">
                        <div class="newsletter_content">
                            <div class="newsletter_title">
                                <h1>Tienes alguna duda</h1>
                                <span>No dudes en contactarnos</span>
                            </div>
                            <div class="newsletter_form_container">
                                <form action="#">
                                    <div class="input-group">
                                        <input type="email" class="newsletter_email" placeholder="Tu correo aquí" required="required" data-error="Valid email address is required.">
                                        <button id="newsletter_form_submit" type="submit" class="button newsletter_submit_button trans_200" value="Submit">
                                            Enviar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Inserta los formularios antes del footer
    const footer = document.querySelector('.footer'); // Cambia esto al selector correcto para tu footer
    footer.insertAdjacentHTML('beforebegin', appointmentHtml);
    footer.insertAdjacentHTML('beforebegin', newsletterHtml);

    // Establecer fecha mínima para la cita
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);

    // Manejar el envío del formulario de cita
    const appointmentForm = document.getElementById('appointment-form');
    appointmentForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar el envío por defecto del formulario

        // Obtener los datos del formulario
        const formData = new FormData(appointmentForm);
        const data = Object.fromEntries(formData);

        // Aquí deberías hacer la llamada a tu backend para guardar la cita y enviar el correo
        enviarCita(data);
    });

    // Función para enviar la cita a Mailtrap
    function enviarCita(data) {
        fetch('http://localhost/hospitalhorizonte/send_mail.php', { // Cambia esto por tu endpoint real
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                alert('Cita agendada con éxito y correo enviado.');
                appointmentForm.reset(); // Resetear el formulario
            } else {
                alert('Error al agendar la cita.');
            }
        })
        .catch(error => console.error('Error:', error));
    }
});
