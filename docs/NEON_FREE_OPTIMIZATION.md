# Optimización gratuita de Neon — guigolo

## Alcance
Esta rama NO requiere Redis, Upstash, Cron ni almacenamiento adicional.

- Conserva **todos** los eventos individuales de crawlers; no aplica muestreo ni elimina rutas, búsqueda, historial o filtros.
- Reutiliza resultados de Crawler Radar durante 300 segundos con `unstable_cache` de Next.js. Los parámetros del filtro y la página forman parte de la clave de caché.
- Elimina 18 sentencias `CREATE TABLE / CREATE INDEX IF NOT EXISTS` ejecutadas por petición en cinco endpoints de telemetría. Las tablas e índices ya existen en la instancia actual de producción de Neon; para instalaciones nuevas, crear mediante migraciones antes de habilitar captura.

## Límites y consecuencias
- Las estadísticas y el historial pueden quedar desactualizados por hasta cinco minutos.
- Cada nuevo evento de crawler sigue generando un INSERT en Neon. Por tanto, **esto reduce consultas, pero no garantiza evitar el límite gratuito de CU-hours** si siguen llegando bots durante todo el día.
- El costo de Neon suele depender del tiempo de cómputo activo; una escritura por crawler puede despertar la instancia.
- Para conservar el 100% de los eventos y escribir solo una vez por semana, necesitamos algún almacenamiento externo durable (no necesariamente de paga). Sin ese componente, no es seguro prometer un batch semanal lossless en Vercel Serverless.

## Pruebas antes del merge
1. Confirmar Build READY en Vercel Preview, TypeScript y lint.
2. Ingresar al dashboard, verificar todas las gráficas y el historial con y sin filtros, paginación y búsqueda.
3. Confirmar que al llegar un bot se agrega el registro en `crawler_events`, y aparece en el dashboard tras el vencimiento del caché.
4. Comparar CU-hours y número de conexiones/consultas en Neon durante varios días.
