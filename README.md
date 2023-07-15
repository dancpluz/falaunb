## Como iniciar
Primeiramente é necessário ter as variáveis de autenticação para se conectar com o banco de dados hosteado na supabase, essas variáveis se encontram no final do relatório. 
Crie um arquivo ```.env.local``` na raiz e coloque os valores do relatório.

Abra a pasta raiz execute o comando ```npm install``` para instalar as dependências.

Depois ligue o servidor em modo de desenvolvimento com o comando ```npm run dev```.

Abra [http://localhost:3000](http://localhost:3000) no navegador para ver o site.

## Script de criação do Banco de Dados
Não será necessário executá-los, pois já estão na supabase.
```
CREATE TABLE public.estudante (
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  senha TEXT NOT NULL,
  foto TEXT NULL,
  admin BOOLEAN NOT NULL DEFAULT FALSE,
  matricula TEXT NOT NULL,
  CONSTRAINT estudante_pkey PRIMARY KEY (matricula)
) TABLESPACE pg_default;

CREATE TABLE public.avaliacao (
  codigo SERIAL NOT NULL,
  texto TEXT NOT NULL,
  nota SMALLINT NOT NULL,
  data DATE NOT NULL DEFAULT CURRENT_DATE,
  cod_turma INTEGER NULL,
  nome_professor TEXT NOT NULL,
  mat_estudante TEXT NULL,
  CONSTRAINT avaliacao_pkey PRIMARY KEY (codigo),
  CONSTRAINT avaliacao_codigo_key UNIQUE (codigo),
  CONSTRAINT avaliacao_cod_turma_fkey FOREIGN KEY (cod_turma) REFERENCES turma (codigo),
  CONSTRAINT avaliacao_mat_estudante_fkey FOREIGN KEY (mat_estudante) REFERENCES estudante (matricula) ON DELETE CASCADE,
  CONSTRAINT avaliacao_nome_professor_fkey FOREIGN KEY (nome_professor) REFERENCES professor (nome),
  CONSTRAINT avaliacao_nota_check CHECK (nota <= 5)
) TABLESPACE pg_default;

CREATE TABLE public.denuncia (
  codigo SERIAL NOT NULL,
  cod_avaliacao INTEGER NULL,
  CONSTRAINT denuncia_pkey PRIMARY KEY (codigo),
  CONSTRAINT denuncia_cod_avaliacao_fkey FOREIGN KEY (cod_avaliacao) REFERENCES avaliacao (codigo) ON DELETE CASCADE
) TABLESPACE pg_default;

CREATE TABLE public.turma (
  turma TEXT NOT NULL,
  cod_disciplina VARCHAR NOT NULL,
  nome_professor TEXT NULL,
  codigo SERIAL NOT NULL,
  CONSTRAINT turma_pkey PRIMARY KEY (codigo),
  CONSTRAINT turma_cod_disciplina_fkey FOREIGN KEY (cod_disciplina) REFERENCES disciplina (codigo) ON DELETE CASCADE,
  CONSTRAINT turma_nome_professor_fkey FOREIGN KEY (nome_professor) REFERENCES professor (nome) ON DELETE CASCADE
) TABLESPACE pg_default;

CREATE TABLE public.professor (
  nome TEXT NOT NULL,
  cod_departamento INTEGER NULL,
  CONSTRAINT professor_pkey PRIMARY KEY (nome),
  CONSTRAINT professor_cod_departamento_fkey FOREIGN KEY (cod_departamento) REFERENCES departamento (codigo) ON DELETE CASCADE
) TABLESPACE pg_default;

CREATE TABLE public.departamento (
  codigo INTEGER NOT NULL,
  nome TEXT NOT NULL,
  CONSTRAINT departamento_pkey PRIMARY KEY (codigo)
) TABLESPACE pg_default;

CREATE TABLE public.disciplina (
  codigo VARCHAR NOT NULL,
  nome TEXT NOT NULL,
  cod_departamento INTEGER NULL,
  CONSTRAINT disciplina_pkey PRIMARY KEY (codigo),
  CONSTRAINT disciplina_cod_departamento_fkey FOREIGN KEY (cod_departamento) REFERENCES departamento (codigo) ON DELETE CASCADE
) TABLESPACE pg_default;
```
## Scripts de inserção do Banco de Dados
```
INSERT INTO public.estudante (matricula, nome, email, senha, foto, admin)
VALUES ('211055540', 'Daniel Luz', 'dan08jan@gmail.com', '123456', NULL, TRUE);

INSERT INTO public.estudante (matricula, nome, email, senha, foto, admin)
VALUES ('201054541', 'João Paulo', 'joaopaulo@example.com', 'test1', NULL, FALSE);

INSERT INTO public.estudante (matricula, nome, email, senha, foto, admin)
VALUES ('211045544', 'Pedro Regis', 'plantgame@example.com', 'test2', NULL, FALSE);
```
