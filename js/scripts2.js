function generarTablaDoctores(archivo, tablaId) {
    $(document).ready(function () {
        fetch(archivo)
            .then(response => response.json())
            .then(data => {
                const doctores = data;
                const tabla = $(tablaId + " tbody");

                console.log(doctores);

                doctores.forEach(doctor => {
                    const row = `
                    <tr>
                        <td>${doctor.id}</td>
                        <td>${doctor.nombre}</td>
                        <td>${doctor.apellido}</td>
                        <td>${doctor.especialidad}</td>
                    
                        <td><a class="btn btn-primary mt-3" href="showDoctores.html?s=${doctor.id}"> Mostrar</a></td>
                        <td><a class="btn btn-primary mt-3" href="editDoctores.html?s=${doctor.id}"> Editar</a></td>
                        <td><a class="btn btn-primary mt-3 delete-btn" href="#" > Borrar</a></td>
                    </tr>
                `;
                    tabla.append(row);
                });
            });

        window.onload = () => {
        }

        $(document).on('click', '.delete-btn', function () {
            const row = $(this).closest('tr');
            const id = row.find('td:first').text();

            fetch(`http://fsinicioad24.test/api/doctores/${id}`, {
                method: 'DELETE'
            })
                .then(response => {
                    if (response.ok) {
                        row.remove();
                    } else {
                        alert('Error al borrar el registro');
                    }
                });
        });

    });
}