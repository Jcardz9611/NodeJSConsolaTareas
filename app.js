require('colors')
const {guardarDB, leerDB} = require('./helpers/guardarArchivo');
const {inquirerMenu, 
    pausa, 
    leerInput,
    listadoTareasBorrar,
    confirmar
} = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

const main = async ()=>{
   
    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();

    if(tareasDB){
        tareas.cargarTareasFromArray(tareasDB);
    }
   
    do{
        opt = await inquirerMenu();
        switch(opt){
            case '1':
                const desc = await leerInput('Descripción: ');
                tareas.crearTarea(desc);
                console.log(desc);
            break;
            case '2':
                tareas.listadoCompleto();
            break;
            case '3':
                tareas.listarPendientesCompletadas(true);
            break;
            case '4':
                tareas.listarPendientesCompletadas(false);
            break;
            case '5':
                const id = await listadoTareasBorrar(tareas.listadoArr);
                const ok = await confirmar('¿Estás seguro?');
                console.log({ok});
            break;
        }

        guardarDB(tareas.listadoArr);

        await pausa();
    }while(opt !== '0')
}

main();