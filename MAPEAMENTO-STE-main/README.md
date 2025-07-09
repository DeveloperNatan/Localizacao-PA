- enfrentando alguns problemas que as vezes relacionamento PA vai com valor null

funcao para bloquear acesso em determinadas paginas 

quando usamos o AuthMiddle é parte do que podemos usar do modulo express-session, o Auth que sera basicamente uma função de autenticação, primeiro seguimos o padrao de declarar três parametros, logo depois uma validação, da sessão que foi e valida se ele é verdadeira isto é se o usuario está tentadno acessar a pagina. Se for verdade o e o usuario estiver certo, a validação é aceita, caso não redireciona para pagina de login aonde existe um form.
function AuthMiddle(req, res, next) {
  if (req.session.user) {
    return next();
  }
  return res.redirect("/login");
}

Aplicamos a função Auth logo após a rota e antes dos paramentos sem (), ele chama a funcao Auth e executa, se for a primeira vez do usuario não vai dar certo, e nas proximas vai dar certo, caso o usuario nao feche o navegador  
router.get("/", AuthMiddle, (req, res) => {
  res.sendFile(path.join(htmlPath, "index.html"));
});


aqui é apenas a renderização da pegina login que foi redirecionado
router.get("/login", (req, res) => {
  res.sendFile(path.join(htmlPath, "login.html"))
})

função do form que faz a validação e retorna o req.session.user
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "1234") {
    req.session.user = { username };
    return res.redirect("/");
  }

  res.status(401).json({ message: "Usuário ou senha inválidos" });

})