const app = require("./app");

const PORT = 8000;

// Servidor
app.listen(PORT, () => {
  console.log("Servidor corriendo correctamente en el puerto " + String(PORT));
});
