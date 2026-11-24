import { IPasoRecorrido } from "../paso-recorrido";

export const CONOCER_MENU: IPasoRecorrido[] = [
    {
        titulo: "Menú laterial de SinergyRP",
        descripcion: "Puedes encontrar aquí los accesos a todo el sistema.",
        elemento: "#sidebarMenu",
        avanzarAlHacerClic: true
    },
    {
        titulo: "Agrupaciones",
        descripcion: "Da clic en alguna agrupación para poder ver las opciones",
        elemento: "#ventasPedidos",
        avanzarAlHacerClic: false
    }
];