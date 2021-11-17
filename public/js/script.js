$(document).ready(function() {
    $('#service_table').DataTable({
        columnDefs: [
            { orderable: false, targets: [2, 6] },
            {
                "targets" : 3 ,
                "data": "img",
                "render" : function ( url, type, full) {
                    console.log(full)
                    return '<img height="50" width="75" src="'+full['img']+'"/>';
                }
            },
            {
                targets: 1,
                width: "15%"
            }
        ]
    });

    $('#orders_table').DataTable({
        
    });
} );