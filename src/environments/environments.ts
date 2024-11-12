// Una variable de entorno es un objeto que contiene pares de clave-valor almacenada fuera del código de una aplicación. Estas variables se utilizan para definir configuraciones y ajustar comportamientos sin cambiar el código, haciéndolo más flexible y seguro, especialmente para datos sensibles o configuraciones específicas de cada entorno (por ejemplo, desarrollo, pruebas, producción).
export const environment = {
    production: false,
    baseURL: 'http://localhost:3000', // URL para desarrollo
}