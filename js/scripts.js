function generarTabla(archivo, tablaId) {
    $(document).ready(function () {
        fetch(archivo)
            .then(response => response.json())
            .then(data => {
                const pacientes = data;
                const tabla = $(tablaId + " tbody");

                console.log(pacientes);

                pacientes.forEach(paciente => {
                    const row = `
                    <tr>
                        <td>${paciente.id}</td>
                        <td>${paciente.nombre}</td>
                        <td>${paciente.apellido}</td>
                        <td>${paciente.edad}</td>
                         <td>${paciente.sexo}</td>
                        <td><a class="btn btn-primary mt-3" href="show.html?s=${paciente.id}"> Mostrar</a></td>
                        <td><a class="btn btn-primary mt-3" href="edit.html?s=${paciente.id}"> Editar</a></td>
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

            fetch(`http://fsinicioad24.test/api/pacientes/${id}`, {
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