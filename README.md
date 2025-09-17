<p align="center">
  <picture>
    <source width='20%' media="(prefers-color-scheme: dark)" srcset="assets/logo.svg">
    <img width='20%' src="assets/logoBig.svg">
  </picture>
</p>

## 📚 About

<picture>
  <img src="https://cdn.rawgit.com/dancpluz/falaunb/main/assets/falaunb-demo.gif" align="right" width="40%"/>
</picture>

The **FalaUnB** project is a teacher and class evaluation system developed as a final project for the **Database** course at the **University of Brasília (UnB)**. The main goal was to model, implement, and demonstrate a robust relational database for a web application that allows students to rate their experiences in classes and with professors.

The application was built with an intuitive interface for students to interact with it in a simple and direct way. The project focused on deepening our understanding of data modeling, normalization (with tables following the 1st, 2nd, and 3rd Normal Forms), and the practical application of database management systems, using **PostgreSQL** and **Supabase**.

Although some requirements were not fully implemented, the project served as a solid and scalable foundation, demonstrating the importance of a well-defined database architecture for developing complex and useful applications for the academic community.

## 📌 Features

- **Teacher and Class Evaluation:** A system that allows the submission of evaluations with ratings and comments.
- **Relational Structure:** A database modeled with entities for `student`, `professor`, `class`, `subject`, and `department`.
- **User-Friendly Interface:** A frontend developed with Next.js for a fluid and responsive user experience.
- **Form Validation:** Ensures data integrity before submission to the backend.
- **Technical Reports:** Complete documentation on the database modeling and implementation process.

## 🛠 Built With

<p align="left">
  <img src="https://skillicons.dev/icons?i=nextjs,react,nodejs,postgresql,supabase,styledcomponents,js" />
</p>

- **Frontend:** Next.js, React, Styled Components
- **Backend:** Node.js, PostgreSQL
- **Database-as-a-Service (DBaaS):** Supabase
- **Reports:** LaTeX (Overleaf)

## 👨‍💻 How to Run

### Prerequisites

To run this project, you need to have **Node.js** and **npm** installed. Additionally, you must configure the environment variables to connect to the database.

### Environment Variables

Create a `.env.local` file in the project's root directory with the following access variables (available in the technical report):

```

NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...

````

### Instructions

1.  **Install dependencies:**
    ```bash
    npm install
    ```
2.  **Start the development server:**
    ```bash
    npm run dev
    ```
3.  **Open the application in your browser:**
    ```bash
    start http://localhost:3000
    ```

<details>
  <summary>Click to see the Database Structure</summary>
  
### Creation Scripts
```sql
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
````

### Insertion Scripts

```sql
INSERT INTO public.estudante (matricula, nome, email, senha, foto, admin)
VALUES ('211055540', 'Daniel Luz', 'dan08jan@gmail.com', '123456', NULL, TRUE);

INSERT INTO public.estudante (matricula, nome, email, senha, foto, admin)
VALUES ('201054541', 'João Paulo', 'joaopaulo@example.com', 'test1', NULL, FALSE);

INSERT INTO public.estudante (matricula, nome, email, senha, foto, admin)
VALUES ('211045544', 'Pedro Regis', 'plantgame@example.com', 'test2', NULL, FALSE);
```

</details>

## 👥 Group / Author(s)

This project was developed by:

  - **Daniel Luz** — [GitHub](https://github.com/dancpluz)

## 🤝 Contributions / Acknowledgements

This project was developed for the **Database** course at the **University of Brasília (UnB)**.

  - **Full Report:** A detailed technical report, including database modeling and the development process, is available at [https://www.overleaf.com/read/zjrntmfwpfnn\#89bf8e](https://www.overleaf.com/read/zjrntmfwpfnn#89bf8e).
  - **Demo:** A brief demo of the system can be seen in this video: [https://youtu.be/Jlm4G9FP2wg](https://youtu.be/Jlm4G9FP2wg).

```
```
