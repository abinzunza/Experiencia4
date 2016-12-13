/*
* @Author: Abigail Inzunza
* @Email: abigail.inzunza@alumnos.uv.cl
* @Github: https://github.com/abinzunza
* @Date: 2016-12-131:27:53
* @Last Modified by: Abigail 
*/
$(document).ready(function() {
  var tabla = $('#asignaturas').DataTable({
    ajax: 'asignaturas/json',
    responsive: true,
    dom: 'Bfrtip',
    buttons: [
      {
        text: '<i class="glyphicon glyphicon-plus"></i> Agregar pelicula',
        class: 'btn btn-success',
        action: function (e, dt, node, config) {
          bootbox.dialog({
            title: 'Agregar pelicula',
            message: '' + 
            '<div class="form-group">' +
              '<div class="input-group">' +
                '<span class="input-group-addon">' +
                  '<i class="glyphicon glyphicon-barcode"></i>' +
                '</span>' +
                '<input type="text" id="agregar_codigo" class="form-control" placeholder="Código de asignatura" required>' +
              '</div>' +
            '</div>' +




            '<div class="form-group">' +
              '<div class="input-group">' +
                '<span class="input-group-addon">' +
                  '<i class="glyphicon glyphicon-tag"></i>' +
                '</span>' +
                '<input type="text" id="agregar_nombre" class="form-control" placeholder="Nombre de asignatura" required>' +
              '</div>' +
            '</div>',
            buttons: {
              cancel: {
                label: 'Cancelar',
                className: 'btn btn-default',
                callback: function() {
                  bootbox.hideAll();
                }
              },
              ok: {
                label: 'Agregar',
                className: 'btn btn-success',
                callback: function(e) {
                  e.preventDefault();
                  tabla.row.add({
                    "nombre": $('#agregar_nombre').val(),
                    "fecha": $('#agregar_fecha').val(),
                    "sinopsis": $('#agregar_sinopsis').val(),
                    "codigo": $('#agregar_codigo').val(),

                  }).draw();

                  $.ajax({
                    url: 'asignaturas/agregar',
                    method: 'post',
                    data: {
                      codigo: $('#agregar_codigo').val(),
                      nombre: $('#agregar_nombre').val(),
                      sinopsis: $('#agregar_sinopsis').val(),
                      fecha: $('#agregar_fecha').val(),
                    }
                  })
                  .fail(function(err) {
                    notificacion('Error al agregar la asignatura: ' + err, 'error');
                  })
                  .done(function(data) {
                    notificacion(data.mensaje, 'success');
                  });
                  ;
                }
              }
            }

          });
        }
      }
    ],
    columns: [
      {data: 'nombre', title: 'Nombre'},
      {data: 'codigo', title: 'Género'},
      {data: 'sinopsis', title: 'Sinópsis'},
      {data: 'fecha', title: 'Fecha de Estreno'},
      {
        render: function(data, type, row, meta) {
          var publicado = row.publicado;
          return '' + 
          '<div class="form-group">' +
            '<div class="btn-group">' +
              '<button type="button" class="btn-editar btn btn-xs btn-primary">' + 
                '<i class="glyphicon glyphicon-pencil"></i> Editar' + 
              '</button>' +
              '<button type="button" class="btn-eliminar btn btn-xs btn-danger">' + 
                '<i class="glyphicon glyphicon-trash"></i> Eliminar' +
              '</button>' + 
            '</div>' +
          '</div>';
        },
        title: 'Opciones',
        orderable: false
      }
    ],
    rowCallback: function(row, data) {
      var $row = $(row);
      $row.find('.btn-editar').unbind('click').on('click', btnEditarEvent);
      $row.find('.btn-eliminar').unbind('click').on('click', btnEliminarEvent);
    },
    order: [[0, 'desc']]
  });

  function btnEditarEvent() {
    var fila = $(this).closest('tr'),
    asignatura = tabla.row(fila).data(),
    id = asignatura.codigo,
    nombre = asignatura.nombre,
    alumnos = asignatura.cantidad_alumnos
    ;

    console.log('Editar asignatura con id ' + id);
    bootbox.dialog({
      title: 'Editar asignatura',
      message: '' + 
      '<div class="form-group">' +
        '<div class="input-group">' +
          '<span class="input-group-addon">' +
            '<i class="glyphicon glyphicon-tag"></i>' +
          '</span>' +
          '<input type="text" id="editar_nombre" class="form-control" value="' + nombre + '" placeholder="Nombre de asignatura">' +
        '</div>' +
      '</div>',
      buttons: {
        cancel: {
          label: 'Cancelar',
          className: 'btn btn-default',
          callback: function() {
            bootbox.hideAll();
          }
        },
        ok: {
          label: 'Guardar',
          className: 'btn btn-primary',
          callback: function(e) {
            e.preventDefault();
            $.ajax({
              url: 'asignaturas/json',
              method: 'get',
              cache: false
            })
            .done((data) => {
              tabla
                .clear()
                .rows.add(data.data)
                .draw();
            });

            $.ajax({
              url: 'asignaturas/editar',
              method: 'post',
              data: {
                codigo: id,
                nombre: $('#editar_nombre').val()
              }
            })
            .fail(function(err) {
              notificacion('Error al editar la asignatura: ' + err, 'error');
            })
            .done(function(data) {
              notificacion(data.mensaje, 'success');
            });
            ;
          }
        }
      }

    });
    // Redireccionar a vista de edición
    // location.href = '/asignaturas/editar/' + id;
  }

  function btnEliminarEvent() {
    var fila = $(this).closest('tr'),
    asignatura = tabla.row(fila).data(),
    id = asignatura.codigo
    ;
    bootbox.confirm('¿Estás seguro que deseas <b>eliminar</b> esta pelicula?', function(confirm) {
      console.log(id);
      if(confirm) {
        // Eliminar dato de la tabla
        tabla.row(fila).remove().draw();

        // Realizar petición ajax para eliminar
        $.ajax({
          url: 'asignaturas/eliminar',
          method: 'POST',
          data: {id: id}
        })
        .fail(function(err) {
          notificacion('Error al eliminar la asignatura: ' + err, 'error');
        })
        .done(function(data) {
          notificacion(data.mensaje, 'success');
        });
      }
    });
  }

  function notificacion(mensaje, tipo) {
    // Generar notificación.
    noty({
      text: mensaje,
      dismissQueue: true,
      force: true,
      animation: {
        open  : 'animated fadeIn',
        close : 'animated fadeOut',
        easing: 'swing',
        speed : 500
      },
      layout: 'center',
      theme: 'bootstrapTheme',
      type: tipo,
      timeout: 1500
    });
  }
});