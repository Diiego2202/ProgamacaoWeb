import app = require("teem");

//**********************************************************************************
// Se por acaso ocorrer algum problema de conexão, autenticação com o MySQL,
// por favor, execute este código abaixo no MySQL e tente novamente!
//
// ALTER USER 'USUÁRIO'@'localhost' IDENTIFIED WITH mysql_native_password BY 'SENHA';
//
// * Assumindo que o usuário seja root e a senha root, o comando ficaria assim:
//
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
//
//**********************************************************************************

class IndexRoute {
	public async index(req: app.Request, res: app.Response) {
		res.render("index/index");
	}

	@app.http.post()
	public async criarLivro(req: app.Request, res: app.Response) {
		// Os dados enviados via POST ficam dentro de req.body
		let livro = req.body;

		// É sempre muito importante validar os dados do lado do servidor,
		// mesmo que eles tenham sido validados do lado do cliente!!!
		if (!livro) {
			res.status(400);
			res.json("Dados inválidos");
			return;
		}

		if (!livro.titulo) {
			res.status(400);
			res.json("Título inválido");
			return;
		}

		if (!livro.ano) {
			res.status(400);
			res.json("Ano inválido");
			return;
		}

		if (!livro.autor) {
			res.status(400);
			res.json("Autor inválido");
			return;
		}

		if (!livro.paginas) {
			res.status(400);
			res.json("Número de páginas inválido");
			return;
		}

		await app.sql.connect(async (sql) => {

			// Todas os comandos SQL devem ser executados aqui dentro do app.sql.connect().

			// As interrogações serão substituídas pelos valores passados ao final, na ordem passada.
			await sql.query("INSERT INTO livro (titulo, ano, autor, paginas) VALUES (?, ?, ?, ?)", [livro.titulo, livro.ano, livro.autor, livro.paginas]);

		});

		res.json(true);
	}

	public async exibir(req: app.Request, res: app.Response) {
		// Mais para frente iremos melhorar os tipos, para não usar any[] :)
		let livro: any[];

		await app.sql.connect(async (sql) => {

			// Todas os comandos SQL devem ser executados aqui dentro do app.sql.connect().

			livro = await sql.query("SELECT id, titulo, ano, autor, paginas FROM livro");

		});
		
		let opcoes = {
			livro: livro
		};

		res.render("index/exibir", opcoes);
	}
}

export = IndexRoute;
