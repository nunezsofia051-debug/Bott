import app from "./app";
const PORT = 3150;

app.listen(PORT, () => {
    console.log( `Bot escuchando en http://localhost:${PORT}`);
});