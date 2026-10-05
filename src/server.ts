import app from "./app";
const PORT = 3000;

app.listen(PORT, () => {
    console.log( `Bot escuchando en http://localhost:${PORT}`);
});