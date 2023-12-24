import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";
import Usuario from "../models/Usuario.js";

const registrar = async (req, res) => {
  const { email } = req.body;
  const existeUsuario = await Usuario.findOne({ email });
  if (existeUsuario) {
    const error = new Error("Usuario ya registrado");

    return res.status(400).json({ msg: error.message });
  }
  try {
    const usuario = new Usuario(req.body);
    usuario.token = generarId();
    const usuarioAlmacenado = await usuario.save();
    res.json(usuarioAlmacenado);
  } catch (error) {
    console.log(error);
  }
};
const autentificar = async (req, res) => {
  const { email, password } = req.body;
  //verificar si el usuario existe
  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    const error = new Error("usuario no existe");
    return res.status(404).json({ msg: error.message });
  }

  //Verificar confirmacion de usuario
  if (!usuario.activo) {
    const error = new Error("usuario no confirmado");
    return res.status(404).json({ msg: error.message });
  }
  if (await usuario.comprobarPassword(password)) {
    res.json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      token: generarJWT(usuario._id),
    });
  } else {
    const error = new Error("es incorrecto");
    return res.status(404).json({ msg: error.message });
  }
  console.log(usuario);
};

const confirmar = async (req, res) => {
  const { token } = req.params;

  const usuario = await Usuario.findOne({ token });
  if (!usuario) {
    const error = new Error("Token no válido");
    return res.status(404).json({ msg: error.message });
  }

  try {
    usuario.activo = true;
    usuario.token = "";
    console.log(usuario);
    await usuario.save();
    res.json({ msg: "Usuario Confirmado" });
  } catch (error) {
    console.log(error);
  }
};

const olvidePassword = async (req, res) => {
  const { email } = req.body;
  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    const error = new Error("usuario no existe");
    return res.status(404).json({ msg: error.message });
  }
  usuario.token = generarJWT(usuario._id);
  await usuario.save();
  res.json({
    msg: "Se ha enviado el token al correo, revisa y cambiar la contraseña",
  });
};
const comprobarToken = async (req, res) => {
  const { token } = req.params;

  const usuario = await Usuario.findOne({ token });
  if (usuario) {
    return res.status(200).json({ msg: "Token válido y usuario existente" });
  } else {
    return res.status(404).json({ msg: "Token no válido o usuario existente" });
  }
};
const cambiarPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  const usuario = await Usuario.findOne({ token });
  if (usuario) {
    usuario.password = password;
    usuario.token = "";
    await usuario.save();
    try {
      await usuario.save();
      return res.status(200).json({ msg: "Contraseña cambiada correctamente" });
    } catch (error) {
      console.log(error);
    }
  } else {
    const error = new Error("Token no valido");
    return res.status(404).json({ msg: error });
  }
};
const perfil = async (req, res) => {
  console.log("Desde perfil");
};
export {
  registrar,
  autentificar,
  confirmar,
  olvidePassword,
  comprobarToken,
  cambiarPassword,
  perfil,
};
